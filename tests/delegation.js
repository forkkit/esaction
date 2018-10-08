import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('delegation', () => {
  it('propogates to body', async () => {
    const document = createDoc(`
      <button on-click="resolve">Click me</button>
    `);
    const button = document.querySelector('button');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    button.click();
    const event = await promise;

    expect(event).to.be.an.instanceof(Event);
  });

  it('does not propogate past target', async () => {
    const document = createDoc(`
      <div on-click="reject">
        <button on-click="noop">Click me</button>
      </div>
    `);
    const button = document.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ noop() {}, reject });

    button.click();

    await Promise.race([promise, sleep(100)]);
  });

  it('does not propogate past handler', async () => {
    const document = createDoc(`
      <div id="one" on-click="reject">
        <div id="two">
          <button on-click="noop">Click me</button>
        </div>
      </div>
    `);
    const button = document.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(document.querySelector('#two'), ['click']);
    addListeners(document.body, ['click']);
    addHandlers({ noop() {}, reject });

    button.click();

    await Promise.race([promise, sleep(100)]);
  });
});

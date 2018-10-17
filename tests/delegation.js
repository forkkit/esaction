import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('delegation', () => {
  it('propogates to body', async () => {
    const div = createDiv(`
      <button on-click="resolve">Click me</button>
    `);
    const button = div.querySelector('button');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    button.click();
    const event = await promise;

    expect(event).to.be.an.instanceof(Event);
  });

  it('does not propogate past target', async () => {
    const div = createDiv(`
      <div on-click="reject">
        <button on-click="noop">Click me</button>
      </div>
    `);
    const button = div.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ noop() {}, reject });

    button.click();

    await Promise.race([promise, sleep(100)]);
  });

  it('does not propogate past handler', async () => {
    const div = createDiv(`
      <div id="one" on-click="reject">
        <div id="two">
          <button on-click="noop">Click me</button>
        </div>
      </div>
    `);
    const button = div.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(div.querySelector('#two'), ['click']);
    addListeners(div, ['click']);
    addHandlers({ noop() {}, reject });

    button.click();

    await Promise.race([promise, sleep(100)]);
  });
});

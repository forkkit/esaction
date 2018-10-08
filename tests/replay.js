import { addListeners, removeListeners, queue } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it, beforeEach } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('replay', () => {
  // Empty queue
  beforeEach(() => {
    Object.keys(queue).forEach(name => {
      queue[name] = undefined;
    });
  });

  it('should replay events', async () => {
    const document = createDoc(`
      <button on-click="resolve">Click me</button>
    `);
    const button = document.querySelector('button');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    removeHandlers('resolve');

    button.click();

    await sleep(100);

    addHandlers({ resolve });
    const event = await promise;

    expect(event).to.be.an.instanceof(Event);
    expect(event.currentTarget).to.equal(button);
  });

  it('sets context', async () => {
    const document = createDoc(`
      <button on-click="onClickHandler">Click me</button>
    `);
    const button = document.querySelector('button');
    const { promise, resolve, reject } = createPromise();

    addListeners(document.body, ['click']);
    removeHandlers('resolve');

    button.click();

    await sleep(100);

    addHandlers({
      onClickHandler(event) {
        Promise.resolve().then(() => {
          expect(this).to.equal(button);
        }).then(resolve, reject);
      }
    });

    return promise;
  });
});

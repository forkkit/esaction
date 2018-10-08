import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('currentTarget', () => {
  it('is persisted', async () => {
    const document = createDoc(`
      <button on-click="resolve">Click me</button>
    `);
    const button = document.querySelector('button');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    button.click();
    const event = await promise;
    await sleep(100);

    expect(event.currentTarget).to.equal(button);
  });

  it('sets context', () => {
    new Promise(resolve => {
      const document = createDoc(`
        <button on-click="onClick">Click me</button>
      `);
      const button = document.querySelector('button');

      addListeners(document.body, ['click']);
      addHandlers({
        onClick(event) {
          expect(this).to.equal(button);
        }
      });

      button.click();
    });
  });
});

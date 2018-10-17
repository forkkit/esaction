import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('currentTarget', () => {
  it('is persisted', async () => {
    const div = createDiv(`
      <button on-click="resolve">Click me</button>
    `);
    const button = div.querySelector('button');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    button.click();
    const event = await promise;
    await sleep(100);

    expect(event.currentTarget).to.equal(button);
  });

  it('sets context', () => {
    new Promise(resolve => {
      const div = createDiv(`
        <button on-click="onClick">Click me</button>
      `);
      const button = div.querySelector('button');

      addListeners(div, ['click']);
      addHandlers({
        onClick(event) {
          expect(this).to.equal(button);
        }
      });

      button.click();
    });
  });
});

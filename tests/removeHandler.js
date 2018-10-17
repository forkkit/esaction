import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('removeHandler', () => {
  it('should not call handler', async () => {
    const div = createDiv(`
      <button on-click="reject">Click me</button>
    `);
    const button = div.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ reject });
    removeHandlers('reject');

    button.click();

    await Promise.race([promise, sleep(100)]);
  });
});

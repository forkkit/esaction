import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('removeHandler', () => {
  it('should not call handler', async () => {
    const document = createDoc(`
      <button on-click="reject">Click me</button>
    `);
    const button = document.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ reject });
    removeHandlers('reject');

    button.click();

    await Promise.race([promise, sleep(100)]);
  });
});

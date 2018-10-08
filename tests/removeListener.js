import { addListeners, removeListeners, queue } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it, beforeEach } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('removeListener', () => {
  // Empty queue
  beforeEach(() => {
    Object.keys(queue).forEach(name => {
      queue[name] = undefined;
    });
  });

  it('should not call handler', async () => {
    const document = createDoc(`
      <button on-click="reject">Click me</button>
    `);
    const button = document.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ reject });
    removeListeners(document.body, ['click']);

    button.click();

    await Promise.race([promise, sleep(100)]);
  });
});

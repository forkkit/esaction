import { addListeners, removeListeners, queue } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('removeListener', () => {
  // Empty queue
  beforeEach(() => {
    Object.keys(queue).forEach(name => {
      queue[name] = undefined;
    });
  });

  it('should not call handler', async () => {
    const div = createDiv(`
      <button on-click="reject">Click me</button>
    `);
    const button = div.querySelector('button');
    const { promise, reject } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ reject });
    removeListeners(div, ['click']);

    button.click();

    await Promise.race([promise, sleep(100)]);
  });
});

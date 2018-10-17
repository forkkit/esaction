import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('non-bubbling', () => {
  it('sets capture without options', async () => {
    const div = createDiv('');
    const button = div.querySelector('button');
    const { promise, resolve } = createPromise();

    div.addEventListener = (...args) => resolve(args);
    addListeners(div, ['focus']);

    const [name, func, capture] = await promise;

    expect(capture).to.be.true;
  });

  it('sets capture with options', async () => {
    const div = createDiv('');
    const button = div.querySelector('button');
    const { promise, resolve } = createPromise();

    div.addEventListener = (...args) => resolve(args);
    addListeners(div, [{ name: 'focus' }]);

    const [name, func, options] = await promise;
    const { capture } = options;

    expect(capture).to.be.true;
  });
});

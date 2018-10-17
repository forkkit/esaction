import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('options', () => {
  it('sets', async () => {
    const div = createDiv('');
    const button = div.querySelector('button');
    const { promise, resolve } = createPromise();

    div.addEventListener = (...args) => resolve(args);
    addListeners(div, [{ name: 'click', passive: true, once: true }]);

    const [name, func, options] = await promise;
    const { passive, once, capture } = options;

    expect(name).to.equal('click');
    expect(passive).to.be.true;
    expect(once).to.be.true;
    expect(capture).to.be.false;
  });
});

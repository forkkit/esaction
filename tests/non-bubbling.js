import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('non-bubbling', () => {
  it('sets capture without options', async () => {
    const document = createDoc('');
    const button = document.querySelector('button');
    const { promise, resolve } = createPromise();

    document.body.addEventListener = (...args) => resolve(args);
    addListeners(document.body, ['focus']);

    const [name, func, capture] = await promise;

    expect(capture).to.be.true;
  });

  it('sets capture with options', async () => {
    const document = createDoc('');
    const button = document.querySelector('button');
    const { promise, resolve } = createPromise();

    document.body.addEventListener = (...args) => resolve(args);
    addListeners(document.body, [{ name: 'focus' }]);

    const [name, func, options] = await promise;
    const { capture } = options;

    expect(capture).to.be.true;
  });
});

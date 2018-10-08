import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('options', () => {
  it('sets', async () => {
    const document = createDoc('');
    const button = document.querySelector('button');
    const { promise, resolve } = createPromise();

    document.body.addEventListener = (...args) => resolve(args);
    addListeners(document.body, [{ name: 'click', passive: true, once: true }]);

    const [name, func, options] = await promise;
    const { passive, once, capture } = options;

    expect(name).to.equal('click');
    expect(passive).to.be.true;
    expect(once).to.be.true;
    expect(capture).to.be.false;
  });
});

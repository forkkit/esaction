import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { createDoc, createPromise, sleep } from './utils.js';

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('anchor', () => {
  it('calls preventDefault on normal click', async () => {
    const document = createDoc(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = document.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    anchor.click();
    const event = await promise;

    expect(event.defaultPrevented).to.be.true;
  });

  it('does not call preventDefault on click with ctrlKey', async () => {
    const document = createDoc(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = document.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    anchor.dispatchEvent(new MouseEvent('click', {
      bubbles: true, // is true for real clicks
      ctrlKey: true
    }));
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on click with shiftKey', async () => {
    const document = createDoc(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = document.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    anchor.dispatchEvent(new MouseEvent('click', {
      bubbles: true, // is true for real clicks
      shiftKey: true
    }));
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on click with altKey', async () => {
    const document = createDoc(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = document.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    anchor.dispatchEvent(new MouseEvent('click', {
      bubbles: true, // is true for real clicks
      altKey: true
    }));
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on click with metaKey', async () => {
    const document = createDoc(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = document.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    anchor.dispatchEvent(new MouseEvent('click', {
      bubbles: true, // is true for real clicks
      metaKey: true
    }));
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on alternative button click', async () => {
    const document = createDoc(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = document.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(document.body, ['click']);
    addHandlers({ resolve });

    anchor.dispatchEvent(new MouseEvent('click', {
      bubbles: true, // is true for real clicks
      button: 1
    }));
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });
});

import { addListeners, removeListeners } from '../contract.js';
import { addHandlers, removeHandlers } from '../dispatcher.js';
import { click, createDiv, createPromise, sleep } from './utils.js';

import { expect } from 'chai';

describe('anchor', () => {
  it('calls preventDefault on normal click', async () => {
    const div = createDiv(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = div.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    click(anchor);
    const event = await promise;

    expect(event.defaultPrevented).to.be.true;
  });

  it('does not call preventDefault on click with ctrlKey', async () => {
    const div = createDiv(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = div.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    click(anchor, { ctrlKey: true });
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on click with shiftKey', async () => {
    const div = createDiv(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = div.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    click(anchor, { shiftKey: true });
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on click with altKey', async () => {
    const div = createDiv(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = div.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    click(anchor, { altKey: true });
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on click with metaKey', async () => {
    const div = createDiv(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = div.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    click(anchor, { metaKey: true });
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });

  it('does not call preventDefault on alternative button click', async () => {
    const div = createDiv(`
      <a on-click="resolve">Click me</a>
    `);
    const anchor = div.querySelector('a');
    const { promise, resolve } = createPromise();

    addListeners(div, ['click']);
    addHandlers({ resolve });

    click(anchor, { button: 1 });
    const event = await promise;

    expect(event.defaultPrevented).to.be.false;
  });
});

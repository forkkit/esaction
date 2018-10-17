/**
 * IE doesn't set defaultPrevented on syntethic events
 * https://stackoverflow.com/a/23349709
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/103709/
 */
export function click(el, {
  bubbles = true,
  cancelable = true,
  ctrlKey = false,
  altKey = false,
  shiftKey = false,
  metaKey = false,
  button = 0
} = {}) {
  const event = document.createEvent('MouseEvent');
  event.preventDefault = function () {
    Object.defineProperty(this, 'defaultPrevented', {
      get() {
        return true;
      }
    });
  };
  event.initMouseEvent(
    'click', bubbles, cancelable, null, null, 0, 0, 0, 0, ctrlKey, altKey,
    shiftKey, metaKey, button, null
  );
  el.dispatchEvent(event);
}

export function createDiv(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  // Safari 9 and below doesn't bubble event on elements not in document
  document.body.appendChild(div);
  return div;
}

export function createPromise() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

export const sleep = n => new Promise(res => setTimeout(res, n));

/**
 * iOS doesn't bubble click events to body or html if they don't have cursor set
 * to pointer, or the target or any of its ancestor before body has an event
 * listener.
 * https://bugs.webkit.org/show_bug.cgi?id=151933
 * https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
 */
if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream) {
  document.body.style.cursor = document.documentElement.style.cursor =
    'pointer';
}

/**
 * @type {Object.<string, function>}
 */
export const queue = {};

/**
 * @type {Object.<string, function>}
 */
export const dispatchers = {};

/**
 * Events that don't bubble needs to be added with capture
 */
const NON_BUBBLING_EVENTS = [
  'load',
  'unload',
  'scroll',
  'focus',
  'blur',
  'error',
  'loadstart',
  'progress',
  'abort',
  'loadend'
];

/**
 * @param {HTMLElement} el
 * @param {string} eventName
 * @returns {(string|null)}
 */
function getAction(el, eventName) {
  return el.getAttribute('on-' + eventName);
}

/**
 * @param {string} eventName
 * @returns {boolean}
 */
function shouldCapture(eventName) {
  return NON_BUBBLING_EVENTS.indexOf(eventName) >= 0;
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
function isNormalClick(event) {
  return !(
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.metaKey ||
    event.button !== 0
  );
}

/**
 * @param {Event} event
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function shouldPreventDefault(event, el) {
  // Prevent normal navigation
  return (
    event.type === 'click' &&
    el.tagName === 'A' &&
    isNormalClick(event)
  );
}

/**
 * @param {string} name
 * @returns {(function|undefined)}
 */
function getDispatcher(name) {
  return dispatchers[name];
}

/**
 * One function used for all event listener callbacks. Makes it possible to add
 * an event listener multiple times to an element without it being called
 * multiple times.
 * @param {Event} event
 */
function eventListenerCallback(event) {
  let actionElement = event.target;
  let action;

  // Find first parent that has matching attribute
  while (
    !(action = getAction(actionElement, event.type)) &&
    (actionElement = actionElement.parentNode)
  ) {}
  if (!actionElement) return;

  if (shouldPreventDefault(event, actionElement)) {
    event.preventDefault();
  }

  // Stop propagation to prevent problems with nested listeners
  event.stopPropagation();

  // Override currentTarget. Safe to do because propogation is stopped.
  Object.defineProperty(event, 'currentTarget', {
    get() {
      return actionElement;
    }
  });

  // Dispatch event
  const dispatcher = getDispatcher(action);
  if (dispatcher) {
    return dispatcher.call(event.currentTarget, event);
  }

  // Save event for replay
  if (!queue[action]) {
    queue[action] = [];
  }
  queue[action].push(event);
}

/**
 * @typedef {Object} eventListenerOptions
 * @property {string} name
 * @property {boolean} [once]
 * @property {boolean} [passive]
 */

/**
 * @param {(string|eventListenerOptions)} nameOrOptions
 */
function getNameAndOptions(nameOrOptions) {
  if (typeof nameOrOptions === 'string') {
    return {
      name: nameOrOptions,
      optionsOrCapture: shouldCapture(nameOrOptions)
    };
  }

  return {
    name: nameOrOptions.name,
    optionsOrCapture: {
      capture: shouldCapture(nameOrOptions.name),
      once: nameOrOptions.once,
      passive: nameOrOptions.passive
    }
  };
}

/**
 * @param {('add'|'remove')} action
 * @param {HTMLElement} el
 * @param {(string[]|eventListenerOptions[])} events
 */
function modifyListeners(action, el, events) {
  events.forEach(nameOrOptions => {
    const { name, optionsOrCapture } = getNameAndOptions(nameOrOptions);

    el[action + 'EventListener'](name, eventListenerCallback, optionsOrCapture);
  });
}

export const addListeners = modifyListeners.bind(undefined, 'add');
export const removeListeners = modifyListeners.bind(undefined, 'remove');

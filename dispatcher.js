import { queue, dispatchers } from './contract.js';

/**
 * @param {string} name
 */
function replay(name) {
  if (!queue[name]) return;

  // Remove events while iterating
  while (queue[name].length) {
    const event = queue[name].shift();
    dispatchers[name].call(event.currentTarget, event);
  }
}

/**
 * @param {Object.<string, function>} methods
 */
export function addHandlers(methods) {
  Object.keys(methods).forEach(name => {
    dispatchers[name] = methods[name];
    replay(name);
  });
}

/**
 * @param {...string} eventNames
 */
export function removeHandlers(...eventNames) {
  eventNames.forEach(name => {
    dispatchers[name] = undefined;
  });
}

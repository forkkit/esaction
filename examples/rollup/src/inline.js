import { addListeners } from 'esaction/contract.js';

addListeners(document.documentElement, ['click']);

console.log('inline');

// re-export to global
export * from 'esaction/contract.js';

import { addHandlers } from 'esaction/dispatcher.js';

console.log('index');

setTimeout(() => {
  addHandlers({
    onClick: console.log
  });

  console.log('addHandlers');
}, 1000);

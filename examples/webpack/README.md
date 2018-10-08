# esaction webpack example

## async - easy way

Uses dynamic import to load index.js from inline.async.js

## multi-entry - complex but more control

Uses multiple entries to pack index.js and inline.js, and uses splitChunks to
create chunk for esaction/contract.js

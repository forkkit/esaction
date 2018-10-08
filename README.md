# esaction

Tiny event delegation library, inspired by Google's
[jsaction](https://github.com/google/jsaction/). Useful as an alternative to
hydration, by serializing event listeners to DOM attributes and lazy loading the
event handler. Replays events dispatched before handler is added.

## Example

```html
<body>
  <script type="module">
    // Can be inlined with Rollup or Webpack. See examples folder
    import { addListeners, removeListeners } from 'esaction/contract.js';

    addListeners(document.body, ['click', { name: 'touchstart', passive: true }]);
    // removeListeners(document.body, ['click', { name: 'touchstart', passive: true }]);
  </script>

  <button on-click="buttonClickHandler">Click me</button>

  <script type="module">
    // Can be lazily loaded
    import { addHandlers, removeHandlers } from 'esaction/dispatcher.js';

    // Will replay old events and listen for new
    addHandlers({
      buttonClickHandler(event) {
        console.log(event);
      }
    });
    // removeHandlers('buttonClickHandler', 'otherHandler');
  </script>
</body
```

## Install

```sh
yarn add git+https://github.com/johanholmerin/esaction#semver:^1.0.0
```

## Notes

* Calls `preventDefault` on click events registered on anchor elements without
  modifier keys to prevent navigation
* Calls `stopPropagation` on all events
* Events that don't bubble(see below) are registered as capture
* Replaces `currentTarget` with the element that has registered the event
* Event names can only be lowercase
* Supports passing `passive` and `once` options to addEventListener. Does not do
  any [feature detection](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection)

## Browser support

* IE9+ and Safari 8+, when transpiled to ES5

## Events that don't bubble

* load
* unload
* scroll
* focus
* blur
* error
* loadstart
* progress
* abort
* loadend

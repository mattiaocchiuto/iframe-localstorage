# iframe-localStorage
Actually is not possible to use the [localStorage][localStorage] capabilities from a page nested in a iframe element in different domain (considering the parent frame domain).

To solve this limit I wrote this simple library that using the [postMessage][postMessage] capabilities enable the use of localStorage also in cross-domains frames.

In order to use it is enough include the parent.js file in the parent window and the iframe.js file in the nested window.
The iframe.js file overwrite the localtStorage setItem, getItem and removeItem methods and provide a deferred interface to wait the result.

This is a very first approach to the problem and the code need many improvement...I know :)

Hope it can be useful in some way.

[localStorage]:https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[postMessage]:https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
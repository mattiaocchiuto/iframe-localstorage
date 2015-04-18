# iframe-localstorage
Very simple code to use the localStorage capabilities also from iframe of different domains.
In order to use it is enough include the parent.js file in the parent window and the iframe.js file in the nested window.
The iframe.js file overwrite the localtStorage setItem, getItem and removeItem methods and provide a deferred interface.
I also include a very very simple example of usage.

This is a very first approach to the problem and the code need many improvement...I know :)

Hope it can be useful in some way.

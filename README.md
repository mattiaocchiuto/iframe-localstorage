# iframe-localStorage
Actually is not possible to use the [localStorage][localStorage] capabilities from a page nested in a iframe element in different domain (considering the parent frame domain).

To solve this limit I wrote this simple library that using the [postMessage][postMessage] capabilities enable the use of localStorage also in cross-domains frames.

In order to use it is enough include the parent.js file in the parent window and the iframe.js file in the nested window.
The iframe.js file overwrite the localtStorage `setItem`, `getItem` and `removeItem` methods and provide a deferred interface to wait the result.

#### Code Exaple
Once you have included the iframe.js in your nested page, you could use the localStorage methods with the classical interface.
```js
localStorage.setItem('test', 5);
localStorage.getItem('test')
    .done(function(res){
        console.log(res);
    });
localStorage.removeItem('test')
    .done(function(res){
        // code here
    });
```

#### Dependencies
The code I wrote in the iframe.js file have as dependencies only the [jQuery][jQuery] and [underscore][underscore] libraries.
The code has been writed using the [UMD][UMD] pattern so you could just include and use it also in project based on AMD or CommonJS structure.

This is a very first approach to the problem and the code need many improvement...I know :)

Hope it can be useful in some way.

#### License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.

[localStorage]:https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[postMessage]:https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[jQuery]:https://jquery.com/
[underscore]:http://underscorejs.org/
[UMD]:http://bob.yexley.net/umd-javascript-that-runs-anywhere/
scsynth-wasm requires
[SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer).

SharedArrayBuffer requires cross-origin isolation.

The _.stc_ to _.js_ translator is a haskell binary.

There is a _.cgi_ (Common Gateway Interface) form at
[stc-to-js-cgi.py](https://gitlab.com/rd--/stsc3/-/blob/master/cgi-bin/stc-to-js-cgi.py).

There is a public server at <https://rohandrape.net/pub/stsc3/html/stc-to-js.html>

There is a script at _jssc3/py/http-server-cgi-cross-origin.py_ to run a local http server with the required _.cgi_ and _Cross-Origin_ headers set.

Ace is a text editor library.
It does not work properly with proportional fonts, so is not used by default.
A simple textarea is used instead.
(The Js code dyamically adapts.)

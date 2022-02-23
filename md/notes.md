## Libraries

_jssc3_ requires the following libraries:

- lib/osc.js, an Open Sound Control library
- lib/scsynth-wasm-builds, a Web Assembly build of the SuperCollider synthesiser

_jssc3_ optionally uses the following libraries:

- lib/quill, a rich text editor
- lib/stsc3, a Smalltalk SuperCollider library that includes a _.stc_ to _.js_ translator

## Cross-origin Isolation

The web assembly build of the SuperCollider synthesiser requires
[SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer).

SharedArrayBuffer requires cross-origin isolation.

## .stc, .js and .cgi

The _.stc_ to _.js_ translator is a haskell binary.

There is a _.cgi_ (Common Gateway Interface) form at
[stc-to-js-cgi.py](https://gitlab.com/rd--/stsc3/-/blob/master/cgi-bin/stc-to-js-cgi.py).

There is a public server at <https://rohandrape.net/pub/stsc3/html/stc-to-js.html>

## Local server

There is a script at
[http-server-cgi-cross-origin.py](https://gitlab.com/rd--/jssc3/-/blob/main/py/http-server-cgi-cross-origin.py)
to run a local http server with the required _.cgi_ handler and _Cross-Origin_ headers set.

## Ace

Ace is a text editor library.
It does not work properly with proportional fonts, so is not used by default.
A simple textarea is used instead.
(The Js code dyamically adapts.)

## Quill

Quill is a rich text editor library.
It is required by _jssc3-rte.html_ but not by _jssc3-wasm.html_ or _jssc3-websocket.html_.

## Url

An initial file to be loaded can be specified using the Url parameter _e_,
i.e. _jssc3-rte.html?e=help/essay/sc-help-ugens-oscillators.html_.

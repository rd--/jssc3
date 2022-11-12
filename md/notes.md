## SfAcquire

This needs access the scsynth connection.
It currenly reads globalScsynth.
It should require an initial argument.
Since programs are generally written in an "open" form,
this value can be bound by the same mechanism that provides "play" and "draw" &etc.
It needs to have a known name, perhaps "synth" or "sys:synth" in case there are others?

## Pointer

Scsynth Wasm does not implement the Mouse Ugens.
The Pointer Ugens are unit based.
There are pointerMouse functions to emulate Mouse using Pointer.
In Js module exports cannot be mutated.
Pointer is a record and Pointer.x can refer to either MouseX or PointerMouseX.

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

The _cgi-bin_ directory at _jssc3_ is ordinarily a symbolic link to _stsc3/cgi-bin_.

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

An initial file can be loaded by setting the Url parameter _e_,
i.e. _jssc3-rte.html?e=help/essay/jssc3-1.html_.

- Sc2 Documentation
  - [1 - Intro](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-documentation-1.html)
  - [2 - Audio Basics](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-documentation-2.html)
  - [3 - Other Topics](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-documentation-3.html)
- Sc2 Help
  - UGens
    - [Oscillators](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-help-ugens-oscillators.html)
    - [Triggers](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-help-ugens-triggers.html)
- Sc2 Tutorial
  - [1 - Synth](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-tutorial-1.html)
  - [2 - UGens](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-tutorial-2.html)
  - [5 - Parallel & Series](https://rohandrape.net/pub/jssc3/jssc3-rte.html?e=help/essay/sc-tutorial-5.html)

Likewise _jssc3-wasm.html?e=help/graph/jmcc-why-supercollider.stc_.

## Text

Initial editor text can be loaded by setting the Url parameter _s_, i.e. _jssc3-wasm.html?s=SinOsc(440,0)*0.1_

## Visiting

_Navigating_ to  a Url creates a new browser context, _visiting_ loads a file into the current context.

## Remainder

- name case
  + presently operators are in camelCase and unit generators are in TitleCase
  + instead all could be in TitleCase, ie. Osc and Mul and MulAdd and Tanh
  + there are some name collisions, document these
- file extension for .md files that are literate .stc
  + .stc.md or .md.stc
  + .md as minor mode so that it displays nicely in emacs
- ts
  + bindings, generate .ts variant
- CsvAcquire
- implement sc2 ugens for help
- store help files as name.stc.md and reconstruct "composite" files
- control param, singular constructor, p = Param({freq: 400, amp: 0.1}) and then SinOsc(p.freq, 0) to use
- simple examples for scheduling s_new messages
- proper help menus for pte & rte
- .stc help files from lib/stsc3/help
- midi for cc and sw
- midi keyboard input (mpe & non-mpe), voicer
- document polyglot db (allows testing syndef compiled elsewhere)
- mechanisms to read control data
  + from websocket
  + as midi sysex
- document selection rules
- note limited .js help files
- document git submodules
- denojs, allow use as ordinary local interpreter

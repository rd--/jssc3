Parts of this code are shared between:

1. blksc3 block editor (.xml format)
2. jssc3 plain text editor (.text format)
3. jssc3 superscript (rich text editor) (.html format)
4. jssc3 supercalc (grid editor) (.json format)

The common editor operations are:

1. `editor_get_js_notation_and_then(proc)`, to fetch the .js notation that is to be compiled and call proc
2. `editor_get_data()`, to fetch the storable data from the editor (.xml or .text or .html)
3. `editor_set_data(programData)`, to load stored data into the editor (.xml or .text or .html)
4. `editor_get_selected_text()`, to get any _currently selected_ text, to be used by context sensitive actions

In addition some text editor contexts allow a translation stage, from .stc notation to .js notation.
This translation is handled prior to `editor_get_js_notation_and_then()`, which returns .js notation.
The variable `notation_format` says which format the user notation is in.

There are also functions that must be implemented for each mode of communicating with scsynth.

1. Binary Osc packets sent to web assembly scsynth instance using Osc driver or to ordinary scsynth process over websocket
2. Stc program text sent to SuperCollider (sclang) or Smalltalk (stsc3) over websocket.

The common synthesis operations are:

1. playUgen, play a unit generator, implicitly add Out
2. reset, remove all synthesis nodes

C.f.

1. print, print unit generator sequence
2. draw, draw unit generator graph

# Modules

The .ts files are written as modules.
Each can be compiled to a .js module.
This helps clarify inter-connections.
However an important part of the system is exporting names to the _top-level_, for evaluation in the browser.
For the moment the solution is to _cat_ the various required files together in sequence, removing import and export instructions.
Files that are _optional_ still need to be loaded separately as required.

# Typescript

TypeScript interacts with the module system.
Files that are completely self contained are written with .ts annotations, and can be individually compiled from .ts to .js.
These file are called _core_ files at the _Makefile_.
Files that depend only on _core_ files, and that can be typed easily, are also written with .ts annotations.
These file are called _base_ files at the _Makefile_.
They include import statements so they can be compiled as well.
The _core_ and _base_ .ts files are joined together into _jssc3-base.ts_, which is compiled to .js.
If <https://github.com/tc39/proposal-type-annotations> proceeds these would be ordinary .js files with type comments.

# Relation to Scheme

It is possible to work in a subset of Js that will translate to R5RS Scheme.
It would be nice if jssc3 and rsc3 could be translated into one another.
It's not straightforwards to do this for any expressions using _this_.
_p.q_ means _dictionaryAt(p, 'q')_ and _p.q = r_ means _dictionaryPut(p, 'q', r)_.
These should be the only uses of _._.

# Smalltalk

The file _sc3-smalltalk.ts_ implements various messages that are common in SuperCollider _.stc_ programs.
This works to the degree that the types are simple and non-overlapping.
Another approach is to translate _p.q_ as _p.q_ instead of _q(p)_, and _0_ as _scInteger(0)_ and _3.14_ as _scFloat(3.14)_so on.
The file _experiments/sc3-obj.js_ (and related files) has a sketch for this.
Another approach is to translate _p.q(r...)_ as _performWithArguments(p, 'q', r...)_.
This would allow dispatching on the type of _p_ and can be translated to scheme.
The file _experiments/sc3-perform.js_ has a sketch for this.

# Smalltalk in Js

[Squeak.js](https://squeak.js.org/) is an implementation of the Squeak virtual machine in Js.
It can run most Squeak images.
The _Mini Squeak 2.2_ image is very elegant and very fast.
It can also run images without the user interface.
It should be possible to arrange to send text from Js to St for evaluation, and to retrieve the answer.

[JsSom](https://github.com/SOM-st/JsSOM) is an implementation of the Simple Object Model in Js.
It could be modified to more handle primitives in the Smalltalk manner,
and a subset of the St-80 class library could be printed as Som classes.

Js could be used directly to model a simple Smalltalk system.
The printer would need to rewrite names to avoid reserved words,
to qualify references to instance and class variables, and
to implement non-local returns as exceptions.

The [Gnu Smalltalk](https://www.gnu.org/software/smalltalk/) interpreter is written in C and could possibly be compiled using Emscripten.

[Squeak](https://squeak.org/) implements a web server.
It's very simple to set up an evaluator.

Parts of this code are shared between:

1. blksc3 block editor (.xml format)
2. jssc3 plain text editor (.text format)
3. jssc3 superscript (rich text editor) (.html format)
4. jssc3 supercalc (grid editor) (.json format)

The common editor operations are:

1. editor_get_js_notation_and_then(proc), to fetch the .js notation that is to be compiled and call proc
2. editor_get_data(), to fetch the storable data from the editor (.xml or .text or .html)
3. editor_set_data(programData), to load stored data into the editor (.xml or .text or .html)

For text editors there is also a _text_editor_get_selected_text_ function to get the _currently selected_ text.

In addition some text editor contexts allow a translation stage, from .stc notation to .js notation.
This translation is handled prior to editor_get_js_notation_and_then(), which returns .js notation.
The variable notation_format says which format the user notation is in.

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

Some parts of this could be in organised as modules, which would help clarify inter-connections.
However an important part of the system is exporting names to the _top-level_, for evaluation in the browser.
For these parts it's much simpler to use a traditional load sequence.
For the moment the simplest improvement would be to to _cat_ the various required files together in sequence.
Files that are _optional_ would still need to be loaded separately as required.

# Typescript

TypeScript interacts with the module system.
Files that are completely self contained are written with .ts annotations, and can be individually compiled from .ts to .js.
These file are called _core_ files at the _Makefile_.
Files that depend only on _core_ files, and that can be typed easily, are also written with .ts annotations.
These file are called _base_ files at the _Makefile_.
The _core_ and _base_ .ts files are joined together into _jssc3-base.ts_, which is compiled to .js.
If <https://github.com/tc39/proposal-type-annotations> proceeds these would be ordinary .js files with type comments.

# Relation to Scheme

It is possible to work in a subset of Js that will translate very to R5RS Scheme.
It would be nice if jssc3 and rsc3 could be translated into one another.
It's not straightforwards to do this for any expressions using _this_.
_p.q_ means _dictionaryAt(p, 'q')_ and _p.q = r_ means _dictionaryPut(p, 'q', r)_.

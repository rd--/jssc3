# Js Sc3

[JsSc3](https://rd.slavepianos.org/t/jssc3) is a [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (Js) library for interacting with the [SuperCollider](http://audiosynth.com/) (Sc) real-time synthesiser.

## Js

Js is a dynamic language in the [Scheme](https://www.scheme.com/tspl4/) family.  A Js interpreter is included as a part of most web browsers.

## Sc3

Sc is a family of real-time audio signal processing systems written by James McCartney (JMcC).

Sc3 is the fourth iteraton of the system.  It is in two parts, a language interpreter in the [Smalltalk](http://archive.org/details/byte-magazine-1981-08/) (St) family (_ScLang_),  and a real-time synthesiser in the [Music-N](https://doi.org/10.2307/3679463) family (_ScSynth_).  ScSynth is a _background process_, it connects to the audio system and then listens for [OpenSoundControl](https://opensoundcontrol.stanford.edu/) (Osc) messages.

Osc messages define the sound processing programs the synthesiser is to run, as well as the data structures these programs are to operate upon, and the real-time control data streams that interact with the executing programs.

## Web Assembly

[WebAssembly](https://webassembly.org/) (Wasm) is a low-level assembly-like language with a compact binary format.  Wasm programs can be sent to web browsers, where they can be embedded as a process in an [Html](https://developer.mozilla.org/en-US/docs/Web/HTML) page.  Wasm programs can be executed by Js programs, and messages can be sent between concurrently executing Js and Wasm programs.

## Wasm ScSynth

ScSynth can be compiled to Wasm, and run in an Html page.  Osc packets can be sent from the Js interpreter of the web browser to the synthesiser.  In this schema the Js interpreter performs the functions ScLang would in ordinary use.

JsSc3 contains functions to define sound processing programs as graphs of _unit generators_, to compile these graphs into the format understood by ScSynth, and to send these compiled codes to the synthesiser.

## Stc

C-Smalltalk (Stc) is a [C](http://csapp.cs.cmu.edu/3e/docs/chistory.html)-like syntax for Smalltalk.  Stc is a part of the [Smalltalk SuperCollider](https://rohandrape.net/?t=stsc3) (StSc3) system and is, for the most part, a subset of the Sc syntax.

StSc3 includes a [short description](https://rohandrape.net/?t=stsc3&e=md/c-smalltalk.md) of the notation, as well as the [lexer](https://gitlab.com/rd--/stsc3/-/blob/master/Language/Smalltalk/SuperCollider/Lexer.x) and [parser](https://gitlab.com/rd--/stsc3/-/blob/master/Language/Smalltalk/SuperCollider/Parser.y) definitions.

There is a [translator](https://rohandrape.net/pub/stsc3/html/stsc3.html) from Stc to Js notation, and Stc is a simple and pleasant notation for JsSc3 programs.

## Editing

JsSc3 programs can easily be written as [rich text](http://www.bitsavers.org/pdf/xerox/alto/BravoCourse.pdf) documents.  The area containg this text is a simple editor, the controls above the text area are for formatting, and the controls below are for organising texts and communicating with the Sc synthesiser.

The Html representation of the current state of the text can be copied to the system clipboard using the _Copy_ button, from where it can be pasted into a file.

## Local storage

Texts can also be stored in the _local storage_ area of the web browser using the _Save_ button.  This prompts for a name to be associated with the text, suggesting the current date and time as a default.  The _User_ menu will list all of the stored user programs, and these can be recalled by selecting them.

Note that in this simple system recalling a saved text _replaces_ the existing text, which is deleted and cannot be recovered.

## Synthesiser controls

When this page is first loaded the Wasm form of scsynth is fetched and cached.  While this is occuring the _status area_ (the rightmost box below the text area) will display _Loading..._.  The initial fetching process may take some time, however subsequent page loads should be quicker.

Once loaded the status area will be empty, indicating that the page is ready, after which the synthesiser can be started by clicking ⏻ (_Boot_).

When the synthesiser is running the status area will indicate the number of _unit generators_ that are currently playing, initially this will be zero.

Programs can be executed by selecting the text describing the program and pressing the _Play_ button.  To quieten the synthesiser press the _Reset_ button.

## Access keys

The synthesiser controls all have _access keys_ associated with them.
_b_ for _Boot_, _comma_ (,) for _Play_, _forward slash_ (/) for _Eval_, _period_ (.) for _Reset_.

The access keys are displayed as part of the control help text, which can be seen by hovering the mouse over the control.

# Sc programs

A very simple Sc program is _SinOsc(440, 0) * 0.1_.  Selecting this text and pressing _Play_ will generate a 440 _hz_ sine tone in the left channel.

The period at the end of the sentence above is not a part of the program.  If it is accidentally selected the program will have a _syntax error_ and a there will be no sound.

When this program is running, the status area will indicate that this program involves 4 unit generators.  Two are written in the program, _SinOsc_ and _*_, the other two, _Out_ and _MaxLocalBufs_, are implicit.

Pressing the _Print_ button will print the program as a sequence of unit generators to the Js _console_.  The Js console can be opened from the browser menu, or by typing a key combination, often _Control-Shift-i_.

# Program paragraphs

To make programs simpler to select they can be set apart in a _</>_  paragraph by themselves.  The program below is an Sc2 example written by JMcC that genereates bird like sounds.  When running, the status area will indicate that the program involves 108 unit generators.

~~~~
OverlapTexture({
    arg tr;
    var p1 = LFPulse(TRand(0.4, 1.4, tr), 0, TRand(0.1, 0.9, tr)) * TRand(4, 7, tr);
    var p2 = LFPulse(TRand(0.2, 0.7, tr), 0, 0.4) * 0.02;
    var sw = LFSaw(p1 + 2, 0) * TRand(1000, 1800, tr).negated + 4000 + TRand(-1200, 1200, tr);
    var freq = Lag(sw, 0.05);
    var amp = Lag(p2, 0.3);
    Pan2(SinOsc(freq, 0), TRand(-1, 1, tr), amp)
}, 7, 4, 4)
~~~~

## Js Notation

The _notation format_ menu selects which notation programs are written in.  At present the two notations are _.stc_ and _.js_.

The simple Sc program given above is written as _mul(SinOsc(440, 0), 0.1)_  in Js notation.  If the notation format is set appropriately this text may be selected and executed by pressing Play.

Stc and Js notations are similar in many ways.  One significant difference is that some _infix_ operators are replaced by functions, here _*_ is replaced by _mul_.  This is because in Js operators are special forms and are not extensible, they apply only to simple numbers, not signals or arrays.

The function syntax is also somewhat different, as can be seen in the program below, another Sc2 example by JMcC.  This program generates overlapping sine tones with random frequency and pan location parameters.

~~~~
OverlapTexture(function(tr) {
    return Pan2(SinOsc(TRand(20, 2000, tr), 0), TRand(-1, 1, tr), 0.05);
}, 5, 2, 9)
~~~~

## Referencing

An ordinary Url address can be given to navigate to a document, for instance [Why SuperCollider?](?e=help/essay/sc-documentation-1.html).  This will most likely open a new context and require a new synthesiser to be started.

It is also possible to request a new document replace the current document using the _Visit_ command (located in the ☰ menu).  For instance the file _help/essay/sc-documentation-1.html_ can be visited.

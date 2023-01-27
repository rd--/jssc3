## Superscript

SuperScript is a preliminary experiment in providing a rich text environment for writing SuperCollider  (McCartney, 1996) synthesiser programs.
This experiment is extended a little in the [Small Hours](./smallhours.html) environment for the [Simple Programming Language](https://rohandrape.net/t/spl).

SuperScript (Precision Software, 1985) is also a word processor for Commodore 64 computers.

## Synthesiser

The SuperCollider synthesiser can be started by clicking the _Begin_ button.
When the synthesiser is running the status area will indicate the number of _unit generators_ that are currently playing.
Initially this will be zero.
The synthesiser will also be started automatically the first time a program is sent to it.

## Synthesis Programs

`sc.Mul(sc.SinOsc(440, 0), 0.1)` is a simple synthesiser program.
This program is written in the JavaScript language (Wirfs-Brock, 2020).
Selecting the program text and typing _Control-Comma_ will generate a 440 _hz_ sine tone in the left channel.
(_Control-Comma_ indicates typing the _control_ and _comma_ keys at the same time.)

To end the program type _Control-FullStop_.

## Program paragraphs

To make programs simpler to select they can be set apart in a paragraph by themselves.  The program below is a SuperCollider2 example written by James McCartney that generates bird like sounds.  When running, the status area will indicate that the program involves 108 unit generators.

```
sc.OverlapTexture(function(tr) {
	var p1 = sc.Mul(
		sc.LfPulse(sc.TRand(0.4, 1.4, tr), 0, sc.TRand(0.1, 0.9, tr)),
		sc.TRand(4, 7, tr)
	);
	var p2 = sc.Mul(
		sc.LfPulse(sc.TRand(0.2, 0.7, tr), 0, 0.4),
		0.02
	);
	var sw = sc.Add(
		sc.Add(
			sc.Mul(
				sc.LfSaw(sc.Add(p1, 2), 0),
				sc.Neg(sc.TRand(1000, 1800, tr))
			),
			4000
		),
		sc.TRand(-1200, 1200, tr)
	);
	var freq = sc.Lag(sw, 0.05);
	var amp = sc.Lag(p2, 0.3);
	return sc.Pan2(sc.SinOsc(freq, 0), sc.TRand(-1, 1, tr), amp);
}, 7, 4, 4)
```

## C-Smalltalk

SuperScript programs can also be written in _C-Smalltalk_ notation.
In this notation the sine tone program given above is written `SinOsc(440, 0) * 0.1`.
Programs written in this notation may be executed by typing _Control-Enter_.

(The period at the end of the sentence containing the program in the paragraph above is not a part of the program.
If it is accidentally selected the program will have a _syntax error_ and a there will be no sound.)

C-Smalltalk and JavaScript notations are similar in many ways.
One difference is that C-Smalltalk allows _infix_ operators.
Here the infix _*_ operator replaces the prefix _sc.Mul_ procedure.
(In JavaScript operators can be applied only to simple numbers, not to sounds.)

The function syntax is also somewhat different, as can be seen in the program below.
This program generates overlapping sine tones with random frequency and panning parameters.

```
sc.OverlapTexture(function(tr) {
	return sc.Pan2(
		sc.SinOsc(sc.TRand(20, 2000, tr), 0),
		sc.TRand(-1, 1, tr),
		0.05
	);
}, 5, 2, 9)
```

This is the same program written in C-Smalltalk notation.

```
OverlapTexture({ :tr |
	Pan2(
		SinOsc(TRand(20, 2000, tr), 0),
		TRand(-1, 1, tr),
		0.05
	)
}, 5, 2, 9)
```

## Ugen Help

The _Smalltalk SuperCollider_ help files for unit generators can be loaded into SuperScript.
The help files contain example programs written in _C-Smalltalk_ notation.

Selecting the name of a Ugen, for instance _SinOsc_ and typing _Control-Shift-H_ will load the help file.
At present this replaces any existing text, so be careful!
The [Small Hours](./smallhours.html) editor has two panes to avoid this problem, and also maintains a history for traversal.

The _⌂_ (_Home_) button at the top of the page reloads this file.

## Printing Synthesiser Programs

Typing _Control-Colon_ will print the most recently executed synthesiser program as a sequence of unit generators to the _console_.
The console can be opened from the browser menu, or by typing a key combination, often _Control-Shift-i_.

* * *

## What is JavaScript SuperCollider?

[JavaScript SuperCollider](https://rd.slavepianos.org/t/jssc3) is a [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) library for interacting with the [SuperCollider](http://audiosynth.com/) real-time synthesiser.

## What is JavaScript?

JavaScript (Wirfs-Brock, 2020) is a dynamic language in the [Scheme](https://www.scheme.com/tspl4/) family (Sussman, 1975).  A JavaScript interpreter is included as a part of most web browsers (Berners-Lee, 1992).

## What is SuperCollider?

SuperCollider is a family of real-time audio signal processing systems written by James McCartney.

SuperCollider3 is the fourth iteration of the system and has two parts.

1. _ScLang_ is a language interpreter in the Smalltalk family.
2. _ScSynth_ is a real-time synthesiser in the Music-N family (Mathews, 1961).

ScSynth is a _background process_, it connects to the audio system and then listens for [OpenSoundControl](https://opensoundcontrol.stanford.edu/) messages (Wright, 1997).

These messages define the sound processing programs the synthesiser is to run, as well as the data structures these programs are to operate upon, and the real-time control data streams that interact with the executing programs.

## What is Web Assembly?

[WebAssembly](https://webassembly.org/) is a low-level assembly-like language with a compact binary format.  WebAssembly programs can be sent to web browsers, where they can be embedded as a process in an [Html](https://developer.mozilla.org/en-US/docs/Web/HTML) page.  WebAssembly programs can be executed by JavaScript programs, and messages can be sent between between the concurrently executing programs.

## What is WebAssembly ScSynth?

ScSynth can be compiled to WebAssembly and run in an Html page.
OpenSoundControl packets can be sent from the JavaScript interpreter to the synthesiser.
In this schema the JavaScript interpreter performs the functions ScLang would in ordinary use.

The JavaScript SuperCollider library contains functions to define sound processing programs as graphs of _unit generators_, to compile these graphs into the format understood by ScSynth, and to send these compiled codes to the synthesiser.

## What is Rich Text Editing?

The browser environment allows for programs to be written as rich text documents (Lampson, 1979).
The area containing this text is a simple editor, there are the usual key commands for formatting, i.e. _Ctrl-i_ to italicise the selected text &etc.

## What is C-Smalltalk?

C-Smalltalk is a C-like (Ritchie, 1978) syntax for Smalltalk (Kay, 1993).
C-Smalltalk is part of the [Smalltalk SuperCollider](https://rohandrape.net/?t=stsc3) system.
C-Smalltalk is closely related to the SuperCollider language syntax.

Smalltalk SuperCollider includes a
[short description](https://rohandrape.net/?t=stsc3&e=md/c-smalltalk.md) of the notation, as well as the
[lexer](https://gitlab.com/rd--/stsc3/-/blob/master/Language/Smalltalk/SuperCollider/Lexer.x) and
[parser](https://gitlab.com/rd--/stsc3/-/blob/master/Language/Smalltalk/SuperCollider/Parser.y) definitions.

There is a [translator](https://rohandrape.net/pub/stsc3/html/stsc3.html) from C-Smalltalk to JavaScript notation.

## What is Simple Programming Language?

[Simple Programming Language](./spl.html) is a Scheme family language that can run SuperCollider programs written in C-Smalltalk notation.

* * *

## References

Berners-Lee, Tim et al.
"World-Wide Web: the information universe."
_Electron. Netw. Res. Appl. Policy_ 2 (1992): 74-82.

Alan Kay.
["The early history of Smalltalk"](https://dl.acm.org/doi/pdf/10.1145/155360.155364)
_The Second ACM SIGPLAN Conference on History of Programming Languages_, 1993.

Butler Lampson.
"Bravo manual".
In _Alto User's Handbook_, pages 31–62.
Xerox PARC, 1979.

M. V. Mathews.
["An acoustical compiler for music and psychological stimuli"](https://archive.org/details/bstj40-3-677)
_Bell System Technical Journal_, 40(3):677–694, May 1961.

James McCartney.
["SuperCollider: a new real time synthesis language"](http://hdl.handle.net/2027/spo.bbp2372.1996.078).
_Proc. ICMC_, 1996.

D.M. Ritchie, S.C. Johnson, M.E. Lesk, and B.W. Kernighan.
"The C programming language".
_AT&T Bell Laboratories Technical Journal_, 57(6):1991–2019, 1978.

Gerald Jay Sussman and Guy Lewis Steele.
["Scheme: an interpreter for extended lambda calculus"](https://dspace.mit.edu/handle/1721.1/5794).
_Technical Report Memo 349_, MIT Artificial Intelligence Laboratory, 1975.

Allen Wirfs-Brock and Brendan Eich.
["Javascript: the first 20 years"](https://dl.acm.org/doi/10.1145/3386327).
_Proc. ACM Program. Lang._, 4(HOPL):1–189, 2020.

Matthew Wright and Adrian Freed.
[Open Sound Control: a new protocol for communicating with sound synthesizers](http://hdl.handle.net/2027/spo.bbp2372.1997.033)
_Proc. ICMC_, 101–104, 1997.

Precision Software.
[_SuperScript_](https://archive.org/details/SuperScript_Word_Processor_for_the_128_1995_Precision_Software/mode/2up)
Worcester Park, Surrey, 1985.

<!--

- _forward slash_ (/) for _Eval_

The controls above the text area are for communicating with the synthesiser.

When this page is first loaded the synthesiser codes are fetched and cached which may take some time.  While this is occuring the _status area_ may display _Loading..._.  Subsequent page loads are quicker.

When this program is running, the status area will indicate that the program involves 4 unit generators.
Two are written in the program, _SinOsc_ and _Mul_, the other two, _Out_ and _MaxLocalBufs_, are implicit.

## Namespaces

Ordinarily the Sc functions are imported with a _sc_ prefix, however they can be added to the global namespace if required.

## Saving Work

The Html representation of the current state of the text can be copied to the system clipboard using the _Copy_ button, from where it can be pasted into a file.

## Local storage

Texts can also be stored in the _local storage_ area of the web browser using the _Save_ button.  This prompts for a name to be associated with the text, suggesting the current date and time as a default.  The _User_ menu will list all of the stored user programs, and these can be recalled by selecting them.

Note that in this simple system recalling a saved text _replaces_ the existing text, which is deleted and cannot be recovered.

## Referencing

An ordinary Url address can be given to navigate to a document.  This will most likely open a new context and require a new synthesiser to be started.

It is also possible to request a new document replace the current document using the _Visit_ command (located in the ☰ menu).  For instance the file _help/essay/sc-documentation-1.html_ can be visited.

-->


# Dialects, Constraints, and Systems within Systems

By Julian Rohrhuber, Tom Hall, and Alberto de Campo

> _"It was tempting to consider repurposing this language and the web
> browser to recreate the conditions for creative programming in the
> context of what was becoming a universal platform."_ (Ingalls, 2016)

For the past few years it's been possible to run the SuperCollider
synthesiser in a web browser (Berners-Lee, 1992). Below are brief
outlines of some initial experiments using it.

[_JsSc3_](https://rohandrape.net/t/jssc3) is a library for
communicating with the SuperCollider synthesiser using the language
interpreter of the browser (Wirfs-Brock, 2020).  It lets one define
signal processing graphs and send them, along with any related
instructions, to the synthesiser to be played.

[_Spl_](https://rohandrape.net/t/spl) is a simple programming language
that runs in the browser and resembles but isn't the same as the
SuperCollider language.  The _Spl_ program _{ SinOsc(IRand(48,
72).MidiCps, 0) * Rand(0.05, 0.1) } ! 2_ has the expected meaning.

[_SuperScript_](http://superscript.rohandrape.net/) and [_Small
Hours_](http://smallhours.rohandrape.net/) are editors for _JsSc3_ and
_Spl_ programs respectively.  They’re loosely modelled on the
_SuperCollider2_ system, which encourages literate programming using
ordinary word processing conventions and implicit document linking.

[_SuperCalc_](http://supercalc.rohandrape.net/) is a spreadsheet
interface for writing dynamic graphs of communicating _Spl_
programs. In order to replace parts of a signal graph while it’s
running the graph must be partitioned, and the individual parts
named. Spreadsheets are interesting in this context because they
automatically assign each program part a separate text editor along
with a spatially coherent name by which the parts may refer to each
other.

[_Block SuperCollider_](http://blksc3.rohandrape.net/) is a
visual editor for _Spl_ programs. Block editors are a family of visual
programming systems that use interlocking graphical blocks to
represent the elements of a program. There are blocks for variable
assignment and reference, procedure definition and application, and
logical and mathematical operators. In this system there are also
blocks for the standard components of a synthesiser. The drawing below
depicts one of the examples from the SuperCollider2 help files.

![](sw/jssc3/png/jmcc-coolant.png)

When a block drawing is evaluated it prints itself as an _Spl_ program
which is then evaluated in turn. The names displayed in the block
drawings can be different to the names printed in the program text. In
this drawing the _Spl_ names are given symbolic forms, making drawings
concise while also naming each input parameter. (Blocks have help
texts that can be viewed by "hovering" above the block, and these show
the printed names and the names of the input parameters.)  Some names
in this drawing are: ◠₂=_Splay2_, ⋏ₜ=_Ringz_, ∙=_input_,
ν=_frequency_, ↘=_decayTime_, ⌽=_OnePole_, ⍰𝒃=_BrownNoise_,
⤴⚁=_TRand_, ⤴=_trigger_, and ᨏ =_XFadeTexture_.

The colours indicate the category or kind of the block.  In this
drawing there are distinct colours for oscillators, filters, random
number generators, panners, procedures, variables, numerical
constants, and comments.

Block systems are interesting because they’re simply drawings of
programs, a form of very rich text editing.  They open up many
possibilities for combining in one place both the definitions of
sounds and their real-time performance controls.  They can also help
make complex systems, such as SuperCollider, approachable and
comprehensible.

The browser as “universal platform” offers many opportunities for
experimenting with non-traditional systems both for authoring
SuperCollider programs and for distributing completed works.

* * *

T. J. Berners-Lee et al. The world-wide web. _Computer Networks and
ISDN Systems_, 25(4):454–459, 1992.

D. Ingalls et al. A world of active objects for work and play. In
_Proc. Symposium on New Ideas, New Paradigms, and Reflections on
Programming and Software_, 2016, 238–249. 2016.

A. Wirfs-Brock and B. Eich. Javascript: the first 20 years. _Proc. ACM
Program. Lang._, 4:1–189, June 2020.

# SuperCalc

[SuperCalc](https://rohandrape.net/pub/jssc3/jssc3-supercalc.html) is a notation for writing
[SuperCollider](https://www.audiosynth.com/) synthesiser programs.

([SuperCalc](https://museum.syssrc.com/artifact/exhibits/807/) is also a CP/M-80 spreadsheet application published by Sorcim in 1980.)

SuperCalc consists of a table of cells addressed by _column_ and _row_.

![](https://rohandrape.net/sw/jssc3/png/supercalc.2.png)

Columns are named by lower-case letters and rows by numbers,
the cell in the fifth row of the third column is named _c5_.
(This is the usual notation for _spread sheets_.)

The size of the table is fixed when SuperCalc starts.
Cell addresses comprise a finite set of named _variables_.

Each cell contains a SuperCollider synthesis program.
An empty cell is equal to the _silence_ program, _Dc(0)_.
Commentary cells, indicated by a _;;_ prefix, are also equal to _Dc(0)_.

Cells are evaluated from right to left within each row, rows are evaluated from the top down.

This ordering is chosen so that the program at _a1_ can read the _current_ output of the program at _b1_,
which corresponds to placing arguments to a program to the right of the program that references them.
Likewise _a2_ can read the current output of _a1_,
which corresponds to placing programs below the subprograms they read from.

Programs that read from a _forward_ address
(a cell that will be evaluated after the program reading it runs)
receive the _previous_ output of the cell.
This corresponds to a delay of the _block size_ of the synthesiser (which may be set to _1_).

When SuperCalc is initialised a _synthesis group_ is created for each cell.
The groups are ordered following the evaluation sequence described above.
An initial _synthesis node_ is added to each group generating a _Dc(0)_ signal.

Each cell is associated with an _audio bus_.
The program in the cell writes to the associated bus though an implicit _Out_ node.
Writing program _p_ in cell _c_ means something like _Out(Cell('c).busIndex, p)_.
References to cells read from the bus associated with the referenced cell.
Writing a reference to cell _c_ means something like _InFb(1, Cell('c).busIndex)_.

Whenever a cell is edited the group associated with the cell is cleared and a new synthesis node added.
If the program in the cell is not an _AudioOut_ program, it writes to the _audio bus_ associated with the cell.
(_AudioOut_ programs sum out to the audio system and write _Dc(0)_ to the cell bus.)
If the cell program is at _control rate_ it is converted to an audio rate signal using _K2A_.

Cell programs are written in [Simple Programming Language](https://rohandrape.net/t/spl) (_.sl_) notation.

If a cell program fails to evaluate, the cell is coloured to indicate this.

## Rationale

SuperCalc is an experimental notation for studying:

- dynamic replacement of individual parts of a signal processing graph
- implicit naming of sub-graphs parts
- structured text editing

To replace _parts_ of a signal graph while the graph is running it must be partitioned,
and the parts must communicate with each other by reference to a shared memory store.
The writer and reader parts must agree on the name of the store.

The SuperCalc grid automatically associates every text element (sound processing sub-program) with a name.
The result of every text program is written to a store that is named for the cell the text is located in.
The memory model is simple, each store is written to by exactly one text, and can be read from by any number of texts.
Reads receive either the current output of the cell (for _backwards_ references) or the previous output of the cell (for _forward_ references).

Since all programs are named implicity there is no need to invent names to facilitate partitioning.
When programs are copied they automatically acquire new names.

A SuperCalc program is a _graph of graphs_.
The cell texts each describe a _unit generator_ graph,
the cell references taken altogether describe a _synthesis node_ graph.

Structured text editing allows annotations to be attached to parts of a text.
A grid of cells is a simple mechanism for dividing the text area into named parts.
Cell names are coordinates, they indicate the location on the page of the text they refer to.
Annotations can be attached to cells,
for instance the simple colouring rule to indicate when a cell program is incorrect.

## Remainder

Cells are locations at which arbitrary annotations can be attached.
The annotations can be very detailed since they needn't be part of the ordinary view of the cell.
Cells have identity that is distinct from their content.
(This is one reason that some form of structured editing is helpful for interactive programs.)
Cells that contain constant values could be edited by dragging the value with the mouse.
The range, shape and sensitivity of the editing could be attached as annotations to the cell.

Some familiar spread sheet interface idioms would be useful.

- Copying cells renames cell references
   (if _a1_ has a reference to _b1_ and is copied to _a2_ the reference in the copy is rewritten to _b2_)
- Typing or editing cell references indicates the cell referred to

# Variations

Cells are presently monophonic.
The number of channels cannot easily be different at each cell, however it could be fixed at some other number.
Cell programs would be expanded or contracted to match the channel count as required.

The notation could also be used for regular programs, where cells evaluate to ordinary variables (not audio buses).
Empty cells would have the value _nil_.

* * *

- Higgins, Hannah. _The Grid Book_. MIT Press, 2009.

- Mattessich, Richard. 1964. _Simulation of the firm through a budget computer program_. Homewood, Ill: R.D. Irwin.

- Yamamiya, Takashi. "Skeleton — Easy Simulation System," in _Proc. Second International Conference on Creating, Connecting and Collaborating through Computing_, Kyoto, Japan, 2004 pp. 50-53. <doi:10.1109/C5.2004.1314368>

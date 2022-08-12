# SuperCollider 2.0

## Why SuperCollider 2.0 ?

SuperCollider version 2.0 is a new programming language. Why invent a new language and not use an existing language? Computer music composition is a specification problem.  Both sound synthesis and the composition of sounds are complex problems and demand a language which is highly expressive in order to deal with that complexity. Real time signal processing is a problem demanding an efficient implementation with bounded time operations.  There was no language combining the features I wanted and needed for doing digital music synthesis. The SuperCollider language is most like Smalltalk. Everything is an object. It has class objects, methods, dynamic typing, full closures, default arguments, variable length argument lists, multiple assignment, etc. The implementation provides fast, constant time method lookup, real time garbage collection, and stack allocation of most function contexts while maintaining full closure semantics.  The SuperCollider virtual machine is designed so that it can be run at interrupt level.  There was no other language readily available that was high level, real time and capable of running at interrupt level.

SuperCollider version 1.0 was completely rewritten to make it both more expressive and more efficient. This required rethinking the implementation in light of the experience of the first version. It is my opinion that the new version has benefitted significantly from this rethink. It is not simply version 1.0 with more features.

## Why use a text based language rather than a graphical language?

There are at least two answers to this. Dynamism: Most graphical synthesis environments use statically allocated unit generators. In SuperCollider, the user can create structures which spawn events dynamically and in a nested fashion. Patches can be built dynamically and parameterized not just by floating point numbers from a static score, but by other graphs of unit generators as well. Or you can construct patches algorithmically on the fly.  This kind of fluidity is not possible in a language with statically allocated unit generators.  Brevity: In SuperCollider, symmetries in a patch can be exploited by either multichannel expansion or programmatic patch building. For example, the following short program generates a patch of 49 unit generators. In a graphical program this might require a significant amount of time and space to wire up. Another advantage is that the size of the patch below can be easily expanded or contracted just by changing a few constants.

	// 10 voices of a random sine percussion sound :
	var s = { Resonz(Dust(0.2) * 50, Rand(200, 3200), 0.003) }.dup(10).sum;
	// reverb predelay time :
	var z = DelayC(s, 0.048, 0.048);
	// 7 length modulated comb delays in parallel :
	var y = { CombL(z, 0.1, LFNoise1(Rand(0, 0.1)) * 0.04 + 0.05, 15) }.dup(7).sum;
	// two parallel chains of 4 allpass delays (8 total) :
	4.timesRepeat({ y = AllpassC(y, 0.050, [Rand(0, 0.050), Rand(0, 0.050)], 1) });
	// add original sound to reverb and play it :
	s + (0.2 * y)

Graphical synthesis environments are becoming a dime a dozen. It seems like a new one is announced every month. None of them have the dynamic flexibility of SuperCollider's complete programming environment. Look through the SuperCollider help files and examples and see for yourself.

# What's new with 2.0 ?

Everything.  SuperCollider has been completely rewritten.

Here's just a few of the main differences.

SuperCollider 2.0 in general is faster, more expressive, higher quality, and easier to use than version 1.

There are many more unit generators.

Control rate signals are always linearly interpolated to audio rate everywhere that it is necessary to prevent a discontinuity.

Many unit generators are of better quality than those in version 1.

Many unit generators are faster than those in version 1.

The programming language is now fully object oriented. Everything is an object.  There is a set of Collection classes including Dictionaries, Sets, SortedLists, etc.

There are no proprietary format patch files. SuperCollider compiles text files and reads sound files as independant objects rather than being bundled together as they were in SuperCollider 1.

The program has an interpreter front-ended by a styled text editor so that examples may be executed directly from a document by selecting them. This allows you to write pieces that are their own documentation.

The old mechanisms of DSP stages, DSP tasks, dspAdd and dspRemove are all gone now. All you do is write your synthesis expression and play the resulting structure. This is both easier to use and results in clearer programs.

Events can spawn events in a recursive manner.

Each event can have its own calculation block size.

Event start and stop times are single sample accurate.

You can have multiple control panel windows and create and destroy them dynamically.

You can read and compile text at runtime. Therefore scores may contain any executable text.

Instruments and unit generator networks can be built dynamically on a per event basis and can be parameterized by other unit generator networks. So you can put an LFO in your score to control pitch if you like. Scores don't have to be just lists of floating point numbers.

Programmatic patch building and multi channel expansion allow creation of large patches with a few lines of code.

The synthesis engine is a separate virtual machine from the language virtual machine This makes it more efficient than in version 1 where the synthesis loop was executing language code every control period.

Audio buffers such as sample files and delay lines can be allocated dynamically.  Delay line unit generators do not require that their buffer be zero filled to begin with, which means there is no glitch if you decide to allocate and begin using an 8 second delay line on a moment's notice.

# 1. How to use the Synth class

In this tutorial you'll find out what you can do with the Synth class.

## 1.1 How to play a sound

This first example explains in detail how to play a very simple sound, an 800 Hertz sine wave at amplitude 0.1 (-20dB).

First the uncommented version:

	{ SinOsc(800, 0) * 0.1 }.play

Now the same example with lots and lots of comments:

	// A UGen graph is a network of connected unit generators.
	// For this example the 'network' only has a single unit generator.
	{
		// Function are defined within curly braces.
		// This function contains the code to create a graph of ugens.
		// In this case we'll only create a single sine oscillator
		SinOsc( // SinOsc creates an audio rate oscillator. It takes two arguments:
			800, // set its frequency to 800 Hertz
			0) // set its phase to 0 radians
		* 0.1 // multiply the sine wave by 0.1
		// A function returns the value of its last expression.
		// This function only has one expression, the call to SinOsc.
	}.play // Close curly brace marks end of function definition.

## 1.2 How to plot output.

A Synth can do more things than just play a sound.  You can plot a Synth's output using the 'plot' method.  We'll plot 10 milliseconds or 0.01 seconds of the sine wave.

	// { SinOsc(800, 0) * 0.1) }.plot

Notice that there are eight cycles of the sine wave plotted.  800 cycles/second * 0.01 seconds = 8 cycles

A plot is held in a buffer in RAM so don't try to plot an hour long piece (that would be about 1.2 gigabytes for stereo 32 bit floats at 44.1 Khz).

## 1.3 How to watch output in real time.

More exciting than a plot of your output is to watch it in real time.  You can do this with the Synth 'scope' method.  The second argument is the duration seen in the scope. We'll use 0.01 seconds again.

This time we'll look at some BrownNoise since that changes more than a sine wave.  BrownNoise takes two arguments, a multiply and an add. We'll set the multiply to 0.1 just like with the SinOsc example and leave the add input at its default of zero.

	// { BrownNoise() * 0.1 }.plot

Now let's see a 0.2 seconds window which is 20 times longer than the above.

	// { BrownNoise() * 0.1 }.plot(0.2)

## 1.4 How to create a buffer of samples

You can write your output samples to a buffer. Buffers of audio are represented by the class Signal.  The Synth 'collect' method returns an instance of Signal which is filled with the Synth output for the duration specified.  This lets you do non real time operations on the sound.

	// ...

## 1.5 How to write output to disk

The Synth 'write' method lets you write output to a sound file in non real time.  The write method takes three more arguments than 'play'. The first is the path name of the file. Second is a Symbol giving the header format or type of sound file to write.  The third additional argument is the sample format. See the SoundFile help file for a list of all the formats available. We'll use 'AIFF' for the header format and '16 big endian signed' for the sample format.

	// ...

It happens that 'AIFF' and '16 big endian signed' are the default values for the sound file format arguments, so they may be left off if that is what you want.

	// ...

## 1.6 How to play a sound file from disk

The SoundFile 'play' method will stream a file off of disk.  The first argument is the pathname.  The following example assumes the existence of the file "sine800" created in the previous example.

	// ...

If you want to loop the file, set the loop flag to true.

	// ...

## 1.7 How to write output to disk while playing

You can write a sound to disk in real time while you monitor it by using the Synth 'record' method. This method has the same arguments as 'write'.

	// ...

Synth 'record' has the same defaults for the file format that Synth 'write' does, so if you want a 16 bit AIFF file then you can leave those arguments off.

	// ...


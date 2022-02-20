# 2. Sound Synthesis in SuperCollider

## 2.1 Subtractive and Additive Synthesis

Note that sounds will at first be in mono, in the left ear. Later on we will sort out stereo position.

### Unit Generators

SuperCollider follows the _Unit Generator_ paradigm also used in other synthesis languages like Csound, Max/MSP, Pd, Reaktor and others.

There are many primitive building blocks, like types of tone generator, filter or spatialiser, that are the unit generators. These are connected together in a processing graph to make more complicated synthesisers and sound processors. These primitives are referred to as UGens.

Each UGen has some set of inputs and outputs. Most UGens have just one output, an audio stream or some sort of control signal. The inputs vary a lot depending on the function of the UGen.

You will get used to the typical parameter values expected as inputs or outputs as you learn about the different UGens.

There are certain ways to program connections which are part of the syntax of the SuperCollider language, and particular names for units that you will encounter as you learn this system.

### Subtractive Synthesis

This is a good way to start learning SuperCollider.

In subtractive synthesis, we start with a complex source, and we subtract parts from this raw sound to make a more sculpted sound. This is also termed a source+filter model.

This line will make a pure white noise source, equal energy at all spectral frequencies; it can be unpleasant to listen to - the 0.1 makes sure its not too loud, but be careful playing this

    WhiteNoise() * 0.1

That was just the source alone. Now I have to filter it to make a less raw sound.

    LPF(WhiteNoise() * 0.1, 1000)

The LPF is a Low Pass Filter which tails off energy above its cutoff frequency, which is 1000Hz in this example.

In SuperCollider, to plug the white noise generator WhiteNoise into the filter LPF I nest one within the other. You can think of a UGen's inputs being the list of slots within the parentheses, _LPF(input signal, cutoff frequency, ... )_, and in the example above, the thing to plug into the input signal slot is a white noise source, so that's where the WhiteNoise generator goes. The cutoff frequency is a fixed number, 1000, the second argument.

Say that we now want a varying filter cutoff over time. One UGen we could use here is the line generator.  _Ln(10000, 1000, 10)_ takes ten seconds to go from 10000 to 1000: inputs to _Ln_ are start, end, duration.

So instead of the fixed value 1000, the Ln UGen goes in that second slot

    LPF(WhiteNoise() * 0.1, Ln(10000, 1000, 10))

Listen for ten seconds at least to hear the full effect.

There are lots of possible sources and lots of possible filters (try these help files).

Some example unite generators:

- Oscillators: [Saw] [Blip]
- Noise Sources: [PinkNoise] [LFNoise0]
- Filters: [HPF] [BPF] [Resonz]

Example of plugging one source into a filter:

    Resonz(LFNoise0(400), 1000, 0.1)

Again using the line generator to change the filter centre frequency over time

    Resonz(LFNoise0(400), Ln(10000,1000,10), 0.1)

An explicit and neater way to write this (we'll come back to this formulation).

    var source = LFNoise0(400);
    var line = Ln(10000, 1000, 10);
    Resonz(source, line, 0.1)

### Additive Synthesis

Rather than starting with something complex and taking energy away to sculpt a sound, we can start with simple building blocks and add many of them together to create more involved sounds

The classic building block in computer music is the sine tone

    SinOsc(440, 0) * 0.1 // Concert A (440Hz)

Here is one way to get two sine tones at once:

    SinOsc(400, 0) + SinOsc(660, 0) * 0.1

And here is a much easier way

    SinOsc([400, 660], 0) * 0.1

Something special just happened to the stereo field, and I'll explain this in a moment.

Let me first introduce a panning UGen, _Pan2(input signal, pan position, amplitude)_.

Pan position goes from -1 (hard left) to 1 (hard right).

    Pan2(WhiteNoise(), MouseX(-1, 1, 0, 0.2), 0.1)

So the panner takes a mono signal, and places it in the stereo field.

Now, multichannel sound is really straight forward to create in SuperCollider, just by using an array.

We'll look at arrays more closely in a later week, but for now just think of them as lists of data.

    [100,200,300,400,500] // 5 numbers in a list

Each successive element in the list will be placed on one channel.

One channel sound.

     SinOsc([400], 0) * 0.1

Also one channel sound - no array brackets are needed for a single number.

    SinOsc(400, 0) * 0.1

Two channel sound.

    SinOsc([400, 660], 0) * 0.1

Three channel sound - you may only hear two, because you probably have a stereo output on your computer.

    SinOsc([400, 660, 870], 0) * 0.1

We need a way to take multiple channels of sound and turn them into a mono or stereo signal.

One method is to _sum_ the multichannel sound.  A two channel signal put summed turns into mono.

    SinOsc([400, 660], 0).sum * 0.1

And then, of course, Pan2 allows me to place this in the stereo field:

    Pan2(SinOsc([400, 660], 0).sum, MouseX(-1, 1, 0, 0.2), 0.1)

You are now equipped to explore additive synthesis via sine tones.

In additive synthesis, if we know a recipe for the spectrum (frequency content) of a sound, we can synthesise it by adding up sine tones for each component frequency.

Recipes for common waveforms are known from the Fourier theory of sound (sinusoids at which frequencies and amplitudes to add up to create certain waveform shapes).

Sawtooth wave: Add up n harmonics with amplitude falling off as 1 / harmonicnumber, sign alternates between +1 and -1.

    var n = 10;
    var wave = 0.to(9).collect({
        arg i;
        var mult = (-1 ** i) * (0.5 / (i + 1));
        SinOsc(440 * ( i + 1), 0) * mult
    }).sum;
    Pan2(wave / n, 0, 0.1) // stereo, panned centre

Square wave: Sum of odd harmonics, no even, amplitude falls as off 1/harmonicnumber; closest 'real' waveform is a clarinet tone

    var n = 10;
    var wave = 0.to(9).collect({
        arg i;
        var harmonicnumber = 2 * i + 1; // odd harmonics only
        SinOsc(440 * harmonicnumber, 0) / harmonicnumber
    }).sum;
    Pan2(wave / n, 0, 0.1) // stereo, panned centre

Triangle wave: also odd harmonics only, falls off as 1 over harmonicnumber squared with alternating sign

    var n = 10;
    var wave = 0.to(9).collect({
        arg i;
        var harmonicnumber = 2 * i + 1; // odd harmonics only
        var mult = (-1 ** ((harmonicnumber - 1) / 2)) * (1 / (harmonicnumber * harmonicnumber));
        SinOsc(440 * harmonicnumber, 0) * mult
    }).sum;
    Pan2(wave / n, 0, 0.1) // stereo, panned centre

Bell sound example:

    500 * [0.5, 1, 1.19, 1.56, 2, 2.51, 2.66, 3.01, 4.1]

This is a spectral recipe for a minor third bell, at a base frequency of 500 - run this line of code to see how the frequencies are calculated from the multipliers

    var partialRatios = [0.5, 1, 1.19, 1.56, 2, 2.51, 2.66, 3.01, 4.1];
    SinOsc(500 * partialRatios, 0).sum * 0.05 // bell spectra, all partials the same volume

I can also give each partial its own amplitude in the mix, rather than defaulting them all to 0.1

    var partialRatios = [0.5, 1, 1.19, 1.56, 2, 2.51, 2.66, 3.01, 4.1];
    var partialAmpl = [0.25, 1, 0.8, 0.5, 0.9, 0.4, 0.3, 0.6, 0.1];
    (SinOsc(500 * partialRatios, 0) * partialAmpl).sum * 0.1 // bell spectra,  different volumes for partials

Here is a generalisable patch that uses the variable n to hold the number of sine tones desired for each run of the code:

    var n = 10;
    SinOsc(250 * 1.to(n), 0) / n

If you're unsure what something is in code, investigate it in isolation.

There are lots of ways of dealing with arrays of data in SuperCollider, that we'll investigate as we go.

NC: [2.1](https://composerprogrammer.com/teaching/supercollider/sctutorial/2.1%20Subtractive%20and%20Additive%20Synthesis.html)

# LinPan2 - two channel linear pan

_LinPan2(in, pos, level)_

Two channel linear panner. This one sounds to me more like the Rhodes tremolo than Pan2.

- in: input signal
- pos: pan position, -1 is left, +1 is right

Pan noise:

	LinPan2(PinkNoise(), FSinOsc(2, 0), 0.1)

Pan sine:

	LinPan2(FSinOsc(800, 0), FSinOsc(3, 0), 0.1)

# LinXFade2 - two channel linear crossfade

_LinXFade2(a, b, pos)_

Two channel linear crossdafe.

- a: an input signal
- b: another input signal
- pos: cross fade position from -1 to +1

Cross fade from sine tone to noise and back again:

	LinXFade2(FSinOsc(800, 0), PinkNoise(), FSinOsc(1, 0).kr) * 0.1

# Pan2 - two channel equal power pan

_Pan2(in, pos, level)_

Two channel equal power panner.

- in: input signal
- pos: pan position, -1 is left, +1 is right
- level: a control rate level input.

Pan noise:

	Pan2(PinkNoise(), FSinOsc(2, 0), 0.1)

# PanAz - azimuth panner

_PanAz(numChans, in, pos, level, width, orientation)_

Two channel equal power panner.

- numChans: number of output channels
- in: input signal
- pos: pan position. Channels are evenly spaced over a cyclic period of 2.0 in pos with 0.0 equal to channel zero and 2.0/numChans equal to channel 1, 4.0/numChans equal to channel 2, etc. Thus all channels will be cyclically panned through if a sawtooth wave from -1 to +1 is used to
modulate the pos.
- level: a control rate level input.
- width: The width of the panning envelope. Nominally this is 2.0 which pans between pairs of adjacent speakers. Width values greater than two will spread the pan over greater numbers of speakers. Width values less than one will leave silent gaps between speakers.

Five channel circular panning:

	PanAz(
		5, // numChans
		ClipNoise(), // in
		LFSaw(MouseX(0.2, 8, 1, 0.2), 0), // pos
		0.1, // level
		3, // width
		0.5 // orientation
	)

# PanB - Ambisonic B format panner

PanB(in, azimuth, elevation, level)

- in: input signal
- azimuth:  in radians, -pi to +pi
- elevation:  in radians, -0.5pi to +0.5pi
- level: a control rate level input.

Output channels are in order W,X,Y,Z.  You'll only hear the first two channels on a stereo setup.

	PanB(WhiteNoise(), LFSaw(0.5, 0) * pi, FSinOsc(0.31, 0) * 0.5 * pi, 0.1)

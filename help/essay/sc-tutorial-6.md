# 6. Accessing Audio

## 6.1 How to access live audio input.

The AudioIn unit generator gets a channel of audio from the currently active sound hardware.  It takes a single parameter which is the logical input channel number.  The physical input channel number is determined by the input routing in effect.

To prevent feedback you may want to use headphones.  Play audio from channel 1.

	{ AudioIn(1) }.play

Play audio from channels 1 & 2.  The array [1, 2] causes multichannel expansion resulting in an array of two AudioIn ugens.

	{ AudioIn([1, 2]) }.play

## 6.2 How to play audio files from disk.

The DiskIn unit generator can stream audio from a disk file. It can be used in a number of ways.  For more information look at the DiskIn help file.

	// ...

## 6.3 How to play audio files in RAM

Files loaded in RAM can be processed in more ways because the entire file is accessible.  Files in RAM can be played using the PlayBuf ugen. See the help file for PlayBuf for more info.

Normal playback at same speed of recording:

	var filename = "floating_1"; // the file's path name
	var file = SfAcquire(filename, 1, [1]); // create a SoundFile object
	SfPlay(
		file, // sample buffer
		1, // playback rate
		1, // trigger playback
		0, // starting offset sample
		1, // loop
	);

Mouse controls playback rate:

	var filename = "floating_1"; // the file's path name
	var file = SfAcquire(filename, 1, [1]); // create a SoundFile object
	var rateMultiplier = MouseX(0.25, 4, 1, 0.2);
	SfPlay(
		file, // sample buffer
		rateMultiplier, // playback rate
		1, // trigger playback
		0, // starting offset sample
		1, // loop
	);

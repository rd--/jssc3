%.wav : %.flac
	sndfile-convert -float32 $< $@

sf=CrotaleD6 Floating HarpA4 PianoC5 Then

all: $(sf:=.wav)

clean:
	rm -f *.wav

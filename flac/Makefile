%.wav : %.flac
	sndfile-convert -float32 $< $@

sf=crotale-d6 floating_1 harp-a4 piano-c5 then

all: $(sf:=.wav)

clean:
	rm -f *.wav

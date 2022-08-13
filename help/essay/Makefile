%.html : %.md
	cmark < $<  | runhaskell rw.hs > $@

doc = jssc3-1.html \
	sc-documentation-1.html sc-documentation-2.html sc-documentation-3.html \
	sc-tutorials-1.html \
	sc-help-ugens-analysis.html \
	sc-help-ugens-buffers.html \
	sc-help-ugens-controls.html \
	sc-help-ugens-delays.html \
	sc-help-ugens-envelopes.html \
	sc-help-ugens-events.html \
	sc-help-ugens-filters.html \
	sc-help-ugens-noise.html \
	sc-help-ugens-oscillators.html \
	sc-help-ugens-panners.html \
	sc-help-ugens-random.html \
	sc-help-ugens-samples.html \
	sc-help-ugens-triggers.html \
	sc-help-ugens-unary-operators.html

all:
	make mk-md mk-html

clean:
	rm -f $(doc)

mk-md:
	cat $(HOME)/sw/stsc3/help/sc2/documentation/intro/*.md > sc-documentation-1.md
	cat $(HOME)/sw/stsc3/help/sc2/documentation/audio-basics/*.md > sc-documentation-2.md
	cat $(HOME)/sw/stsc3/help/sc2/documentation/other-topics/*.md > sc-documentation-3.md
	cat $(HOME)/sw/stsc3/help/sc2/tutorials/*.md > sc-tutorials-1.md

rm-md:
	rm -f sc-documentation-*.md sc-tutorials-*.md

mk-html: $(doc)

%.html : %.md
	cmark < $<  | runhaskell rw.hs > $@

doc = jssc3-1.html \
	sc-documentation-1.html sc-documentation-2.html sc-documentation-3.html \
	sc-tutorial-1.html sc-tutorial-2.html sc-tutorial-5.html sc-tutorial-6.html \
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

nc = nc-1.1.html nc-2.1.html nc-2.4.html nc-2.5.html nc-3.4.html nc-12.2.html

all: $(doc)

clean:
	rm -f $(doc)

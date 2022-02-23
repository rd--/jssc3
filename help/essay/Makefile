%.html : %.md
	cmark < $<  | runhaskell rw.hs > $@

doc = jssc3-1.html \
	sc-tutorial-2.html \
	sc-documentation-1.html sc-documentation-2.html sc-documentation-3.html \
	sc-help-ugens-oscillators.html sc-help-ugens-triggers.html \
	nc-1.1.html nc-2.1.html nc-2.4.html nc-2.5.html nc-3.4.html nc-12.2.html

all: $(doc)

clean:
	rm -f $(doc)

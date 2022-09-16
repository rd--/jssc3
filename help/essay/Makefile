%.html : %.md
	cmark < $<  | runhaskell ../../hs/quill-rewrite.hs > $@

doc = jssc3-1.html \
	sc2-documentation-1.html sc2-documentation-2.html sc2-documentation-3.html \
	sc2-tutorials-1.html

all:
	make mk-sc2-doc mk-sc2-help

clean:
	rm -f $(doc)

sc2 = $(HOME)/sw/stsc3/help/sc2

mk-sc2-doc:
	cat $(sc2)/documentation/intro/*.md > sc2-documentation-1.md
	cat $(sc2)/documentation/audio-basics/*.md > sc2-documentation-2.md
	cat $(sc2)/documentation/other-topics/*.md > sc2-documentation-3.md
	cat $(sc2)/tutorials/*.md > sc2-tutorials-1.md
	make $(doc)
	rm -f sc2-documentation-*.md sc2-tutorials-*.md

mk-sc2-help:
	sh ../../sh/help-sc2.sh

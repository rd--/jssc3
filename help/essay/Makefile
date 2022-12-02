%.html : %.md
	cmark < $<  | runhaskell ../../hs/quill-rewrite.hs > $@

doc = superscript.html

all:
	make $(doc)

clean:
	rm -f $(doc)

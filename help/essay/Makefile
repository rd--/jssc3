%.html : %.md
	cmark < $<  | runhaskell rw.hs > $@

doc = rd-1.html nc-1.1.html nc-2.1.html nc-2.4.html nc-2.5.html nc-3.4.html

all: $(doc)

clean:
	rm -f $(doc)

%.html : %.md
	cmark < $<  | runhaskell rw.hs > $@

doc = 1.html nc-2.1.html nc-2.4.html

all: $(doc)

clean:
	rm -f $(doc)

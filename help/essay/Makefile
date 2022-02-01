%.html : %.md
	cmark < $< | tr -d '\n' > $@

doc = 1.html

all: $(doc)

clean:
	rm -f $(doc)

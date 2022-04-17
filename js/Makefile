%.js : %.ts
	tsc --lib dom,es2021 -t es2021 $<

typescripted = sc3-array.js sc3-encode.js sc3-null.js sc3-number.js sc3-string.js sc3-u8.js

all: $(typescripted)

run-lint:
	jshint *.js | grep -v "is not defined"

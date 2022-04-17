%.js : %.ts
	tsc --strict --lib dom,es2021 -t es2021 $<

typescripted = sc3-array.js sc3-dom.js sc3-encode.js sc3-io.js sc3-localstorage.js sc3-null.js sc3-number.js sc3-object.js sc3-operators.js sc3-rate.js sc3-set.js sc3-string.js sc3-u8.js sc3-websocket.js

all: $(typescripted)

clean:
	rm -f $(typescripted)

run-lint:
	jshint *.js | grep -v "is not defined"

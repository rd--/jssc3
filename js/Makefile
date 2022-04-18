%.js : %.ts
	tsc --strict --lib dom,es2021 -t es2021 $<

# .ts files that have no requirements
core = sc3-array sc3-counter sc3-dictionary sc3-dom sc3-encode sc3-io sc3-localstorage sc3-null sc3-number sc3-opensoundcontrol sc3-operators sc3-rate sc3-set sc3-string sc3-tree sc3-websocket

# .ts files that require .ts files in core
base = sc3-graph sc3-soundfile sc3-stc sc3-u8 sc3-ugen

all: base-ts base-js

base-ts:
	cat $(core:=.ts) $(base:=.ts) > jssc3-base.ts

base-js:
	make  jssc3-base.js
	rm -f jssc3-base.ts

clean:
	rm -f $(core:=.js) $(base:=.js)

run-lint:
	jshint *.js | grep -v "is not defined"

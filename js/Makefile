tsc_opt = --strict --lib dom,es2021 -t es2021

%.js : %.ts
	tsc $(tsc_opt) $<

# .ts files that have no requirements
core = sc3-array sc3-counter sc3-dictionary sc3-dom sc3-encode sc3-error sc3-function sc3-io sc3-localstorage sc3-object sc3-maybe sc3-null sc3-number sc3-opensoundcontrol sc3-operators sc3-queue sc3-rate sc3-set sc3-scsynth sc3-scsynth-module sc3-scsynth-options sc3-scsynth-status sc3-string sc3-tree sc3-websocket

# .ts files that require .ts files in core
base = sc3-alias sc3-bindings sc3-buffer sc3-buffer-cache sc3-envelope sc3-event sc3-graph sc3-graph-print sc3-grid sc3-plaintext sc3-pointer sc3-pseudo sc3-servercommand sc3-smalltalk sc3-soundfile sc3-stc sc3-texture sc3-u8 sc3-ugen sc3-ui-actions sc3-ui-notation  sc3-ui-user sc3-websocket-global sc3-websocket-osc

# .js files that are commonly required or at least not harmful
rest = sc3-ui sc3-ui-mouse

# .js files for simple non-core js objects for .stc translator
obj = sc3-obj sc3-num sc3-block sc3-bool sc3-dict sc3-int sc3-float sc3-nil sc3-str sc3-sym sc3-vector

all: jssc3-base-js

jssc3-base-ts:
	cat $(core:=.ts) $(base:=.ts) | sed -r 's/^export //' | sed -r 's/import.*//' > jssc3-base.ts

jssc3-base-js: jssc3-base-ts
	make jssc3-base.js
	cat $(rest:=.js) >> jssc3-base.js # $(obj:=.js)
	rm -f jssc3-base.ts

core-ts:
	tsc $(tsc_opt) $(core:=.ts)

base-ts:
	tsc $(tsc_opt) $(base:=.ts)

clean:
	rm -f $(core:=.js) $(base:=.js)

clean-base:
	rm -f jssc3-base.*

run-lint:
	jshint *.js | grep -v "is not defined"

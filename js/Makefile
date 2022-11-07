tsc_opt = --strict --lib dom,es2021 -t es2021

%.js : %.ts
	tsc $(tsc_opt) $<

# kernel (.ts)
kernel = array dictionary dom encode error function io localstorage object null number set  string websocket

# stdlib (.ts)
stdlib = counter grid maybe opensoundcontrol queue soundfile tree u8

# sc3 (.ts)
sc3 = alias bindings buffer buffer-cache cc-event envelope graph graph-print operators pointer pseudo rate scsynth scsynth-module scsynth-options scsynth-status servercommand smalltalk stc texture ugen wasm

# ui (.ts)
ui = display editor graph init plaintext actions notation user

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

translate-ts:
	(cd kernel ; tsc $(tsc_opt) $(kernel:=.ts))
	(cd stdlib ; tsc $(tsc_opt) $(stdlib:=.ts))
	(cd sc3 ; tsc $(tsc_opt) $(sc3:=.ts))
	(cd ui ; tsc $(tsc_opt) $(ui:=.ts))

base-ts:
	tsc $(tsc_opt) $(base:=.ts)

clean:
	rm -f *~ $(core:=.js) $(base:=.js)

clean-base:
	make clean
	rm -f jssc3-base.*

run-lint:
	jshint *.js | grep -v "is not defined"

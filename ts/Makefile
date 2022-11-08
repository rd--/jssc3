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
ui = actions display editor graph init mouse notation plaintext user

translate-ts:
	(cd kernel ; tsc $(tsc_opt) $(kernel:=.ts))
	(cd sc3 ; tsc $(tsc_opt) $(sc3:=.ts))
	(cd stdlib ; tsc $(tsc_opt) $(stdlib:=.ts))
	(cd ui ; tsc $(tsc_opt) $(ui:=.ts))

install-js:
	(cd kernel ; mv *.js ../../js/kernel)
	(cd sc3 ; mv *.js ../../js/sc3)
	(cd stdlib ; mv *.js ../../js/stdlib)
	(cd ui ; mv *.js ../../js/ui)

clean:
	rm -f
	(cd kernel ; rm -f $(kernel:=.js))
	(cd sc3 ; rm -f $(sc3:=.js))
	(cd stdlib ; rm -f $(stdlib:=.js))
	(cd ui ; rm -f $(ui:=.js))

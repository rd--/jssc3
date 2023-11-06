dist:
	deno run --allow-net --allow-read --allow-env mk-dist.js | grep -v "//#" > ../dist/jssc3.js

check-ts:
	deno check --config deno.json */*.ts

all: bundle

repl:
	deno repl --allow-net --allow-read --allow-env --unstable

test-udp:
	deno run --allow-net --unstable kernel/udp.ts

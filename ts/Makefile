dist:
	deno run --allow-net --allow-read --allow-env mk-dist.js | grep -v "//#" > ../dist/jssc3.js

check-ts:
	deno check --config deno.json */*.ts

fmt-ts:
	deno fmt --use-tabs --single-quote

repl:
	deno repl --allow-net --allow-read --allow-env --unstable

test-udp:
	deno run --allow-net --unstable kernel/udp.ts

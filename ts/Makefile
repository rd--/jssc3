bundle:
	deno bundle --config ./deno.json --no-check jssc3.ts ../dist/jssc3.js

check-ts:
	deno check --config deno.json */*.ts

all: bundle

test-udp:
	deno run --allow-net --unstable kernel/udp.ts

check-ts:
	deno check --config deno.json */*.ts

bundle:
	deno bundle --config ./deno.json --no-check jssc3.ts ../js/jssc3.js

all: check-ts bundle

test-udp:
	deno run --allow-net --unstable kernel/udp.ts

dist:
	deno run --allow-net --allow-read --allow-env mk-dist.js > ../dist/jssc3.hs

check-ts:
	deno check --config deno.json */*.ts

all: bundle

test-udp:
	deno run --allow-net --unstable kernel/udp.ts

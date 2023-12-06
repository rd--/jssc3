ws-tcp-bridge:
	deno run --unstable --allow-net --allow-read --allow-write --allow-env ws-tcp-bridge.ts

check-ts:
	deno --unstable check *.ts

format-ts:
	deno fmt --use-tabs --single-quote

lint-ts:
	deno lint

install-file-server:
	deno install --allow-net --allow-read https://deno.land/std/http/file_server.ts

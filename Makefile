all:
	echo "jssc3"

clean:
	rm -f dist/jssc3.js

http-file-server:
	python3 cmd/http-server.py

deno-http-file-server:
	file_server --cors -p 8000

push-all:
	r.gitlab-push.sh jssc3
	r.github-push.sh jssc3

remote-update:
	ssh rd@rohandrape.net "(cd rohandrape.net/pub/jssc3 ; git pull ; make remote-setup)"

remote-setup:
	(cd lib/scsynth-wasm-builds ; git pull)
	(cd lib/stsc3 ; git pull)
	(cd lib/spl ; git pull)
	cp lib/scsynth-wasm-builds/lib/jssc3/dist/jssc3.js dist/
	cp lib/scsynth-wasm-builds/lib/spl/dist/sl.js lib/spl/dist/
	cp lib/scsynth-wasm-builds/lib/spl/.cache/*.js lib/spl/.cache/

mk-small-hours-menu:
	(cd ~/sw/spl/help/SuperCollider ; ls Collect/*.sl Graph/*.sl Texture/*.sl > ~/sw/jssc3/text/program-menu.text)

mk-cgi-ln:
	ln -s lib/stsc3/cgi-bin cgi-bin

indent:
	(cd ts; make fmt-ts)

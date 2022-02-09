all:
	echo "jssc3"

push-all:
	r.gitlab-push.sh jssc3
	r.github-push.sh jssc3

remote-update:
	ssh rd@rohandrape.net "(cd rohandrape.net/pub/jssc3 ; git pull ; cd lib/scsynth-wasm-builds ; git pull)"

mk-cgi-ln:
	ln -s lib/stsc3/cgi-bin cgi-bin

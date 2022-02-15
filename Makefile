all:
	echo "jssc3"

push-all:
	r.gitlab-push.sh jssc3
	r.github-push.sh jssc3

update-submodules:
	git submodule foreach git pull

remote-update:
	ssh rd@rohandrape.net "(cd rohandrape.net/pub/jssc3 ; git pull ; git submodule update)"

mk-cgi-ln:
	ln -s lib/stsc3/cgi-bin cgi-bin

all:
	echo "jssc3"

clean:
	rm -f dist/jssc3.js

push-all:
	r.gitlab-push.sh jssc3
	r.github-push.sh jssc3

update-submodules:
	git submodule foreach git pull

remote-update:
	ssh rd@rohandrape.net "(cd rohandrape.net/pub/jssc3 ; git pull ; git submodule update)"

remote-dist:
	sftp rd@rohandrape.net:rohandrape.net/pub/jssc3/dist/ <<< $'put dist/jssc3.js'

mk-cgi-ln:
	ln -s lib/stsc3/cgi-bin cgi-bin

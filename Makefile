all:
	echo "jssc3"

push-all:
	r.gitlab-push.sh jssc3
	r.github-push.sh jssc3

remote-update:
	ssh rd@rohandrape.net "(cd rohandrape.net/pub/jssc3 ; git pull)"

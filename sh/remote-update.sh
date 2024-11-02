#!/bin/sh

(cd ~/sw/jssc3 ; pwd ; make push-all)
(cd ~/sw/blksc3 ; pwd ; make push-all)
(cd ~/sw/spl ; pwd ; make push-all)

ssh rd@rohandrape.net "(cd ~/rohandrape.net/pub/jssc3; git pull; make remote-setup; cd ~/rohandrape.net/pub/blksc3; git pull; make remote-setup; cd ~/rohandrape.net/pub/spl; git pull)"

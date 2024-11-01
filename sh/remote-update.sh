#!/bin/sh

(cd ~/sw/jssc3 ; pwd ; make push-all remote-update)
(cd ~/sw/blksc3 ; pwd ; make push-all remote-update)
(cd ~/sw/spl ; pwd ; make push-all remote-update)

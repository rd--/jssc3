#!/bin/sh

cd ~/sw/jssc3/text/
rm -f smallhours-help.text
(cd ~/sw/ ; ls -1 spl/help/*/*/*.sl) >> smallhours-help.text

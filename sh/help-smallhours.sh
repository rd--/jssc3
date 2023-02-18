#!/bin/sh

cd ~/sw/jssc3/text/
rm -f smallhours-help.text
(cd ~/sw/spl/ ; ls -1 help/spl/*.sl) >> smallhours-help.text
(cd ~/sw/spl/ ; ls -1 doc/*/*.sl) >> smallhours-help.text
(cd ~/sw/stsc3/ ; ls -1 help/sc/*.sl) >> smallhours-help.text
(cd ~/sw/stsc3/ ; ls -1 doc/sc/*.sl) >> smallhours-help.text

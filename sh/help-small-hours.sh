#!/bin/sh

r=$HOME/sw/jssc3/text/SmallHoursPrograms.text
cd ~/sw/spl/help/SuperCollider
ls Graph/*.sl > $r
ls Texture/*.sl >> $r
ls *Collection/*.sl >> $r

#!/bin/sh

r=$HOME/sw/jssc3/text/SmallHoursPrograms.text
cd ~/sw/spl/Program/SuperCollider
ls Graph/*.sp > $r
ls Texture/*.sp >> $r
ls "Graph Collection"/*.sp >> $r
ls "Texture Collection"/*.sp >> $r
ls "Unit Generator"/*.help.sl >> $r

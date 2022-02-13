#!/bin/sh

for i in graph/*.stc
do
    echo $i
    diff ~/sw/stsc3/help/$i $i
done

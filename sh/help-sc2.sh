jssc3=$HOME/sw/jssc3
stsc3=$HOME/sw/stsc3
sc2=$stsc3/help/sc2

categories="analysis buffers controls delays envelopes events filters noise oscillators panners random samples triggers unary-operators"

for i in $categories
do
    echo $i
    cat $sc2/help/unit-generators/$i/*.md | cmark | runhaskell $jssc3/hs/quill-rewrite.hs > sc2-help-ugens-$i.html
done

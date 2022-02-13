all:
	echo "jssc3/lib"

clone-all: clone-oscjs clone-scsynth clone-stsc3

fetch-all: fetch-oscjs fetch-scsynth fetch-stsc3

download-all: download-quill

clone-oscjs:
	git clone https://github.com/colinbdclark/osc.js/

fetch-oscjs:
	(cd osc.js ; git pull)

clone-scsynth:
	git clone https://gitlab.com/rd--/scsynth-wasm-builds

fetch-scsynth:
	(cd scsynth-wasm-builds ; git pull)

clone-stsc3:
	git clone https://gitlab.com/rd--/stsc3

fetch-stsc3:
	(cd stsc3 ; git pull)

download-quill:
	rm -Rf quill
	wget https://github.com/quilljs/quill/releases/download/v1.3.7/quill.tar.gz
	tar zxf quill.tar.gz
	rm quill.tar.gz

# ace is a text editor library, it's not used by default because it doesn't support proportional fonts, a simple textarea is used instead

clone-ace:
	git clone https://github.com/ajaxorg/ace-builds/

fetch-ace:
	(cd ace-builds ; git pull)

all:
	echo "jssc3/lib"

# quill is a rich text editor library, jssc3 requires the 1.3.7 release files

download-quill:
	rm -Rf quill
	wget https://github.com/quilljs/quill/releases/download/v1.3.7/quill.tar.gz
	tar zxf quill.tar.gz
	rm quill.tar.gz

# use submodules

add-submodules:
	git submodule add https://github.com/colinbdclark/osc.js/
	git submodule add https://gitlab.com/rd--/scsynth-wasm-builds
	git submodule add https://gitlab.com/rd--/stsc3

# use submodules, do not fetch

fetch-all: fetch-oscjs fetch-scsynth fetch-stsc3

fetch-oscjs:
	(cd osc.js ; git pull)

fetch-scsynth:
	(cd scsynth-wasm-builds ; git pull)

fetch-stsc3:
	(cd stsc3 ; git pull)

# use submodules, do not clone

clone-all: clone-oscjs clone-scsynth clone-stsc3

clone-oscjs:
	git clone https://github.com/colinbdclark/osc.js/

clone-scsynth:
	git clone https://gitlab.com/rd--/scsynth-wasm-builds

clone-stsc3:
	git clone https://gitlab.com/rd--/stsc3

# ace is a text editor library, it's not used by default because it doesn't support proportional fonts, a simple textarea is used instead

clone-ace:
	git clone https://github.com/ajaxorg/ace-builds/

fetch-ace:
	(cd ace-builds ; git pull)

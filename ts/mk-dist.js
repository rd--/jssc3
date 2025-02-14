import { bundle } from 'https://deno.land/x/emit/mod.ts';
if (Deno.args.length != 2) {
	throw new Error('mk-dist: inputFile outputFile');
}
const inputFile = Deno.args[0];
const outputFile = Deno.args[1];
const moduleUrl = new URL(inputFile, import.meta.url);
const result = await bundle(
	moduleUrl,
	{
		compilerOptions: {
			sourceMap: false,
			inlineSourceMap: false,
		},
	},
);
const { code } = result;
const plainCode = code.replace(/\/\/\#.*/,'')
await Deno.writeTextFile(outputFile, plainCode);

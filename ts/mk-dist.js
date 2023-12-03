import { bundle } from 'https://deno.land/x/emit/mod.ts';
const moduleUrl = new URL('./jssc3.ts', import.meta.url);
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
console.log(code);

import { bundle } from "https://deno.land/x/emit/mod.ts";
const result = await bundle(
	new URL('./jssc3.ts', import.meta.url),
	{
		compilerOptions: {
			sourceMap: false,
			inlineSourceMap: false}
	}
);
console.log(result.code);

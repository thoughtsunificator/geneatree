import { fileURLToPath } from 'url'
import path from "path"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"
import rootImport from "rollup-plugin-root-import"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import postcssImportGlob from "postcss-import-ext-glob"
import configEnv from "@thoughtsunificator/rollup-plugin-config-env"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
	input: "./src/main.js",
	output: {
		file: "./dist/dev/public/bundle.js",
		format: "iife",
		sourcemap: true
	},
	plugins: [
		postcss({
			sourceMap: true,
			extract: path.resolve("dist/dev/public/bundle.css"),
			plugins: [
				postcssImportGlob,
				postcssImport()
			]
		}),
		copy({
			watch: 'public',
			targets: [{ src: "public", dest: "dist/dev" }],
			flatten: false
		}),
		nodeResolve(),
		configEnv(),
		alias({
			entries: [
				{ find:/^lib\/(.*)/, replacement: "./lib/$1" },
				{ find:/^assets\/(.*)/, replacement: "./assets/$1" },
				{ find:/^data\/(.*)/, replacement: "./data/$1" }
			]
		}),
		rootImport({
			root: `${__dirname}/src`,
			useInput: "prepend",
			extensions: ".js",
		}),
		serve({
			contentBase: "dist/dev/public",
			port: 3000
		}),
		livereload('dist/dev/public')
	]
}

import { fileURLToPath } from 'url'
import path from "path"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import rootImport from "rollup-plugin-root-import"
import alias from "@rollup/plugin-alias"
import postcssImportGlob from "postcss-import-ext-glob"
import configEnv from "@thoughtsunificator/rollup-plugin-config-env"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
	input: "./src/main.js",
	output: {
			file: "./dist/prod/public/bundle.js",
			format: "iife",
	},
	plugins: [
		del({ targets: "dist/prod" }),
		postcss({
			extract: true,
			minimize: true,
			extract: path.resolve("dist/prod/public/bundle.css"),
			plugins: [
				postcssImportGlob,
				postcssImport()
			]
		}),
		terser(),
		copy({
			targets: [{ src: "public", dest: "dist/prod" }],
			flatten: false
		}),
		nodeResolve(),
		configEnv(),
		alias({
			entries: [
				{ find:/^lib\/(.*)/, replacement: "./lib/$1" },
				{ find:/^assets\/(.*)/, replacement: "./assets/$1" },
				{ find:/^data\/(.*)/, replacement: "./data/$1" },
				{ find:/^\.env\.js$/, replacement: "./.env.js" }
			]
		}),
		rootImport({
			root: `${__dirname}/src`,
			useInput: "prepend",
			extensions: ".js",
		})
	]
}

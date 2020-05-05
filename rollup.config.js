import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import postcssEasyImport  from "postcss-easy-import"
import { terser } from "@wwa/rollup-plugin-terser"
import copy from "rollup-plugin-copy-watch"
import nodeResolve from "@rollup/plugin-node-resolve"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import rollupWindowEnv from "@thoughtsunificator/rollup-plugin-window-env"
import rollupWorkerFactory from "rollup-plugin-worker-factory"

const isProduction = process.env.BUILD === "production"
const isDevelopment = !isProduction

export default {
	input: "src/main.js",
	output: {
		file: "dist/bundle.js",
		format: "iife",
		sourcemap: isDevelopment
	},
	plugins: [
		rollupWindowEnv({ envPath : ".env.json", confPath : "data/config.json" }),
		postcss({
			minimize: isProduction,
			sourceMap: isDevelopment,
			extract: true,
			plugins: [postcssEasyImport(), postcssImport()]
		}),
		rollupWorkerFactory({ type: "universal" }),
		isProduction && terser(),
		copy({
			watch: isDevelopment ? "public" : false,
			targets: [{ src: "public/*", dest: "dist" }],
			flatten: false
		}),
		nodeResolve(),
		isDevelopment && livereload({
			watch: "dist",
			delay: 500
		}),
		isDevelopment && serve({
			contentBase: "dist",
			port: process.env.PORT || 3000
		}),
	]
}

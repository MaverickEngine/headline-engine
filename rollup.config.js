// import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss'
import css from 'rollup-plugin-css-only';
// import preprocess from 'svelte-preprocess';
import { nodeResolve } from '@rollup/plugin-node-resolve';


const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const pkg = require('./package.json');

export default [
	{
		input: "src/headlineengine-post.js",
		output: [
			{
				sourcemap: true,
				format: 'iife',
				name: "headlineengine_post",
				file: "dist/headlineengine-post.js"
			},
		],
		plugins: [
			scss(),
			css({ output: "headlineengine-post.css" }),
			nodeResolve({
				browser: true,
			}),
			commonjs(),
			!production && serve(),
			production && terser()
		]
	},
	{
		input: "src/headlineengine-gutenberg.js",
		output: [
			{
				sourcemap: true,
				format: 'iife',
				name: "headlineengine_gutenberg",
				file: "dist/headlineengine-gutenberg.js"
			},
		],
		plugins: [
			scss(),
			css({ output: "headlineengine-gutenberg.css" }),
			nodeResolve({
				browser: true,
			}),
			commonjs(),
			!production && serve(),
			production && terser()
		]
	},
	{
		input: "src/headlineengine-admin.js",
		output: [
			{
				sourcemap: true,
				format: 'iife',
				name: "headlineengine_admin",
				file: "dist/headlineengine-admin.js"
			},
		],
		plugins: [
			nodeResolve({
				browser: true,
			}),
			commonjs(),
			!production && serve(),
			production && terser()
		]
	}
];

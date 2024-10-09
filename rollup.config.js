import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife', // Immediately Invoked Function Expression — for browsers
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            // Use compilerOptions instead of dev and css
            compilerOptions: {
                dev: !production,
            }
        }),
        // Add postcss to the plugins array
        postcss({
            extract: true, // Extract CSS into separate file
            minimize: production,
        }),
        // Resolve modules
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),
        // Minify the bundle in production mode
        production && terser(),
        // Live reload for development
        livereload('public')
    ],
    watch: {
        clearScreen: false
    }
};

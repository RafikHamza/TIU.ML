import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import preprocess from 'svelte-preprocess'; // Import preprocess

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife', // Change as needed (e.g., 'es', 'cjs')
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      preprocess: preprocess(), // Add preprocess here
      // Enable runtime checks when not in production
      compilerOptions: {
        dev: !production
      },
      emitCss: true // Extract CSS if true
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    postcss({ extract: true }), // Ensure postcss is included
    production && terser(),
    livereload('public'), // Enable livereload
  ],
  watch: {
    clearScreen: false
  }
};

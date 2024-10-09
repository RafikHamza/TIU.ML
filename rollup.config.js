import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      preprocess: preprocess(),  // Add this line
      // Other options...
    }),

    resolve({ browser: true }),
    commonjs(),

    !production && serve({
      open: true,
      contentBase: ['public'],
    }),

    !production && livereload('public'),

    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

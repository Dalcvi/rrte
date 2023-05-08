import esbuild from 'rollup-plugin-esbuild';
import svgr from '@svgr/rollup';
import * as fs from 'fs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const PACKAGE_NAME = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(PACKAGE_NAME, 'package.json'), 'utf-8'));

const externals = [
  /node_modules/,
  /@rrte\/.*/,
  /@tiptap\/.*/,
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];

const includeExternals = [/style-inject/];

const dtsOutput = {
  dir: 'dist/types',
  format: 'es',
};

const additionalPackages = process.env.NODE_ENV === 'production' ? [dts({ output: dtsOutput })] : [];

const cjsOutput = {
  dir: 'dist/cjs',
  format: 'cjs',
  sourcemap: true,
};

const esOutput = {
  dir: 'dist/es',
  format: 'es',
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: true,
};

export default {
  input: `${PACKAGE_NAME}/src/index.ts`,
  external: (moduleImport) => {
    return (
      !includeExternals.some((notExternal) => moduleImport.match(notExternal)) &&
      externals.some((external) => moduleImport.match(external))
    );
  },
  output: process.env.NODE_ENV === 'production' ? [cjsOutput, esOutput] : [esOutput],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      modulesOnly: true,
    }),
    commonjs({
      sourceMap: process.env.NODE_ENV === 'production',
      exclude: ['node_modules/**'],
    }),
    svgr({}),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: process.env.NODE_ENV === 'development',
      minify: process.env.NODE_ENV === 'production',
      jsx: 'automatic',
      target: 'es2017',
      define: {
        __VERSION__: '"x.y.z"',
      },
    }),
    postcss({
      modules: true,
      inject: true,
      minimize: process.env.NODE_ENV === 'production',
      use: ['sass'],
      exclude: /node_modules/,
    }),
    ...additionalPackages,
  ],
};

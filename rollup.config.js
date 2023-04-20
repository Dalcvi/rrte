import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import esbuild from 'rollup-plugin-esbuild';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import * as fs from "fs";
import path from "path";
import postcss from 'rollup-plugin-postcss'

const PACKAGE_NAME = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(PACKAGE_NAME, 'package.json'), 'utf-8'));

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
}
const extensions = ['.js', '.ts', '.tsx'];

const babelOptions = {
  exclude: /node_modules/,
  extensions,
  configFile: '../../babel.config.json',
  babelHelpers: 'runtime'
};
const nodeOptions = {
  extensions,
};
const typescriptOptions = {
  tsconfig: `${PACKAGE_NAME}/tsconfig.json`,
  declaration: true,
  declarationDir: '.',
  emitDeclarationOnly: true,
  declarationMap: true,
};

export default {
  input: `${PACKAGE_NAME}/src/index.ts`,
  external: [...Object.keys(pkg.peerDependencies)],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      chunkFileNames: 'chunks/[name]-[hash].js',
    },
    {
      file: pkg.module,
      format: 'es',
      chunkFileNames: 'chunks/[name]-[hash].js',
    }
  ],
  plugins: [
    excludeDependenciesFromBundle({peerDependencies: true}),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/, 
      sourceMap: true, 
      minify: false,
      target: 'es2017', 
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json',
    }),
    postcss({
      modules: true,
      extract: true,
      use: ['sass']
    }),
  ]
}
import coffeescript from 'rollup-plugin-coffee-script'
import json from '@rollup/plugin-json'
import filesize from 'rollup-plugin-filesize'
import includePaths from 'rollup-plugin-includepaths'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

import { version } from "./package.json"
const year = new Date().getFullYear()
const banner = `/*\nTrix ${version}\nCopyright © ${year} Basecamp, LLC\n */`

export default [
  {
    input: "src/trix/trix.coffee",
    output: [
      {
        name: "Trix",
        file: "dist/trix.js",
        format: "umd",
        sourcemap: false,
        banner
      }
    ],
    plugins: [
      coffeescript(),
      json(),
      nodeResolve({ extensions: ['.js', '.coffee'] }),
      includePaths({
        paths: ["src/trix"],
        extensions: [".js", ".coffee"]
      }),
      filesize()
    ],
    watch: {
      include: "src/**"
    }
  },
  {
    input: "src/test/test.coffee",
    output: [
      {
        name: "TrixTests",
        file: "dist/test.js",
        format: "umd",
        sourcemap: false,
        banner
      }
    ],
    plugins: [
      coffeescript(),
      json(),
      includePaths({
        paths: ["src/trix", "src/test"],
        extensions: [".js", ".coffee"]
      }),
      nodeResolve({ extensions: ['.js', '.coffee'] }),
      commonjs({
        extensions: ['.js', '.coffee']
      }),
    ],

    treeshake: false,
    watch: {
      include: "src/**"
    }
  }
]

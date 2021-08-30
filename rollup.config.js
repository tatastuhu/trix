import coffeescript from 'rollup-plugin-coffee-script'
import json from '@rollup/plugin-json'
import filesize from 'rollup-plugin-filesize'
import includePaths from 'rollup-plugin-includepaths'

import { version } from "./package.json"
const year = new Date().getFullYear()
const banner = `/*\nTrix ${version}\nCopyright © ${year} Basecamp, LLC\n */`

export default {
  input: "assets/trix-core.coffee",
  output: [
    {
      name: "Trix",
      file: "dist/trix.js",
      format: "umd",
      sourcemap: true,
      banner
    }
  ],
  plugins: [
    coffeescript(),
    json(),
    filesize(),
    includePaths({
      paths: ["src/trix"],
      extensions: ['.js', '.coffee']
    })
  ],
  watch: {
    include: "src/**"
  }
}

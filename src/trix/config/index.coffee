import lang from "./lang.coffee"
import css from "./css.coffee"
import blockAttributes from "./block_attributes.coffee"
import fileSize from "./file_size_formatting.coffee"
import textAttributes from "./text_attributes.coffee"
import undoInterval from "./undo_interval.coffee"
import attachments from "./attachments.coffee"
import keyNames from "./key_names.coffee"

#= require trix/config/serialization

import toolbar from "./toolbar.coffee"
import input from "./input.coffee"

export default config = {
  lang,
  css,
  blockAttributes,
  fileSize,
  textAttributes,
  toolbar,
  undoInterval,
  attachments,
  keyNames,
  input,
}
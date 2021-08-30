import { browser } from "index"
import { removeNode, makeElement } from "core/helpers/dom"

input =
  level2Enabled: true

  getLevel: ->
    if @level2Enabled and browser.supportsInputEvents
      2
    else
      0

  pickFiles: (callback) ->
    input = makeElement("input", type: "file", multiple: true, hidden: true, id: @fileInputId)

    input.addEventListener "change", ->
      callback(input.files)
      removeNode(input)

    removeNode(document.getElementById(@fileInputId))
    document.body.appendChild(input)
    input.click()

  fileInputId: "trix-file-input-#{Date.now().toString(16)}"

export default input

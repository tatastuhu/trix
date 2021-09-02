import { removeNode, makeElement } from "core/helpers/dom"

export fileInput =
  pickFiles: (callback) ->
    input = makeElement("input", type: "file", multiple: true, hidden: true, id: @fileInputId)

    input.addEventListener "change", ->
      callback(input.files)
      removeNode(input)

    removeNode(document.getElementById(@fileInputId))
    document.body.appendChild(input)
    input.click()

  fileInputId: "trix-file-input-#{Date.now().toString(16)}"

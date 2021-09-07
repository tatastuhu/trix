export getEditorElement = ->
  document.querySelector("trix-editor")

export getToolbarElement = ->
  getEditorElement().toolbarElement

export getEditorController = ->
  getEditorElement().editorController

export getEditor = ->
  getEditorController().editor

export getComposition = ->
  getEditorController().composition

export getDocument = ->
  getComposition().document

export getSelectionManager = ->
  getEditorController().selectionManager

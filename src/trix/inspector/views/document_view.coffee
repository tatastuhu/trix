import Inspector from "inspector/index"

export default DocumentView class extends View
  title: "Document"
  template: "document"
  events:
    "trix-change": ->
      @render()

  render: ->
    @document = @editor.getDocument()
    super

Inspector.registerView DocumentView

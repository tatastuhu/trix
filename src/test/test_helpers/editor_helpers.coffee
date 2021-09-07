


export insertString = (string) ->
  getComposition().insertString(string)
  render()

export insertText = (text) ->
  getComposition().insertText(text)
  render()

export insertDocument = (document) ->
  getComposition().insertDocument(document)
  render()

export insertFile = (file) ->
  getComposition().insertFile(file)
  render()

export insertAttachment = (attachment) ->
  getComposition().insertAttachment(attachment)
  render()

export insertAttachments = (attachments) ->
  getComposition().insertAttachments(attachments)
  render()

export insertImageAttachment = (attributes) ->
  attachment = helpers.createImageAttachment(attributes)
  helpers.insertAttachment(attachment)

export createImageAttachment = (attributes) ->
  attributes ?=
    url: TEST_IMAGE_URL
    width: 10
    height: 10
    filename: "image.gif"
    filesize: 35
    contentType: "image/gif"

  new Trix.Attachment attributes

export replaceDocument = (document) ->
  getComposition().setDocument(document)
  render()

render = ->
  getEditorController().render()

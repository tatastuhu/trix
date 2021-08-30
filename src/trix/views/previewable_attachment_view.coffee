import { makeElement } from "core/helpers/dom"
import { lang } from from "config/index"
import AttachmentView from "views/attachment_view"

export default class PreviewableAttachmentView extends AttachmentView
  constructor: ->
    super
    @attachment.previewDelegate = this

  createContentNodes: ->
    @image = makeElement
      tagName: "img"
      attributes:
        src: ""
      data:
        trixMutable: true

    @refresh(@image)
    [@image]

  createCaptionElement: ->
    figcaption = super
    unless figcaption.textContent
      figcaption.setAttribute("data-trix-placeholder", lang.captionPlaceholder)
    figcaption

  refresh: (image) ->
    image ?= @findElement()?.querySelector("img")
    @updateAttributesForImage(image) if image

  updateAttributesForImage: (image) ->
    url = @attachment.getURL()
    previewURL = @attachment.getPreviewURL()
    image.src = previewURL or url

    if previewURL is url
      image.removeAttribute("data-trix-serialized-attributes")
    else
      serializedAttributes = JSON.stringify(src: url)
      image.setAttribute("data-trix-serialized-attributes", serializedAttributes)

    width = @attachment.getWidth()
    height = @attachment.getHeight()

    image.width = width if width?
    image.height = height if height?

    storeKey = ["imageElement", @attachment.id, image.src, image.width, image.height].join("/")
    image.dataset.trixStoreKey = storeKey

  # Attachment delegate

  attachmentDidChangeAttributes: ->
    @refresh(@image)
    @refresh()

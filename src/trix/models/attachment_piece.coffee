import { OBJECT_REPLACEMENT_CHARACTER } from "trix"

import Attachment from "models/attachment"
import Piece from "models/piece"

export default class AttachmentPiece extends Piece
  @fromJSON: (pieceJSON) ->
    new this Attachment.fromJSON(pieceJSON.attachment), pieceJSON.attributes

  @permittedAttributes: ["caption", "presentation"]

  constructor: (@attachment) ->
    super()
    @length = 1
    @ensureAttachmentExclusivelyHasAttribute("href")
    @removeProhibitedAttributes() unless @attachment.hasContent()

  ensureAttachmentExclusivelyHasAttribute: (attribute) ->
    if @hasAttribute(attribute)
      unless @attachment.hasAttribute(attribute)
        @attachment.setAttributes(@attributes.slice(attribute))
      @attributes = @attributes.remove(attribute)

  removeProhibitedAttributes: ->
    attributes = @attributes.slice(@constructor.permittedAttributes)
    unless attributes.isEqualTo(@attributes)
      @attributes = attributes

  getValue: ->
    @attachment

  isSerializable: ->
    not @attachment.isPending()

  getCaption: ->
    @attributes.get("caption") ? ""

  isEqualTo: (piece) ->
    super and @attachment.id is piece?.attachment?.id

  toString: ->
    OBJECT_REPLACEMENT_CHARACTER

  toJSON: ->
    json = super()
    json.attachment = @attachment
    json

  getCacheKey: ->
    [super, @attachment.getCacheKey()].join("/")

  toConsole: ->
    JSON.stringify(@toString())

Piece.registerType "attachment", AttachmentPiece

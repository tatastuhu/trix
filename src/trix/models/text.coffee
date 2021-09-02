import { getDirection } from "core/helpers/bidi"

import TrixObject from "core/object" # Don't override global Object
import Hash from "core/collections/hash"

import Piece from "models/piece"
import AttachmentPiece from "models/attachment_piece"
import StringPiece from "models/string_piece"
import SplittableList from "models/splittable_list"

export default class Text extends TrixObject
  @textForAttachmentWithAttributes: (attachment, attributes) ->
    piece = new AttachmentPiece attachment, attributes
    new this [piece]

  @textForStringWithAttributes: (string, attributes) ->
    piece = new StringPiece string, attributes
    new this [piece]

  @fromJSON: (textJSON) ->
    pieces = for pieceJSON in textJSON
      Piece.fromJSON pieceJSON
    new this pieces

  constructor: (pieces = []) ->
    super(arguments...)
    @pieceList = new SplittableList (piece for piece in pieces when not piece.isEmpty())

  copy: ->
    @copyWithPieceList @pieceList

  copyWithPieceList: (pieceList) ->
    new @constructor pieceList.consolidate().toArray()

  copyUsingObjectMap: (objectMap) ->
    pieces = for piece in @getPieces()
      objectMap.find(piece) ? piece
    new @constructor pieces

  appendText: (text) ->
    @insertTextAtPosition(text, @getLength())

  insertTextAtPosition: (text, position) ->
    @copyWithPieceList @pieceList.insertSplittableListAtPosition(text.pieceList, position)

  removeTextAtRange: (range) ->
    @copyWithPieceList @pieceList.removeObjectsInRange(range)

  replaceTextAtRange: (text, range) ->
    @removeTextAtRange(range).insertTextAtPosition(text, range[0])

  moveTextFromRangeToPosition: (range, position) ->
    return if range[0] <= position <= range[1]
    text = @getTextAtRange(range)
    length = text.getLength()
    position -= length if range[0] < position
    @removeTextAtRange(range).insertTextAtPosition(text, position)

  addAttributeAtRange: (attribute, value, range) ->
    attributes = {}
    attributes[attribute] = value
    @addAttributesAtRange(attributes, range)

  addAttributesAtRange: (attributes, range) ->
    @copyWithPieceList @pieceList.transformObjectsInRange range, (piece) ->
      piece.copyWithAdditionalAttributes(attributes)

  removeAttributeAtRange: (attribute, range) ->
    @copyWithPieceList @pieceList.transformObjectsInRange range, (piece) ->
      piece.copyWithoutAttribute(attribute)

  setAttributesAtRange: (attributes, range) ->
    @copyWithPieceList @pieceList.transformObjectsInRange range, (piece) ->
      piece.copyWithAttributes(attributes)

  getAttributesAtPosition: (position) ->
    @pieceList.getObjectAtPosition(position)?.getAttributes() ? {}

  getCommonAttributes: ->
    objects = (piece.getAttributes() for piece in @pieceList.toArray())
    Hash.fromCommonAttributesOfObjects(objects).toObject()

  getCommonAttributesAtRange: (range) ->
    @getTextAtRange(range).getCommonAttributes() ? {}

  getExpandedRangeForAttributeAtOffset: (attributeName, offset) ->
    left = right = offset
    length = @getLength()

    left-- while left > 0 and @getCommonAttributesAtRange([left - 1, right])[attributeName]
    right++ while right < length and @getCommonAttributesAtRange([offset, right + 1])[attributeName]

    [left, right]

  getTextAtRange: (range) ->
    @copyWithPieceList @pieceList.getSplittableListInRange(range)

  getStringAtRange: (range) ->
    @pieceList.getSplittableListInRange(range).toString()

  getStringAtPosition: (position) ->
    @getStringAtRange([position, position + 1])

  startsWithString: (string) ->
    @getStringAtRange([0, string.length]) is string

  endsWithString: (string) ->
    length = @getLength()
    @getStringAtRange([length - string.length, length]) is string

  getAttachmentPieces: ->
    piece for piece in @pieceList.toArray() when piece.attachment?

  getAttachments: ->
    piece.attachment for piece in @getAttachmentPieces()

  getAttachmentAndPositionById: (attachmentId) ->
    position = 0
    for piece in @pieceList.toArray()
      if piece.attachment?.id is attachmentId
        return { attachment: piece.attachment, position }
      position += piece.length
    attachment: null, position: null

  getAttachmentById: (attachmentId) ->
    {attachment, position} = @getAttachmentAndPositionById(attachmentId)
    attachment

  getRangeOfAttachment: (attachment) ->
    {attachment, position} = @getAttachmentAndPositionById(attachment.id)
    [position, position + 1] if attachment?

  updateAttributesForAttachment: (attributes, attachment) ->
    if range = @getRangeOfAttachment(attachment)
      @addAttributesAtRange(attributes, range)
    else
      this

  getLength: ->
    @pieceList.getEndPosition()

  isEmpty: ->
    @getLength() is 0

  isEqualTo: (text) ->
    super(arguments...) or text?.pieceList?.isEqualTo(@pieceList)

  isBlockBreak: ->
    @getLength() is 1 and @pieceList.getObjectAtIndex(0).isBlockBreak()

  eachPiece: (callback) ->
    @pieceList.eachObject(callback)

  getPieces: ->
    @pieceList.toArray()

  getPieceAtPosition: (position) ->
    @pieceList.getObjectAtPosition(position)

  contentsForInspection: ->
    pieceList: @pieceList.inspect()

  toSerializableText: ->
    pieceList = @pieceList.selectSplittableList (piece) -> piece.isSerializable()
    @copyWithPieceList(pieceList)

  toString: ->
    @pieceList.toString()

  toJSON: ->
    @pieceList.toJSON()

  toConsole: ->
    JSON.stringify(JSON.parse(piece.toConsole()) for piece in @pieceList.toArray())

  # BIDI

  getDirection: ->
    getDirection(@toString())

  isRTL: ->
    @getDirection() is "rtl"

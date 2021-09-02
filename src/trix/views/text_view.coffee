import ObjectView from "views/object_view"
import PieceView from "views/piece_view"
import ObjectGroup from "core/collections/object_group"

export default class TextView extends ObjectView
  constructor: ->
    super(arguments...)
    @text = @object
    {@textConfig} = @options

  createNodes: ->
    nodes = []
    pieces = ObjectGroup.groupObjects(@getPieces())
    lastIndex = pieces.length - 1

    for piece, index in pieces
      context = {}
      context.isFirst = true if index is 0
      context.isLast = true if index is lastIndex
      context.followsWhitespace = true if endsWithWhitespace(previousPiece)

      view = @findOrCreateCachedChildView(PieceView, piece, {@textConfig, context})
      nodes.push(view.getNodes()...)

      previousPiece = piece
    nodes

  getPieces: ->
    piece for piece in @text.getPieces() when not piece.hasAttribute("blockBreak")

  endsWithWhitespace = (piece) ->
    /\s$/.test(piece?.toString())

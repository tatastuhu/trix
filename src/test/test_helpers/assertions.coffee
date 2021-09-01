import { normalizeRange, rangesAreEqual } from "core/helpers/ranges"
import DocumentView from "views/document_view"

assert = QUnit.assert

assert.locationRange = (start, end) ->
  expectedLocationRange = normalizeRange([start, end])
  actualLocationRange = getEditorController().getLocationRange()
  @deepEqual(actualLocationRange, expectedLocationRange)

assert.selectedRange = (range) ->
  expectedRange = normalizeRange(range)
  actualRange = getEditor().getSelectedRange()
  @deepEqual(actualRange, expectedRange)

assert.textAttributes = (range, attributes) ->
  document = getDocument().getDocumentAtRange(range)
  blocks = document.getBlocks()
  throw "range #{JSON.stringify(range)} spans more than one block" unless blocks.length is 1

  locationRange = getDocument().locationRangeFromRange(range)
  textIndex = locationRange[0].index
  textRange = [locationRange[0].offset, locationRange[1].offset]
  text = getDocument().getTextAtIndex(textIndex).getTextAtRange(textRange)
  pieces = text.getPieces()
  throw "range #{JSON.stringify(range)} must only span one piece" unless pieces.length is 1

  piece = pieces[0]
  @deepEqual piece.getAttributes(), attributes

assert.blockAttributes = (range, attributes) ->
  document = getDocument().getDocumentAtRange(range)
  blocks = document.getBlocks()
  throw "range #{JSON.stringify(range)} spans more than one block" unless blocks.length is 1

  block = blocks[0]
  @deepEqual block.getAttributes(), attributes

assert.documentHTMLEqual = (trixDocument, html) ->
  @equal getHTML(trixDocument), html

getHTML = (trixDocument) ->
  DocumentView.render(trixDocument).innerHTML

export { assert }

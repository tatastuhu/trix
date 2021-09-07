#= require rangy-core
#= require rangy-textrange

helpers = Trix.TestHelpers

keyCodes = {}
for code, name of Trix.config.keyNames
  keyCodes[name] = code

keys =
  left: "ArrowLeft"
  right: "ArrowRight"


export moveCursor = (options, callback) ->
  if typeof options is "string"
    direction = options
  else
    direction = options.direction
    times = options.times

  times ?= 1

  do move = -> helpers.defer ->
    if helpers.triggerEvent(document.activeElement, "keydown", keyCode: keyCodes[direction], key: keys[direction])
      selection = rangy.getSelection()
      selection.move("character", if direction is "right" then 1 else -1)
      Trix.selectionChangeObserver.update()

    if --times is 0
      helpers.defer -> callback(getCursorCoordinates())
    else
      move()

export expandSelection = (options, callback) -> helpers.defer ->
  if typeof options is "string"
    direction = options
  else
    direction = options.direction
    times = options.times

  times ?= 1

  do expand = -> helpers.defer ->
    if helpers.triggerEvent(document.activeElement, "keydown", keyCode: keyCodes[direction], key: keys[direction], shiftKey: true)
      getComposition().expandSelectionInDirection(if direction is "left" then "backward" else "forward")

    if --times is 0
      helpers.defer(callback)
    else
      expand()

export collapseSelection = (direction, callback) ->
  selection = rangy.getSelection()
  if direction is "left"
    selection.collapseToStart()
  else
    selection.collapseToEnd()
  Trix.selectionChangeObserver.update()
  helpers.defer(callback)

export selectAll = (callback) ->
  rangy.getSelection().selectAllChildren(document.activeElement)
  Trix.selectionChangeObserver.update()
  helpers.defer(callback)

export deleteSelection = ->
  selection = rangy.getSelection()
  selection.getRangeAt(0).deleteContents()
  Trix.selectionChangeObserver.update()

export selectionIsCollapsed = ->
  rangy.getSelection().isCollapsed

export insertNode = (node, callback) ->
  selection = rangy.getSelection()
  range = selection.getRangeAt(0)
  range.splitBoundaries()
  range.insertNode(node)
  range.setStartAfter(node)
  range.deleteContents()
  selection.setSingleRange(range)
  Trix.selectionChangeObserver.update()
  requestAnimationFrame(callback) if callback

export selectNode = (node, callback) ->
  selection = rangy.getSelection()
  selection.selectAllChildren(node)
  Trix.selectionChangeObserver.update()
  callback?()

export createDOMRangeFromPoint = (x, y) ->
  if document.caretPositionFromPoint
    {offsetNode, offset} = document.caretPositionFromPoint(x, y)
    domRange = document.createRange()
    domRange.setStart(offsetNode, offset)
    domRange
  else if document.caretRangeFromPoint
    document.caretRangeFromPoint(x, y)

getCursorCoordinates = ->
  if rect = window.getSelection().getRangeAt(0).getClientRects()[0]
    clientX: rect.left
    clientY: rect.top + rect.height / 2

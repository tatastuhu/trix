export getDOMSelection = ->
    selection = window.getSelection()
    selection if selection.rangeCount > 0

export getDOMRange = ->
    if domRange = getDOMSelection()?.getRangeAt(0)
      unless domRangeIsPrivate(domRange)
        domRange

export setDOMRange = (domRange) ->
    selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(domRange)

    if selectionChangeObserver?
      selectionChangeObserver.update()

selectionChangeObserver = null

export setSelectionChangeObserver = (observer) =>
  selectionChangeObserver = observer

# In Firefox, clicking certain <input> elements changes the selection to a
# private element used to draw its UI. Attempting to access properties of those
# elements throws an error.
# https://bugzilla.mozilla.org/show_bug.cgi?id=208427
domRangeIsPrivate = (domRange) ->
  nodeIsPrivate(domRange.startContainer) or nodeIsPrivate(domRange.endContainer)

nodeIsPrivate = (node) ->
  not Object.getPrototypeOf(node)

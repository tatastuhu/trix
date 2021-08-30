import config from "config/index"
import { extend } from "core/helper/extend"
import { ZERO_WIDTH_SPACE } from "index"
import AttachmentView from "views/attachment_view"

html = document.documentElement
match = html.matchesSelector ? html.webkitMatchesSelector ? html.msMatchesSelector ? html.mozMatchesSelector
blockTagNames = undefined

export handleEvent = (eventName, {onElement, matchingSelector, withCallback, inPhase, preventDefault, times} = {}) ->
  element = onElement ? html
  selector = matchingSelector
  callback = withCallback
  useCapture = inPhase is "capturing"

  handler = (event) ->
    handler.destroy() if times? and --times is 0
    target = dom.findClosestElementFromNode(event.target, matchingSelector: selector)
    if target?
      withCallback?.call(target, event, target)
      event.preventDefault() if preventDefault

  handler.destroy = ->
    element.removeEventListener(eventName, handler, useCapture)

  element.addEventListener(eventName, handler, useCapture)
  handler

export handleEventOnce = (eventName, options = {}) ->
  options.times = 1
  handleEvent(eventName, options)

export triggerEvent = (eventName, {onElement, bubbles, cancelable, attributes} = {}) ->
  element = onElement ? html
  bubbles = bubbles isnt false
  cancelable = cancelable isnt false

  event = document.createEvent("Events")
  event.initEvent(eventName, bubbles, cancelable)
  extend.call(event, attributes) if attributes?
  element.dispatchEvent(event)

export elementMatchesSelector = (element, selector) ->
  if element?.nodeType is 1
    match.call(element, selector)

export findClosestElementFromNode = (node, {matchingSelector, untilNode} = {}) ->
  node = node.parentNode until not node? or node.nodeType is Node.ELEMENT_NODE
  return unless node?

  if matchingSelector?
    if node.closest and not untilNode?
      node.closest(matchingSelector)
    else
      while node and node isnt untilNode
        return node if dom.elementMatchesSelector(node, matchingSelector)
        node = node.parentNode
  else
    node

export findInnerElement = (element) ->
  element = element.firstElementChild while element?.firstElementChild
  element

export innerElementIsActive = (element) ->
    document.activeElement isnt element and dom.elementContainsNode(element, document.activeElement)

export elementContainsNode = (element, node) ->
  return unless element and node
  while node
    return true if node is element
    node = node.parentNode

export findNodeFromContainerAndOffset = (container, offset) ->
  return unless container
  if container.nodeType is Node.TEXT_NODE
    container
  else if offset is 0
    container.firstChild ? container
  else
    container.childNodes.item(offset - 1)

export findElementFromContainerAndOffset = (container, offset) ->
  node = dom.findNodeFromContainerAndOffset(container, offset)
  dom.findClosestElementFromNode(node)

export findChildIndexOfNode = (node) ->
  return unless node?.parentNode
  childIndex = 0
  childIndex++ while node = node.previousSibling
  childIndex

export removeNode = (node) ->
  node?.parentNode?.removeChild(node)

export walkTree = (tree, {onlyNodesOfType, usingFilter, expandEntityReferences} = {}) ->
  whatToShow = switch onlyNodesOfType
    when "element" then NodeFilter.SHOW_ELEMENT
    when "text"    then NodeFilter.SHOW_TEXT
    when "comment" then NodeFilter.SHOW_COMMENT
    else NodeFilter.SHOW_ALL

  document.createTreeWalker(tree, whatToShow, usingFilter ? null, expandEntityReferences is true)

export tagName = (element) ->
  element?.tagName?.toLowerCase()

export makeElement = (tagName, options = {}) ->
  if typeof tagName is "object"
    options = tagName
    {tagName} = options
  else
    options = attributes: options

  element = document.createElement(tagName)

  if options.editable?
    options.attributes ?= {}
    options.attributes.contenteditable = options.editable

  if options.attributes
    for key, value of options.attributes
      element.setAttribute(key, value)

  if options.style
    for key, value of options.style
      element.style[key] = value

  if options.data
    for key, value of options.data
      element.dataset[key] = value

  if options.className
    for className in options.className.split(" ")
      element.classList.add(className)

  if options.textContent
    element.textContent = options.textContent

  if options.childNodes
    for childNode in [].concat(options.childNodes)
      element.appendChild(childNode)

  element

export getBlockTagNames = ->
  blockTagNames ?= (tagName for key, {tagName} of config.blockAttributes when tagName)

export nodeIsBlockContainer = (node) ->
  nodeIsBlockStartComment(node?.firstChild)

export nodeProbablyIsBlockContainer = (node) ->
  tagName(node) in dom.getBlockTagNames() and
    tagName(node.firstChild) not in dom.getBlockTagNames()

export nodeIsBlockStart = (node, {strict} = strict: true) ->
  if strict
    dom.nodeIsBlockStartComment(node)
  else
    dom.nodeIsBlockStartComment(node) or
      (not dom.nodeIsBlockStartComment(node.firstChild) and dom.nodeProbablyIsBlockContainer(node))

export nodeIsBlockStartComment = (node) ->
  nodeIsCommentNode(node) and node?.data is "block"

export nodeIsCommentNode = (node) ->
  node?.nodeType is Node.COMMENT_NODE

export nodeIsCursorTarget = (node, {name} = {}) ->
  return unless node
  if dom.nodeIsTextNode(node)
    if node.data is ZERO_WIDTH_SPACE
      if name
        node.parentNode.dataset.trixCursorTarget is name
      else
        true
  else
    dom.nodeIsCursorTarget(node.firstChild)

export nodeIsAttachmentElement = (node) ->
  elementMatchesSelector(node, AttachmentView.attachmentSelector)

export nodeIsEmptyTextNode = (node) ->
  nodeIsTextNode(node) and node?.data is ""

export nodeIsTextNode = (node) ->
  node?.nodeType is Node.TEXT_NODE


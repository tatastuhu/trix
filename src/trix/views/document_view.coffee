import { makeElement } from "core/helpers/dom"
import { defer } from "core/helpers/functions"

import ObjectView from "views/object_view"
import BlockView from "views/block_view"
import ObjectGroup from "core/collections/object_group"
import ElementStore from "core/collections/element_store"

export default class DocumentView extends ObjectView
  @render: (document) ->
    element = makeElement("div")
    view = new this document, {element}
    view.render()
    view.sync()
    element

  constructor: ->
    super
    {@element} = @options
    @elementStore = new ElementStore
    @setDocument(@object)

  setDocument: (document) ->
    unless document.isEqualTo(@document)
      @document = @object = document

  render: ->
    @childViews = []

    @shadowElement = makeElement("div")

    unless @document.isEmpty()
      objects = ObjectGroup.groupObjects(@document.getBlocks(), asTree: true)
      for object in objects
        view = @findOrCreateCachedChildView(BlockView, object)
        @shadowElement.appendChild(node) for node in view.getNodes()

  isSynced: ->
    elementsHaveEqualHTML(@shadowElement, @element)

  sync: ->
    fragment = @createDocumentFragmentForSync()
    @element.removeChild(@element.lastChild) while @element.lastChild
    @element.appendChild(fragment)
    @didSync()

  # Private

  didSync: ->
    @elementStore.reset(findStoredElements(@element))
    defer => @garbageCollectCachedViews()

  createDocumentFragmentForSync: ->
    fragment = document.createDocumentFragment()

    for node in @shadowElement.childNodes
      fragment.appendChild(node.cloneNode(true))

    for element in findStoredElements(fragment)
      if storedElement = @elementStore.remove(element)
        element.parentNode.replaceChild(storedElement, element)

    fragment

  findStoredElements = (element) ->
    element.querySelectorAll("[data-trix-store-key]")

  elementsHaveEqualHTML = (element, otherElement) ->
    ignoreSpaces(element.innerHTML) is ignoreSpaces(otherElement.innerHTML)

  ignoreSpaces = (html) ->
    html.replace(/&nbsp;/g, " ")

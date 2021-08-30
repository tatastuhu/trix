import { removeNode } from "core/helpers/dom"
import Document from "models/document"
import DocumentView from "views/document_view"

unserializableElementSelector = "[data-trix-serialize=false]"
unserializableAttributeNames = ["contenteditable", "data-trix-id", "data-trix-store-key", "data-trix-mutable", "data-trix-placeholder", "tabindex"]
serializedAttributesAttribute = "data-trix-serialized-attributes"
serializedAttributesSelector = "[#{serializedAttributesAttribute}]"

blockCommentPattern = new RegExp("<!--block-->", "g")

serialization =
  serializers:
    "application/json": (serializable) ->
      if serializable instanceof Document
        document = serializable
      else if serializable instanceof HTMLElement
        document = Document.fromHTML(serializable.innerHTML)
      else
        throw new Error "unserializable object"

      document.toSerializableDocument().toJSONString()

    "text/html": (serializable) ->
      if serializable instanceof Document
        element = DocumentView.render(serializable)
      else if serializable instanceof HTMLElement
        element = serializable.cloneNode(true)
      else
        throw new Error "unserializable object"

      # Remove unserializable elements
      for el in element.querySelectorAll(unserializableElementSelector)
        removeNode(el)

      # Remove unserializable attributes
      for attribute in unserializableAttributeNames
        for el in element.querySelectorAll("[#{attribute}]")
          el.removeAttribute(attribute)

      # Rewrite elements with serialized attribute overrides
      for el in element.querySelectorAll(serializedAttributesSelector) then try
        attributes = JSON.parse(el.getAttribute(serializedAttributesAttribute))
        el.removeAttribute(serializedAttributesAttribute)
        for name, value of attributes
          el.setAttribute(name, value)

      element.innerHTML.replace(blockCommentPattern, "")

  deserializers:
    "application/json": (string) ->
      Document.fromJSONString(string)

    "text/html": (string) ->
      Document.fromHTML(string)

  serializeToContentType: (serializable, contentType) ->
    if serializer = serialization.serializers[contentType]
      serializer(serializable)
    else
      throw new Error "unknown content type: #{contentType}"

  deserializeFromContentType: (string, contentType) ->
    if deserializer = serialization.deserializers[contentType]
      deserializer(string)
    else
      throw new Error "unknown content type: #{contentType}"

export default serialization

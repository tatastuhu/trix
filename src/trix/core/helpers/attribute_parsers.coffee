import { findClosestElementFromNode } from "core/helpers/dom"
import { attachmentSelector } from "config/attachments"
import textAttributes from "config/text_attributes"

export default attributeParsers =
  bold: (element) ->
    style = window.getComputedStyle(element)
    style["fontWeight"] is "bold" or style["fontWeight"] >= 600
  italic: (element) ->
    style = window.getComputedStyle(element)
    style["fontStyle"] is "italic"
  href:(element) ->
    matchingSelector = "a:not(#{attachmentSelector})"
    if link = findClosestElementFromNode(element, {matchingSelector})
      link.getAttribute("href")

for attribute, parser of attributeParsers
  textAttributes[attribute].parser = parser


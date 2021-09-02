import { findClosestElementFromNode } from "core/helpers/dom"
import { attachmentSelector } from "config/attachments"

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

import config from "config"

import { version } from "../../package.json"

export VERSION = version
export ZERO_WIDTH_SPACE = "\uFEFF"
export NON_BREAKING_SPACE = "\u00A0"
export OBJECT_REPLACEMENT_CHARACTER = "\uFFFC"

export browser =
  # Android emits composition events when moving the cursor through existing text
  # Introduced in Chrome 65: https://bugs.chromium.org/p/chromium/issues/detail?id=764439#c9
  composesExistingText: /Android.*Chrome/.test(navigator.userAgent)
  # IE 11 activates resizing handles on editable elements that have "layout"
  forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent)
  # https://www.w3.org/TR/input-events-1/ + https://www.w3.org/TR/input-events-2/
  supportsInputEvents: do ->
    return false if typeof InputEvent is "undefined"
    for property in ["data", "getTargetRanges", "inputType"]
      return false unless property of InputEvent.prototype
    true

export { config }

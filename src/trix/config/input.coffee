import { browser } from "trix"
import { browser } from "trix"

input =
  level2Enabled: true

  getLevel: ->
    if @level2Enabled and browser.supportsInputEvents
      2
    else
      0

export default input

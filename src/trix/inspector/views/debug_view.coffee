import { handleEvent } from "../../core/helpers/dom.coffee"

import Inspector from "./index.coffee"
import View "../view.coffee"
import ControlElement "../control_element.coffee"

export default class DebugView extends View
  title: "Debug"
  template: "debug"

  constructor: ->
    super
    handleEvent "change", onElement: @element, matchingSelector: "input[name=viewCaching]", withCallback: @didToggleViewCaching
    handleEvent "click", onElement: @element, matchingSelector: "button[data-action=render]", withCallback: @didClickRenderButton
    handleEvent "click", onElement: @element, matchingSelector: "button[data-action=parse]", withCallback: @didClickParseButton
    handleEvent "change", onElement: @element, matchingSelector: "input[name=controlElement]", withCallback: @didToggleControlElement

  didToggleViewCaching: ({target}) =>
    if target.checked
      @compositionController.enableViewCaching()
    else
      @compositionController.disableViewCaching()

  didClickRenderButton: =>
    @editorController.render()

  didClickParseButton: =>
    @editorController.reparse()

  didToggleControlElement: ({target}) =>
    if target.checked
      @control = new ControlElement @editorElement
    else
      @control?.uninstall()
      @control = null

Inspector.registerView DebugView

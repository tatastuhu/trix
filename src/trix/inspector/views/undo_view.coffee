import Inspector from "../index.coffee"
import View "../view.coffee"

export default class UndoView extends View
  title: "Undo"
  template: "undo"
  events:
    "trix-change": ->
      @render()

  render: ->
    {@undoEntries, @redoEntries} = @editor.undoManager
    super



Inspector.registerView

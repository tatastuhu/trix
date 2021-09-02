import Inspector from "inspector/index"
import View "inspector/view"

export default class UndoView extends View
  title: "Undo"
  template: "undo"
  events:
    "trix-change": ->
      @render()

  render: ->
    {@undoEntries, @redoEntries} = @editor.undoManager
    super(arguments...)



Inspector.registerView

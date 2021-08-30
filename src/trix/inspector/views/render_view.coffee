import Inspector from "../index.coffee"
import View "../view.coffee"

export default RenderView class extends View
  title: "Renders"
  template: "render"
  events:
    "trix-render": ->
      @renderCount++
      @render()

    "trix-sync": ->
      @syncCount++
      @render()

  constructor: ->
    @renderCount = 0
    @syncCount = 0
    super

  getTitle: ->
    "#{@title} (#{@renderCount})"

Inspector.registerView RenderView

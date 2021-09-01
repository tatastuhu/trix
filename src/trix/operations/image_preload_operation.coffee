import Operation from "core/utilities/operation"

export default class ImagePreloadOperation extends Operation
  constructor: (url) ->
    super()
    @url = url


  perform: (callback) ->
    image = new Image

    image.onload = =>
      image.width = @width = image.naturalWidth
      image.height = @height = image.naturalHeight
      callback(true, image)

    image.onerror = ->
      callback(false)

    image.src = @url

import "./operation.coffee"

export default class FileVerificationOperation extends Operation
  constructor: (@file) ->

  perform: (callback) ->
    reader = new FileReader

    reader.onerror = ->
      callback(false)

    reader.onload = =>
      reader.onerror = null
      try reader.abort()
      callback(true, @file)

    reader.readAsArrayBuffer(@file)

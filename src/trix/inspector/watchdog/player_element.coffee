import { registerElement } from "core/helpers/custom_elements"

import Recording from "inspector/recording"
import PlayerController from "inspector/player_controller"

registerElement "trix-watchdog-player",
  defaultCSS: """
    %t > div { display: -webkit-flex; display: flex; font-size: 14px; margin: 10px 0 }
    %t > div > button { width: 65px }
    %t > div > input { width: 100%; -webkit-align-self: stretch; align-self: stretch; margin: 0 20px }
    %t > div > span { display: inline-block; text-align: center; width: 110px }
  """

  attachedCallback: ->
    if url = @getAttribute("src")
      @fetchRecordingAtURL(url)

  attributeChangedCallback: (attributeName, oldValue, newValue) ->
    if attributeName is "src"
      @fetchRecordingAtURL(newValue)

  fetchRecordingAtURL: (url) ->
    @activeRequest?.abort()
    @activeRequest = new XMLHttpRequest
    @activeRequest.open("GET", url)
    @activeRequest.send()
    @activeRequest.onload = =>
      json = @activeRequest.responseText
      @activeRequest = null
      recording = Recording.fromJSON(JSON.parse(json))
      @loadRecording(recording)

  loadRecording: (recording) ->
    @controller = new PlayerController this, recording

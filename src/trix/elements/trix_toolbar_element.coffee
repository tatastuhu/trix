import config from "config"
import { registerElement } from "core/helpers/custom_elements"

registerElement "trix-toolbar",
  defaultCSS: """
    %t {
      display: block;
    }

    %t {
      white-space: nowrap;
    }

    %t [data-trix-dialog] {
      display: none;
    }

    %t [data-trix-dialog][data-trix-active] {
      display: block;
    }

    %t [data-trix-dialog] [data-trix-validate]:invalid {
      background-color: #ffdddd;
    }
  """

  # Element lifecycle

  initialize: ->
    if @innerHTML is ""
      @innerHTML = config.toolbar.getDefaultHTML()

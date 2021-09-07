import { toolbar } from "config"

export default trixToolbarElement =
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
      @innerHTML = toolbar.getDefaultHTML()

export defer = (fn) ->
  setTimeout fn, 1

export after = (delay, callback) ->
  setTimeout(callback, delay)

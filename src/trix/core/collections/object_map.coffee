import BasicObject from "../basic_object.coffee"

export default class ObjectMap extends BasicObject
  constructor: (objects = []) ->
    @objects = {}
    for object in objects
      hash = JSON.stringify(object)
      @objects[hash] ?= object

  find: (object) ->
    hash = JSON.stringify(object)
    @objects[hash]

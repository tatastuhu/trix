import BasicObject from "core/basic_object"
import UTF16String from "core/utilities/utf16_string"

id = 0

export default class Object extends BasicObject

  @fromJSONString: (jsonString) ->
    @fromJSON JSON.parse(jsonString)

  constructor: ->
    super()
    @id = ++id

  hasSameConstructorAs: (object) ->
    @constructor is object?.constructor

  isEqualTo: (object) ->
    this is object

  inspect: ->
    contents = for key, value of @contentsForInspection() ? {}
      "#{key}=#{value}"

    "#<#{@constructor.name}:#{@id}#{if contents.length then " #{contents.join(", ")}" else ""}>"

  contentsForInspection: ->

  toJSONString: ->
    JSON.stringify(this)

  toUTF16String: ->
    UTF16String.box(this)

  getCacheKey: ->
    @id.toString()

allAttributeNames = null
blockAttributeNames = null
textAttributeNames = null
listAttributeNames = null

export getAllAttributeNames = ->
    allAttributeNames ?= config.getTextAttributeNames().concat config.getBlockAttributeNames()

export getBlockConfig = (attributeName) ->
    Trix.config.blockAttributes[attributeName]

export getBlockAttributeNames = ->
    blockAttributeNames ?= Object.keys(Trix.config.blockAttributes)

export getTextConfig = (attributeName) ->
    Trix.config.textAttributes[attributeName]

export getTextAttributeNames = ->
    textAttributeNames ?= Object.keys(Trix.config.textAttributes)

export getListAttributeNames = ->
    listAttributeNames ?= (listAttribute for key, {listAttribute} of Trix.config.blockAttributes when listAttribute?)


import blockAttributes from "config/block_attributes"
import textAttributes from "config/text_attributes"

allAttributeNames = null
blockAttributeNames = null
textAttributeNames = null
listAttributeNames = null

export getAllAttributeNames = ->
  allAttributeNames ?= getTextAttributeNames().concat getBlockAttributeNames()

export getBlockConfig = (attributeName) ->
  blockAttributes[attributeName]

export getBlockAttributeNames = ->
  blockAttributeNames ?= Object.keys(blockAttributes)

export getTextConfig = (attributeName) ->
  textAttributes[attributeName]

export getTextAttributeNames = ->
  textAttributeNames ?= Object.keys(textAttributes)

export getListAttributeNames = ->
  listAttributeNames ?= (listAttribute for key, {listAttribute} of blockAttributes when listAttribute?)


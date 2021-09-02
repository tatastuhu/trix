import { assert, test, testGroup, eachFixture } from "test_helper"
import { serializeToContentType } from "core/helpers/serialization"

testGroup "serializeToContentType", ->
  eachFixture (name, details) ->
    if details.serializedHTML
      test name, ->
        console.log("Serializing", details.document)
        assert.equal serializeToContentType(details.document, "text/html"), details.serializedHTML

import { assert, test, testGroup } from "test_helper"

testGroup "Trix.serializeToContentType", ->
  eachFixture (name, details) ->
    if details.serializedHTML
      test name, ->
        assert.equal Trix.serializeToContentType(details.document, "text/html"), details.serializedHTML

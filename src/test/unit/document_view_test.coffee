import { assert, test, testGroup } from "test_helper"

testGroup "Trix.DocumentView", ->
  eachFixture (name, details) ->
    test name, ->
      assert.documentHTMLEqual details.document, details.html

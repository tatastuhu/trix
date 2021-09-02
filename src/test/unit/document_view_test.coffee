import { assert, test, testGroup, eachFixture } from "test_helper"

testGroup "DocumentView", ->
  eachFixture (name, details) ->
    test name, ->
      assert.documentHTMLEqual details.document, details.html

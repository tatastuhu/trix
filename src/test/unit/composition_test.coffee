import { assert, test, testGroup, TestCompositionDelegate } from "test_helper"
import Composition from "models/composition"

composition = null

setup = ->
  composition = new Composition
  composition.delegate = new TestCompositionDelegate

testGroup "Composition", {setup}, ->
  test "deleteInDirection respects UTF-16 character boundaries", ->
    composition.insertString("abc😭")
    composition.deleteInDirection("backward")
    composition.insertString("d")
    assert.equal composition.document.toString(), "abcd\n"

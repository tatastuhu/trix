import { assert, test, testGroup } from "test_helper"

import Block from "models/block"
import Text from "models/text"

testGroup "Block", ->
  test "consolidating blocks creates text with one blockBreak piece", ->
    blockA = new Block Text.textForStringWithAttributes("a")
    blockB = new Block Text.textForStringWithAttributes("b")
    consolidatedBlock = blockA.consolidateWith(blockB)
    pieces = consolidatedBlock.text.getPieces()

    assert.equal pieces.length, 2, JSON.stringify(pieces)
    assert.deepEqual pieces[0].getAttributes(), {}
    assert.deepEqual pieces[1].getAttributes(), { blockBreak: true }
    assert.equal consolidatedBlock.toString(), "a\nb\n"

  test "consolidating empty blocks creates text with one blockBreak piece", ->
    consolidatedBlock = new Block().consolidateWith(new Block)
    pieces = consolidatedBlock.text.getPieces()

    assert.equal pieces.length, 2, JSON.stringify(pieces)
    assert.deepEqual pieces[0].getAttributes(), {}
    assert.deepEqual pieces[1].getAttributes(), { blockBreak: true }
    assert.equal consolidatedBlock.toString(), "\n\n"

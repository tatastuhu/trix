import { assert, test, testGroup } from "test_helper"

import HTMLParser from "models/html_parser"
import Attachment from "models/attachment"
import Text from "models/text"
import Block from "models/block"

testGroup "Document", ->
  createDocumentWithAttachment = (attachment) ->
    text = Text.textForAttachmentWithAttributes(attachment)
    new Document [new Block text]

  test "documents with different attachments are not equal", ->
    a = createDocumentWithAttachment(new Attachment url: "a")
    b = createDocumentWithAttachment(new Attachment url: "b")
    assert.notOk a.isEqualTo(b)

  test "getStringAtRange does not leak trailing block breaks", ->
    document = Document.fromString("Hey")
    assert.equal document.getStringAtRange([0, 0]), ""
    assert.equal document.getStringAtRange([0, 1]), "H"
    assert.equal document.getStringAtRange([0, 2]), "He"
    assert.equal document.getStringAtRange([0, 3]), "Hey"
    assert.equal document.getStringAtRange([0, 4]), "Hey\n"

  test "findRangesForTextAttribute", ->
    document = HTMLParser.documentFromHTML """
      <div>Hello <strong>world, <em>this</em> is</strong> a <strong>test</strong>.<br></div>
    """
    assert.deepEqual document.findRangesForTextAttribute("bold"),   [[6, 20], [23, 27]]
    assert.deepEqual document.findRangesForTextAttribute("italic"), [[13, 17]]
    assert.deepEqual document.findRangesForTextAttribute("href"),   []

  test "findRangesForTextAttribute withValue", ->
    document = HTMLParser.documentFromHTML """
      <div>Hello <a href="http://google.com/">world, <em>this</em> is</a> a <a href="http://basecamp.com/">test</a>.<br></div>
    """
    assert.deepEqual document.findRangesForTextAttribute("href"),                                    [[6, 20], [23, 27]]
    assert.deepEqual document.findRangesForTextAttribute("href", withValue: "http://google.com/"),   [[6, 20]]
    assert.deepEqual document.findRangesForTextAttribute("href", withValue: "http://basecamp.com/"), [[23, 27]]
    assert.deepEqual document.findRangesForTextAttribute("href", withValue: "http://amazon.com/"),   []

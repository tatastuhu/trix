import { assert, insertImageAttachment, test, testGroup } from "test_helper"
import { getEditorElement } from "core/helpers/global"

import attachmentsConfig from "config/attachments"
import lang from "config/lang"

testGroup "Attachment captions", template: "editor_empty", ->
  test "default caption includes file name and size", ->
    insertImageAttachment()
    element = getCaptionElement()
    assert.notOk element.hasAttribute("data-trix-placeholder")
    assert.equal element.textContent, "image.gif 35 Bytes"

  test "caption excludes file name when configured", ->
    withPreviewCaptionConfig name: false, size: true, ->
      insertImageAttachment()
      element = getCaptionElement()
      assert.notOk element.hasAttribute("data-trix-placeholder")
      assert.equal element.textContent, "35 Bytes"

  test "caption excludes file size when configured", ->
    withPreviewCaptionConfig name: true, size: false, ->
      insertImageAttachment()
      element = getCaptionElement()
      assert.notOk element.hasAttribute("data-trix-placeholder")
      assert.equal element.textContent, "image.gif"

  test "caption is empty when configured", ->
    withPreviewCaptionConfig name: false, size: false, ->
      insertImageAttachment()
      element = getCaptionElement()
      assert.ok element.hasAttribute("data-trix-placeholder")
      assert.equal element.getAttribute("data-trix-placeholder"), lang.captionPlaceholder
      assert.equal element.textContent, ""

withPreviewCaptionConfig = (config = {}, fn) ->
  {caption} = attachmentsConfig.preview
  attachmentsConfig.preview.caption = config
  try
    fn()
  finally
    attachmentsConfig.preview.caption = caption

getCaptionElement = ->
  getEditorElement().querySelector("figcaption")

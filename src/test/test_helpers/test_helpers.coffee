import { removeNode } from "core/helpers/dom"
import { templates } from "./template_helpers"
import { TEST_IMAGE_URL } from "./fixtures/fixtures"

setFixtureHTML = (html, container = "form") ->
  element = document.getElementById("trix-container")
  removeNode(element) if element?

  element = document.createElement(container)
  element.id = "trix-container"
  element.innerHTML = html

  document.body.insertAdjacentElement("afterbegin", element)

ready = null


export testGroup = (name, options, callback) ->
  if callback?
    {container,template, setup, teardown} = options
  else
    callback = options

  beforeEach = ->
    # Ensure window is active on CI so focus and blur events are natively dispatched
    window.focus()

    ready = (callback) ->
      if template?
        addEventListener "trix-initialize", handler = ({target}) ->
          removeEventListener("trix-initialize", handler)
          if target.hasAttribute("autofocus")
            target.editor.setSelectedRange(0)
          callback(target)

        setFixtureHTML(templates[template]({ TEST_IMAGE_URL }), container)
      else
        callback()
    setup?()

  afterEach = ->
    if template?
      setFixtureHTML("")
    teardown?()

  if callback?
    QUnit.module name, (hooks) ->
      hooks.beforeEach(beforeEach)
      hooks.afterEach(afterEach)
      callback()
  else
    QUnit.module(name, {beforeEach, afterEach})

export test = (name, callback) ->
  QUnit.test name, (assert) ->
    doneAsync = assert.async()

    ready (element) ->
      done = (expectedDocumentValue) ->
        if element?
          if expectedDocumentValue
            assert.equal element.editor.getDocument().toString(), expectedDocumentValue
          requestAnimationFrame(doneAsync)
        else
          doneAsync()

      if callback.length is 0
        callback()
        done()
      else
        callback(done)

export testIf = (condition, args...) ->
  if condition
    test(args...)
  else
    skip(args...)

 export skip = QUnit.skip

import * as config from "config"
import { version } from "../../package.json"

import { registerElement } from "core/helpers/custom_elements"

import trixEditorElement from "elements/trix_editor_element"
import trixToolbarElement from "elements/trix_toolbar_element"

registerElement "trix-editor", trixEditorElement
registerElement "trix-toolbar", trixToolbarElement

export { config, version }

import * as config from "config"

import { version } from "../../package.json"

export VERSION = version
export ZERO_WIDTH_SPACE = "\uFEFF"
export NON_BREAKING_SPACE = "\u00A0"
export OBJECT_REPLACEMENT_CHARACTER = "\uFFFC"

export { config }

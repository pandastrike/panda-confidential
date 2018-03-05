import {isKind} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"
import {encode} from "../utils"

class Key
  constructor: (@key) ->
  encode: (encoding="base64")-> encode encoding, @key

isKey = isKind Key

export {Key, isKey}

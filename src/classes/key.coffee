import {encode} from "../utils"
import {isKind} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

class Key
  constructor: (@key) ->
  dump: -> encode "base64", @key

isKey = isKind Key

export {Key, isKey}

import {decodeKey, encode} from "../utils"
import {isKind} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

class Key
  constructor: (@key) ->
  @toString: encode "base64", @key

key = (input, encoding) ->
  if encoding
    new Key decodeKey input, encoding
  else
    new Key decodeKey input

isKey = isKind Key

export {key, isKey, Key}

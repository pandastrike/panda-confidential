import {isKind} from "panda-parchment"
import {Method} from "panda-generics"
import {encode} from "../utils"

class Key
  constructor: (@key) ->
  encode: (encoding="base64")-> encode encoding, @key

isKey = isKind Key

export {Key, isKey}

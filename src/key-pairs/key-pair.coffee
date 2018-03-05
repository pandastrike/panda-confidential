import {isKind} from "fairmont-helpers"
import {encode} from "../utils"

class KeyPair
  constructor: ({@privateKey, @publicKey}) ->
  encode: ->
    encode
      privateKey: @privateKey.encode()
      publicKey: @publicKey.encode()

isKeyPair = isKind KeyPair

export {KeyPair, isKeyPair}

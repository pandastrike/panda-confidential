import {isKind, toJSON} from "panda-parchment"
import {convert, areType} from "../utils"
import PublicKey from "../keys/public"
import PrivateKey from "../keys/private"

class KeyPair
  constructor: ({@publicKey, @privateKey}) ->

  to: (hint) ->
    output = toJSON
      privateKey: @privateKey.to "base64"
      publicKey: @publicKey.to "base64"

    if hint == "utf8"
      output
    else
      convert from: "utf8", to: hint, output

  @isKind: isKind @
  @areType: areType @isType

export default KeyPair

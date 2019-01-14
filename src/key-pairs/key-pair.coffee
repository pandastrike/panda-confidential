import {isKind} from "panda-parchment"
import {convert} from "../utils"
import PublicKey from "../keys/public"
import PrivateKey from "../keys/private"

toBase64 = (bytes) -> convert from: "bytes", to: "base64", bytes

class KeyPair
  constructor: ({publicKey, privateKey}) ->
    @publicKey = new PublicKey publicKey
    @privateKey = new PrivateKey privateKey

  to: (hint) ->
    output = JSON.stringify
      privateKey: toBase64 @privateKey
      publicKey: toBase64 @publicKey

    if hint == "utf8"
      output
    else
      convert from: "utf8", to: hint, output

  @isKind: isKind @

export default KeyPair

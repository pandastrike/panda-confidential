import nacl from "tweetnacl"
import {isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isSignedMessage, signedMessage} from "./signed-message"
import {isData} from "./utils"

# Define a multimethod.
verify = Method.create()

# Verify the signature(s) on a message.
Method.define verify, isSignedMessage,
  ({message, encoding, publicKeys, signatures}) ->
    if publicKeys.length != signatures.length
      return false
    for i in [0...publicKeys.length]
      if !nacl.sign.detached.verify message, signatures[i], publicKeys[i]
        return false
    return true

Method.define verify, isString,
  (message) -> verify signedMessage message
Method.define verify, isData,
  (message) -> verify signedMessage message

export default verify

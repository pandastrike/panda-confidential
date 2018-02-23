import nacl from "tweetnacl"
import {Method} from "fairmont-helpers"

import {isSignedMessage} from "./utils"
import {verify} from "./engine"

Verify = ->
  # Define a multimethod.
  verifyMultimethod = Method.create()

  # Verify the signature(s) on a message and return the message.
  Method.define isSignedMessage, (signedMessage) -> verify signedMessage

  # Return the multimethod.
  verifyMultimethod


export default Verify

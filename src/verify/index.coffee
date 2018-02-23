import nacl from "tweetnacl"
import {Method} from "fairmont-helpers"

import {isSignedMessage} from "./utils"
import {verify} from "./engine"

VERIFY = ->
  # Define a multimethod.
  Verify = Method.create()

  # Verify the signature(s) on a message and return the message.
  Method.define Verify, isSignedMessage,
    (signedMessage) -> verify signedMessage

  # Return the multimethod.
  Verify


export default VERIFY

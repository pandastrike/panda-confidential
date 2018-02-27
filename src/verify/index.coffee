import nacl from "tweetnacl"
import {Method} from "fairmont-multimethods"

import {isSignedMessage} from "../signed-message"
import {verify} from "./engine"

# Define a multimethod.
Verify = Method.create()

# Verify the signature(s) on a message and return the message.
Method.define Verify, isSignedMessage,
  (signedMessage) -> verify signedMessage

export default Verify

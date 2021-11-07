import { assign } from "@dashkite/joy/object"
import Ciphertext from "./ciphertext"
import Declaration from "./declaration"
import Envelope from "./envelope"
import Hash from "./hash"
import Message from "./message"
import Nonce from "./nonce"
import Signature from "./signature"

containers = (confidential) ->
  assign confidential, {Ciphertext, Hash, Message, Nonce, Signature}
  assign confidential, Declaration: Declaration confidential
  assign confidential, Envelope: Envelope confidential

export default containers

import {include} from "panda-parchment"
import Ciphertext from "./ciphertext"
import Declaration from "./declaration"
import Envelope from "./envelope"
import Hash from "./hash"
import Message from "./message"
import Nonce from "./nonce"
import SharedKeySet from "./shared-key-set"
import Signature from "./signature"

containers = (confidential) ->
  include confidential, {Ciphertext, Hash, Message, Nonce, Signature}
  include confidential, Declaration: Declaration confidential
  include confidential, Envelope: Envelope confidential
  include confidential, SharedKeySet: SharedKeySet confidential

export default containers

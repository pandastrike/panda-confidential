import {include} from "panda-parchment"
import Declaration from "./declaration"
import Envelope from "./envelope"
import Plaintext from "./plaintext"
import Hash from "./hash"
import Nonce from "./nonce"

containers = (confidential) ->
  include confidential, {Declaration, Envelope, Plaintext, Hash, Nonce}

export default containers

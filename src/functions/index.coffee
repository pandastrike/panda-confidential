import {include} from "panda-parchment"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"

functions = (confidential) ->
  include confidential, encrypt: encrypt confidential
  include confidential, decrypt: decrypt confidential
  include confidential, sign: sign confidential
  include confidential, verify: verify confidential
  include confidential, hash: hash confidential

export default functions

import { assign } from "@dashkite/joy/object"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"

functions = (confidential) ->
  assign confidential, encrypt: encrypt confidential
  assign confidential, decrypt: decrypt confidential
  assign confidential, sign: sign confidential
  assign confidential, verify: verify confidential
  assign confidential, hash: hash confidential

export default functions

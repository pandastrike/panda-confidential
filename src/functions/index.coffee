import {include} from "panda-parchment"
import _encrypt from "./encrypt"
import _decrypt from "./decrypt"
import _sign from "./sign"
import _verify from "./verify"
import _hash from "./hash"

functions = (confidential) ->
  encrypt = _encrypt confidential
  decrypt = _decrypt confidential
  sign = _sign confidential
  verify = _verify confidential
  hash = _hash confidential
  include confidential, {encrypt, decrypt, sign, verify, hash}

export default functions

import nacl from "tweetnacl"
import {convert, isBytes} from "./utils"
import keys from "./keys"
import keyPairs from "./key-pairs"
import containers from "./containers"
import functions from "./functions"

confidential = (randomBytes) ->
  Confidential =
    nacl: nacl
    isBytes: isBytes
    convert: convert
    randomBytes: (length) ->
      Promise.resolve (randomBytes ? nacl.randomBytes) length

  keyPairs Confidential
  keys Confidential
  containers Confidential
  functions Confidential

  Confidential

export {confidential}

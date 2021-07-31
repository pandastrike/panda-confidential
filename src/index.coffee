import nacl from "tweetnacl"
import {
  convert
  isBytes
  supportedEncodings
  isSupportedEncoding
} from "./utils"
import keys from "./keys"
import keyPairs from "./key-pairs"
import containers from "./containers"
import functions from "./functions"

confidential = (randomBytes) ->
  Confidential =
    nacl: nacl
    isBytes: isBytes
    convert: convert
    supportedEncodings: supportedEncodings
    isSupportedEncoding: isSupportedEncoding
    randomBytes: (length) ->
      Promise.resolve (randomBytes ? nacl.randomBytes) length

  try
    keyPairs Confidential
    keys Confidential
    containers Confidential
    functions Confidential
  catch error
    console.error error

  Confidential

export {confidential}

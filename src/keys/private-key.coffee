import {Key} from "./key"
import {decodeKey} from "../utils"
import {isType} from "fairmont-helpers"
import nacl from "tweetnacl"

class PrivateKey extends Key

privateKey = (randomBytes) ->
  (input, encoding) ->
    if input
      if encoding
        new PrivateKey decodeKey input, encoding
      else
        new PrivateKey decodeKey input
    else
      # Assumes the developer wants key compatible with symmetric encryption.
      new PrivateKey await randomBytes nacl.secretbox.keyLength

isPrivateKey = isType PrivateKey

export {privateKey, isPrivateKey}

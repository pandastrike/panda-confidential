import {Key} from "./key"
import {decode} from "../utils"
import {isType} from "fairmont-helpers"
import nacl from "tweetnacl"

class PrivateKey extends Key

privateKey = (randomBytes) ->
  (input, encoding="base64") ->
    if input
      new PrivateKey decode encoding, input
    else
      # Assumes the developer wants key compatible with symmetric encryption.
      new PrivateKey await randomBytes nacl.secretbox.keyLength

isPrivateKey = isType PrivateKey

export {privateKey, isPrivateKey}

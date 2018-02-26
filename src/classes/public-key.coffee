import {Key} from "./key"
import {decodeKey} from "../utils"
import {isType} from "fairmont-helpers"

class PublicKey extends Key

publicKey = (input, encoding) ->
  if encoding
    new PublicKey decodeKey input, encoding
  else
    new PublicKey decodeKey input

isPublicKey = isType PublicKey

export {publicKey, isPublicKey}

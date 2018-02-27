import {Key} from "./key"
import {decode} from "../utils"
import {isType} from "fairmont-helpers"

class PublicKey extends Key

publicKey = (input, encoding="base64") ->
  new PublicKey decode encoding, input

isPublicKey = isType PublicKey

export {publicKey, isPublicKey}

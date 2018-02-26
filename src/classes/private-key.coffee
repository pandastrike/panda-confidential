import {Key} from "./key"
import {decodeKey} from "../utils"
import {isType} from "fairmont-helpers"

class PrivateKey extends Key

privateKey = (input, encoding) ->
  if encoding
    new PrivateKey decodeKey input, encoding
  else
    new PrivateKey decodeKey input

isPrivateKey = isType PrivateKey

export {privateKey, isPrivateKey}

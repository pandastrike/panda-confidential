import nacl from "tweetnacl"
import {isType, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {Key} from "./key"
import {isData, decode} from "../utils"

class SymmetricKey extends Key

isSymmetricKey = isType SymmetricKey

symmetricKey = (randomBytes) ->
  get = Method.create
    default: -> new SymmetricKey await randomBytes nacl.secretbox.keyLength
  Method.define get, isData,
    (input) -> new SymmetricKey input
  Method.define get, isString,
    (input) -> get decode "base64", input
  Method.define get, isString, isString,
    (input, encoding) -> get decode encoding, input

  get

export {symmetricKey, isSymmetricKey}

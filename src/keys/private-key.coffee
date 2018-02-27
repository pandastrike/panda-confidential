import nacl from "tweetnacl"
import {isType, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {Key} from "./key"
import {isData, decode} from "../utils"

class PrivateKey extends Key

isPrivateKey = isType PrivateKey

privateKey = (randomBytes) ->
  get = Method.create
    default: ->
      # Assumes the developer wants key compatible with symmetric encryption.
      new PrivateKey await randomBytes nacl.secretbox.keyLength

  Method.define get, isData,
    (input) -> new PrivateKey input
  Method.define get, isString,
    (input) -> get decode "base64", input
  Method.define get, isString, isString,
    (input, encoding) -> get decode encoding, input

  get

export {privateKey, isPrivateKey}

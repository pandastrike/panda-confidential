import nacl from "tweetnacl"
import {isType, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {Key} from "./key"
import {isData, decode} from "../utils"

class PrivateKey extends Key

isPrivateKey = isType PrivateKey

get = Method.create()
Method.define get, isData,
  (input) -> new PrivateKey input
Method.define get, isString,
  (input) -> get decode "base64", input
Method.define get, isString, isString,
  (input, encoding) -> get decode encoding, input

export {get as privateKey, isPrivateKey}

import {isType, isString} from "panda-parchment"
import {Method} from "panda-generics"

import {Key} from "./key"
import {isData, decode} from "../utils"

class PublicKey extends Key

isPublicKey = isType PublicKey

get = Method.create()
Method.define get, isData,
  (input) -> new PublicKey input
Method.define get, isString,
  (input) -> get decode "base64", input
Method.define get, isString, isString,
  (input, encoding) -> get decode encoding, input

export {get as publicKey, isPublicKey}

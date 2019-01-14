import nacl from "tweetnacl"
import {isString, isObject} from "panda-parchment"
import {Method} from "panda-generics"
import {isData, decode, encode} from "./utils"

# Return the SHA-512 hash of a message.
hash = Method.create()
Method.define hash, isData,
  (message) -> encode "base64", nacl.hash message
Method.define hash, isString, isString,
  (message, encoding) -> hash decode encoding, message
Method.define hash, isString,
  (message) -> hash decode "utf8", message
Method.define hash, isObject,
  (object) -> hash JSON.stringify object

export default hash

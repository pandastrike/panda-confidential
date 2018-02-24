# These utility functions are only for the key classes to avoid circular dependencies with the rest of the Confidential interface.

import {isType, isKind, isString, isBuffer} from "fairmont-helpers"
import Key from "./key"
import PrivateKey from "./private-key"
import PublicKey from "./public-key"

isKey = isKind Key
isPrivateKey = isType PrivateKey
isPublicKey = isType PublicKey

decodeKey = (input) ->
  if isKey input
    Buffer.from input.key, "base64"
  else
    if isString input
      Buffer.from input, "base64"
    else if isBuffer input
      input
    else
      throw new Error "Unable to decode key"

# String encode a piece of data or convert into a Buffer.
encode = (encoding, data) ->
  if encoding == "buffer"
    Buffer.from data  # Just output a buffer
  else
    Buffer.from(data).toString encoding

decodeSignature = (blob, encoding="base64") ->
  if encoding == "buffer"
    JSON.parse blob.toString()
  else
    JSON.parse Buffer.from(blob, encoding).toString()

export {
  isKey
  isPrivateKey
  isPublicKey
  encode
  decodeKey
  decodeSignature
}

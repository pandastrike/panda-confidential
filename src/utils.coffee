import {isString, isBuffer} from "fairmont-helpers"
import {isKey} from "./types"

decodeCiphertext = (blob) ->
  out = JSON.parse Buffer.from(blob, "base64").toString()
  out.ciphertext = Buffer.from out.ciphertext.data if out.ciphertext
  out.nonce = Buffer.from out.nonce.data if out.nonce
  out

decodePlaintext = (msg, encoding) ->
  if encoding == "buffer"
    msg
  else
    Buffer.from msg, encoding

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

decodeSignature = (blob, encoding="base64") ->
  if encoding == "buffer"
    JSON.parse blob.toString()
  else
    JSON.parse Buffer.from(blob, encoding).toString()

# String encode a piece of data or convert into a Buffer.
encode = (encoding, data) ->
  if encoding == "buffer"
    Buffer.from data  # Just output a buffer
  else
    Buffer.from(data).toString encoding

export {
  decodeCiphertext
  decodePlaintext
  decodeKey
  decodeSignature
  encode
}

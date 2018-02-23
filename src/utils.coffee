import {isType} from "fairmont-helpers"
import {KMSKey, PrivateKey, PublicKey, SharedKey} from "./keys"

utils = ->

  decodeCiphertext = (blob) ->
    out = JSON.parse Buffer.from(blob, "base64").toString()
    out.ciphertext = Buffer.from ciphertext.data if out.ciphertext
    out.nonce = Buffer.from nonce.data if out.nonce
    out

  decodeKey = (key) ->
    if typeof key == "string"
      Buffer.from key, "base64"
    else
      key

  decodePlaintext = (msg, encoding) ->
    if encoding == "buffer"
      msg
    else
      Buffer.from msg, encoding

  # Encode an IntArray from TweetNaCl or convert into a Buffer.
  encodeIntArray = (encoding) ->
    (a) ->
      if encoding == "buffer"
        Buffer.from a
      else
        Buffer.from(a).toString encoding

  isKMSKey = (key) -> isType KMSKey
  isPrivateKey = (key) -> isType PrivateKey
  isPublicKey = (key) -> isType PublicKey
  isSharedKey = (key) -> isType SharedKey


export {
  decodeCiphertext
  decodeKey
  decodePlaintext
  encodeIntArray
  isKMSKey
  isPrivateKey
  isPublicKey
  isSharedKey
}

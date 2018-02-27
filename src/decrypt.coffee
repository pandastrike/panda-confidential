import nacl from "tweetnacl"
import {isString, isObject} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {decode, encode, isData} from "./utils"
import {isPrivateKey, isSharedKey} from "./keys"

# Define a multimethod for export.
decrypt = Method.create()

# Symmetric Decryption
Method.define decrypt, isPrivateKey, isData, isString,
  ({key}, blob, encoding) ->
    {ciphertext, nonce} = JSON.parse encode "utf8", blob
    ciphertext = decode "base64", ciphertext
    nonce = decode "base64", nonce
    encode encoding, nacl.secretbox.open ciphertext, nonce, key
Method.define decrypt, isPrivateKey, isData,
  (key, blob) -> decrypt key, blob, "utf8"
Method.define decrypt, isPrivateKey, isString, isString,
  (key, blob, encoding) -> decrypt key, decode("base64", blob), encoding
Method.define decrypt, isPrivateKey, isString,
  (key, blob) -> decrypt key, decode("base64", blob), "utf8"

# Asymmetric Decryption via shared key.
Method.define decrypt, isSharedKey, isData, isString,
  ({key}, blob, encoding) ->
    {ciphertext, nonce} = JSON.parse encode "utf8", blob
    ciphertext = decode "base64", ciphertext
    nonce = decode "base64", nonce
    encode encoding, nacl.box.open.after ciphertext, nonce, key
Method.define decrypt, isSharedKey, isData,
  (key, blob) -> decrypt key, blob, "utf8"
Method.define decrypt, isSharedKey, isString, isString,
  (key, blob, encoding) -> decrypt key, decode("base64", blob), encoding
Method.define decrypt, isSharedKey, isString,
  (key, blob) -> decrypt key, decode("base64", blob), "utf8"

export default decrypt

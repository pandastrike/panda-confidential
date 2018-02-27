import {isString, isObject} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {decode, encode, isData} from "../utils"
import {isPrivateKey, isSharedKey} from "../keys"

# Helper to convert ciphertext blob into a useful form.
parseBlob = (blob) ->
  blob = JSON.parse encode "utf8", blob
  ciphertext = decode "base64", blob.ciphertext
  nonce = decode "base64", blob.nonce
  {ciphertext, nonce}

# Define a multimethod for export.
decrypt = Method.create()

# Symmetric Decryption
symmetric = (key, {ciphertext, nonce}, encoding) ->
  encode encoding, nacl.secretbox.open ciphertext, nonce, key

Method.define decrypt, isPrivateKey, isData, isString,
  ({key}, blob, encoding) ->
    {ciphertext, nonce} = parseBlob blob
    symmetric key, ciphertext, nonce, encoding
Method.define decrypt, isPrivateKey, isData,
  ({key}, blob) ->
    {ciphertext, nonce} = parseBlob blob
    symmetric key, ciphertext, nonce, "utf8"
Method.define decrypt, isPrivateKey, isString, isString,
  ({key}, blob, encoding) ->
    blob = decode "base64", blob
    {ciphertext, nonce} = parseBlob blob
    symmetric key, ciphertext, nonce, encoding
Method.define decrypt, isPrivateKey, isString,
  ({key}, blob) ->
    blob = decode "base64", blob
    {ciphertext, nonce} = parseBlob blob
    symmetric key, ciphertext, nonce, "utf8"


# Asymmetric Decryption via shared key.
asymmetric = (key, ciphertext, nonce, encoding) ->
  encode encoding, nacl.box.open.after ciphertext, nonce, key

Method.define decrypt, isPrivateKey, isData, isString,
  ({key}, blob, encoding) ->
    {ciphertext, nonce} = parseBlob blob
    asymmetric key, ciphertext, nonce, encoding
Method.define decrypt, isPrivateKey, isData,
  ({key}, blob) ->
    {ciphertext, nonce} = parseBlob blob
    asymmetric key, ciphertext, nonce, "utf8"
Method.define decrypt, isPrivateKey, isString, isString,
  ({key}, blob, encoding) ->
    blob = decode "base64", blob
    {ciphertext, nonce} = parseBlob blob
    asymmetric key, ciphertext, nonce, encoding
Method.define decrypt, isPrivateKey, isString,
  ({key}, blob) ->
    blob = decode "base64", blob
    {ciphertext, nonce} = parseBlob blob
    asymmetric key, ciphertext, nonce, "utf8"

export default decrypt

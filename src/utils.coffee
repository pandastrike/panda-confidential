import nacl from "tweetnacl-util"
import {isType, isKind, isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

{decodeBase64, decodeUTF8, encodeBase64, encodeUTF8} = nacl

encode = (encoding, array) ->
  switch encoding
    when "utf8"
      encodeUTF8 array
    when "base64"
      encodeBase64 array
    when "buffer"
      array # no op case
    else
      throw new Error "The format #{encoding} is not supported."

decode = (encoding, string) ->
  switch encoding
    when "utf8"
      decodeUTF8 string
    when "base64"
      decodeBase64 string
    when "buffer"
      string # was never a string, no op case
    else
      throw new Error "The format #{encoding} is not supported."

# Generate a stringified JSON object in base64 encoding.
encodeBlob = (object) -> encode "base64", decode "utf8", JSON.stringify object

# Parse a stringified JSON object in base64 encoding.
parseBlob = (blob) -> JSON.parse encode "utf8", decode "base64", blob

# These handle ciphertexts from both symmetric and asymmetric schemes
encodeCiphertext = ({ciphertext, nonce, lockedKey}) ->
  ciphertext = encode "base64", ciphertext
  nonce = encode "base64", nonce
  if lockedKey
    encodeBlob {ciphertext, nonce, lockedKey}
  else
    encodeBlob {ciphertext, nonce}

decodeCiphertext = (blob) ->
  {ciphertext, nonce, lockedKey} = parseBlob blob
  ciphertext = decode "base64", ciphertext if ciphertext
  nonce = decode "base64", nonce if nonce
  {ciphertext, nonce, lockedKey}

encodeSignature = ({message, encoding, publicKeys, signatures}) ->
  message = encode "base64", message
  publicKeys = (encode "base64", key for key in publicKeys)
  signatures = (encode "base64", sig for sig in signatures)
  encodeBlob {message, encoding, publicKeys, signatures}

decodeSignature = (blob) ->
  {message, publicKeys, encoding, signatures} = parseBlob blob
  message = decode "base64", message
  publicKeys = (decode "base64", key for key in publicKeys)
  signatures = (decode "base64", sig for sig in signatures)
  {message, publicKeys, encoding, signatures}

isUint8Array = isType Uint8Array

decodeKey = Method.create()
Method.define decodeKey, isBuffer, (key) -> key
Method.define decodeKey, isUint8Array, (key) -> key
Method.define decodeKey, isString, isString,
  (key, encoding) -> decode encoding, key
Method.define decodeKey, isString, (key) -> decode "base64", key

export {
  encode
  decode
  encodeBlob
  parseBlob
  encodeCiphertext
  decodeCiphertext
  encodeSignature
  decodeSignature
  decodeKey
  isUint8Array
}

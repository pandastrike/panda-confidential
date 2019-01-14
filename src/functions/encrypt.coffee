import nacl from "tweetnacl"
import {isString} from "panda-parchment"
import {Method} from "panda-generics"

import {decode, encode, isData} from "./utils"
import {isSymmetricKey, isSharedKey} from "./keys"

Encrypt = (randomBytes) ->
  # Define a multimethod to export.
  encrypt = Method.create()

  # Symmetric Encryption
  Method.define encrypt, isSymmetricKey, isData,
    ({key}, plaintext) ->
      nonce = await randomBytes nacl.secretbox.nonceLength
      ciphertext = nacl.secretbox plaintext, nonce, key
      encode
        ciphertext: encode "base64", ciphertext
        nonce: encode "base64", nonce

  Method.define encrypt, isSymmetricKey, isString, isString,
    (key, plaintext, encoding) -> encrypt key, decode(encoding, plaintext)
  Method.define encrypt, isSymmetricKey, isString,
    (key, plaintext) -> encrypt key, decode("utf8", plaintext)

  # Asymmetric Encryption via shared key.
  Method.define encrypt, isSharedKey, isData,
    ({key}, plaintext) ->
      nonce = await randomBytes nacl.box.nonceLength
      ciphertext = nacl.box.after plaintext, nonce, key
      encode
        ciphertext: encode "base64", ciphertext
        nonce: encode "base64", nonce

  Method.define encrypt, isSharedKey, isString, isString,
    (key, plaintext, encoding) -> encrypt key, decode(encoding, plaintext)
  Method.define encrypt, isSharedKey, isString,
    (key, plaintext) -> encrypt key, decode("utf8", plaintext)

  # Return the multimethod.
  encrypt

export default Encrypt

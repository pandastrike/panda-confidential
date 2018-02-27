import nacl from "tweetnacl"
import {isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {decode, encode, isData} from "../utils"
import {isPrivateKey, isSharedKey} from "../keys"

Encrypt = (randomBytes) ->
  # Define a multimethod to export.
  encrypt = Method.create()

  # Symmetric Encryption
  symmetric = (key, message) ->
    nonce = await randomBytes nacl.secretbox.nonceLength
    ciphertext = nacl.secretbox message, nonce, key
    encode {ciphertext, nonce}

  Method.define encrypt, isPrivateKey, isData,
    ({key}, plaintext) -> symmetric key, plaintext
  Method.define encrypt, isPrivateKey, isString, isString,
    ({key}, plaintext, encoding) -> symmetric key, decode(encoding, plaintext)
  Method.define encrypt, isPrivateKey, isString,
    ({key}, plaintext) -> symmetric key, decode("utf8", plaintext)


  # Asymmetric Encryption via shared key.
  asymmetric = (key, message) ->
    nonce = await randomBytes nacl.box.nonceLength
    ciphertext = nacl.box.after message, nonce, key
    encode {ciphertext, nonce}

  Method.define encrypt, isPrivateKey, isData,
    ({key}, plaintext) -> asymmetric key, plaintext
  Method.define encrypt, isPrivateKey, isString, isString,
    ({key}, plaintext, encoding) -> asymmetric key, decode(encoding, plaintext)
  Method.define encrypt, isPrivateKey, isString,
    ({key}, plaintext) -> asymmetric key, decode("utf8", plaintext)

  # Return the multimethod.
  encrypt

export default Encrypt

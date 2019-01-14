import nacl from "tweetnacl"
import {isPrototype} from "panda-parchment"
import {Method} from "panda-generics"

import {decode, encode, isData} from "./utils"
import Envelope from "../containers/envelope"
import Nonce from "../containers/nonce"

isSymmetricKey = isPrototype "SymmetricKey"
isSharedKey = isPrototype "SharedKey"
isPlaintext = isPrototype "Plaintext"
isNonce = Nonce.isType

Encrypt = (randomBytes, SymmetricKey) ->
  # Define a multimethod to export.
  encrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::encrypt no matches on #{args...}"

  # Symmetric Encryption
  Method.define encrypt, isSymmetricKey, isNonce, isPlaintext,
    (key, nonce, plaintext) ->
      ciphertext = nacl.secretbox(
        plaintext.to "bytes",
        nonce.to "bytes",
        key.to "bytes"
      )
      Promise.resolve new Envelope {ciphertext, nonce}


  Method.define encrypt, isSymmetricKey, isPlaintext,
    (key, plaintext) ->
      nonce = new Nonce await randomBytes nacl.secretbox.nonceLength
      encrypt key, nonce, plaintext

  # Asymmetric Encryption via shared key.
  Method.define encrypt, isSharedKey, isNonce, isPlaintext,
    (key, nonce, plaintext) ->
      ciphertext = nacl.box.after(
        plaintext.to "bytes",
        nonce.to "bytes",
        key.to "bytes"
      }
      Promise.resolve new Envelope {ciphertext, nonce}

  Method.define encrypt, isSharedKey, isPlaintext, (key, plaintext) ->
    nonce = new Nonce await randomBytes nacl.box.nonceLength
    encrypt key, nonce, plaintext

  # Return the multimethod.
  encrypt

export default Encrypt

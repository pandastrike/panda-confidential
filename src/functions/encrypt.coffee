import nacl from "tweetnacl"
import {isPrototype} from "panda-parchment"
import {Method} from "panda-generics"
import {convert} from "../utils"

Encrypt = ({randomBytes, SymmetricKey, SharedKey,
            Plaintext, Nonce, Envelope}) ->
  # Define a multimethod to export.
  encrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::encrypt no matches on #{JSON.stringify args}"

  # Symmetric Encryption
  Method.define encrypt, SymmetricKey.isType, Nonce.isType, Plaintext.isType,
    (key, nonce, plaintext) ->
      ciphertext = nacl.secretbox(
        plaintext.to "bytes"
        nonce.to "bytes"
        key.to "bytes"
      )
      ciphertext = convert from: "bytes", to: "base64", ciphertext
      nonce = nonce.to "base64"
      Promise.resolve Envelope.from "utf8", JSON.stringify {ciphertext, nonce}


  Method.define encrypt, SymmetricKey.isType, Plaintext.isType,
    (key, plaintext) ->
      nonce = Nonce.from "bytes", await randomBytes nacl.secretbox.nonceLength
      encrypt key, nonce, plaintext

  # Asymmetric Encryption via shared key.
  Method.define encrypt, SharedKey.isType, Nonce.isType, Plaintext.isType,
    (key, nonce, plaintext) ->
      ciphertext = nacl.box.after(
        plaintext.to "bytes"
        nonce.to "bytes"
        key.to "bytes"
      )
      ciphertext = convert from: "bytes", to: "base64", ciphertext
      nonce = nonce.to "base64"
      Promise.resolve Envelope.from "utf8", JSON.stringify {ciphertext, nonce}

  Method.define encrypt, SharedKey.isType, Plaintext.isType, (key, plaintext) ->
    nonce = Nonce.from "bytes", await randomBytes nacl.box.nonceLength
    encrypt key, nonce, plaintext

  # Return the multimethod.
  encrypt

export default Encrypt

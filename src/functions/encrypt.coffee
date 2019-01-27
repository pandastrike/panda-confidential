import nacl from "tweetnacl"
import {isPrototype, toJSON} from "panda-parchment"
import {Method} from "panda-generics"
import {convert} from "../utils"

Encrypt = ({randomBytes, SymmetricKey, SharedKey,
            Message, Nonce, Ciphertext, Envelope}) ->
  # Define a multimethod to export.
  encrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::encrypt no matches on #{toJSON args}"

  # Symmetric Encryption
  Method.define encrypt, SymmetricKey.isType, Nonce.isType, Message.isType,
    (key, nonce, message) ->
      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          key.to "bytes"
        )

      Promise.resolve Envelope.from "utf8", toJSON
        ciphertext: ciphertext.to "base64"
        nonce: nonce.to "base64"

  Method.define encrypt, SymmetricKey.isType, Message.isType,
    (key, message) ->
      nonce = Nonce.from "bytes", await randomBytes nacl.secretbox.nonceLength
      encrypt key, nonce, message


  # Asymmetric Encryption via shared key.
  Method.define encrypt, SharedKey.isType, Nonce.isType, Message.isType,
    (key, nonce, message) ->
      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          key.to "bytes"
        )

      Promise.resolve Envelope.from "utf8", toJSON
        ciphertext: ciphertext.to "base64"
        nonce: nonce.to "base64"

  Method.define encrypt, SharedKey.isType, Message.isType, (key, message) ->
    nonce = Nonce.from "bytes", await randomBytes nacl.box.nonceLength
    encrypt key, nonce, message

  # Return the multimethod.
  encrypt

export default Encrypt

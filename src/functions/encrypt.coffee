import nacl from "tweetnacl"
import { toJSON } from "../utils"
import { generic } from "@dashkite/joy/generic"

Encrypt = ({randomBytes, SymmetricKey, SharedKey,
            Message, Nonce, Ciphertext, Envelope}) ->
  # Define a multimethod to export.
  encrypt = generic
    name: "encrypt"
    description: "Encrypts a Message to return an Envelope"

  # Symmetric Encryption
  generic encrypt, SymmetricKey.isType, Nonce.isType, Message.isType,
    (key, nonce, message) ->
      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          key.to "bytes"
        )

      Promise.resolve Envelope.create {ciphertext, nonce}

  generic encrypt, SymmetricKey.isType, Message.isType,
    (key, message) ->
      nonce = Nonce.from "bytes", await randomBytes nacl.secretbox.nonceLength
      encrypt key, nonce, message


  # Asymmetric Encryption via shared key.
  generic encrypt, SharedKey.isType, Nonce.isType, Message.isType,
    (key, nonce, message) ->
      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          key.to "bytes"
        )

      Promise.resolve Envelope.create {ciphertext, nonce}

  generic encrypt, SharedKey.isType, Message.isType, (key, message) ->
    nonce = Nonce.from "bytes", await randomBytes nacl.box.nonceLength
    encrypt key, nonce, message

  # Return the multimethod.
  encrypt

export default Encrypt

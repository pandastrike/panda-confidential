import nacl from "tweetnacl"
import {toJSON} from "panda-parchment"
import Method from "panda-generics"

Encrypt = ({randomBytes, SymmetricKey, SharedKey,
            Message, Nonce, Ciphertext, Envelope}) ->
  # Define a multimethod to export.
  encrypt = Method.create
    name: "encrypt"
    description: "Encrypts a Message to return an Envelope"

  # Symmetric Encryption
  Method.define encrypt, SymmetricKey.isType, Nonce.isType, Message.isType,
    (key, nonce, message) ->
      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          key.to "bytes"
        )

      Promise.resolve Envelope.create {ciphertext, nonce}

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

      Promise.resolve Envelope.create {ciphertext, nonce}

  Method.define encrypt, SharedKey.isType, Message.isType, (key, message) ->
    nonce = Nonce.from "bytes", await randomBytes nacl.box.nonceLength
    encrypt key, nonce, message

  # Return the multimethod.
  encrypt

export default Encrypt

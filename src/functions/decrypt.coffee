import nacl from "tweetnacl"
import Method from "panda-generics"
import {toJSON} from "panda-parchment"

Decrypt = ({SymmetricKey, SharedKey, Envelope, Message}) ->
  # Define a multimethod for export.
  decrypt = Method.create
    name: "decrypt"
    description: "Decrypts an Envelope to return a Message."

  # Symmetric Decryption
  Method.define decrypt, SymmetricKey.isType, Envelope.isType,
    (key, {ciphertext, nonce}) ->
      message = nacl.secretbox.open(
        ciphertext.to "bytes"
        nonce.to "bytes"
        key.to "bytes"
      )

      if message?
        Message.from "bytes", message
      else
        throw new Error "Decryption Failure"

  # Asymmetric Decryption via shared key.
  Method.define decrypt, SharedKey.isType, Envelope.isType,
    (key, {ciphertext, nonce}) ->
      message = nacl.box.open.after(
        ciphertext.to "bytes"
        nonce.to "bytes"
        key.to "bytes"
      )

      if message?
        Message.from "bytes", message
      else
        throw new Error "Decryption Failure"

  decrypt

export default Decrypt

import nacl from "tweetnacl"
import { generic } from "@dashkite/joy/generic"
import { toJSON } from "../utils"

Decrypt = ({SymmetricKey, SharedKey, Envelope, Message}) ->
  # Define a multimethod for export.
  decrypt = generic
    name: "decrypt"
    description: "Decrypts an Envelope to return a Message."

  # Symmetric Decryption
  generic decrypt, SymmetricKey.isType, Envelope.isType,
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
  generic decrypt, SharedKey.isType, Envelope.isType,
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

import nacl from "tweetnacl"
import {Method} from "panda-generics"
import {toJSON} from "panda-parchment"

Decrypt = ({SymmetricKey, SharedKey, PrivateKey, EncryptionKeyPair, 
  Envelope, Message}) ->

  # Define a multimethod for export.
  decrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::decrypt no matches on #{toJSON args}"

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

  # Asymmetric Decryption when only private key is provided.
  Method.define decrypt, PrivateKey.isType, Envelope.isType,
    (key, envelope) ->
      throw new Error "Envelope needs source field" unless envelope.source?
      decrypt (SharedKey.create key, envelope.source), envelope

  Method.define decrypt, EncryptionKeyPair.isType, Envelope.isType,
    ({privateKey}, envelope) ->
      throw new Error "Envelope needs source field" unless envelope.source?
      decrypt (SharedKey.create privateKey, envelope.source), envelope

  decrypt

export default Decrypt

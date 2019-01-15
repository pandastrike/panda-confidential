import nacl from "tweetnacl"
import {Method} from "panda-generics"

Decrypt = ({SymmetricKey, SharedKey, Envelope, Plaintext}) ->
  # Define a multimethod for export.
  decrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::decrypt no matches on #{JSON.stringify args}"

  # Symmetric Decryption
  Method.define decrypt, SymmetricKey.isType, Envelope.isType,
    (key, {ciphertext, nonce}) ->
      plaintext = nacl.secretbox.open ciphertext, nonce, key.to "bytes"
      if plaintext?
        Plaintext.from "bytes", plaintext
      else
        throw new Error "Decryption Failure - Invalid Key"

  # Asymmetric Decryption via shared key.
  Method.define decrypt, SharedKey.isType, Envelope.isType,
    (key, {ciphertext, nonce}) ->
      plaintext = nacl.box.open.after ciphertext, nonce, key.to "bytes"
      if plaintext?
        Plaintext.from "bytes", plaintext
      else
        throw new Error "Decryption Failure - Invalid Key"

  decrypt

export default Decrypt

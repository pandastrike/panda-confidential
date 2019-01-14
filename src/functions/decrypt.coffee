import nacl from "tweetnacl"
import {Method} from "panda-generics"

Decrypt = ({SymmetricKey, SharedKey, Envelope, Plaintext}) ->
  # Define a multimethod for export.
  decrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::decrypt no matches on #{JSON.stringify args}"

  # Symmetric Decryption
  Method.define decrypt, SymmetricKey.isType, Envelope.isType,
    (key, {ciphertext, nonce}) ->
      new Plaintext nacl.secretbox.open ciphertext, nonce, key.to "bytes"

  # Asymmetric Decryption via shared key.
  Method.define decrypt, SharedKey.isType, Envelope.isType,
    (key, {ciphertext, nonce}) ->
      new Plaintext nacl.box.open.after ciphertext, nonce, key.to "bytes"

  decrypt

export default Decrypt

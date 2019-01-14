import nacl from "tweetnacl"
import {isPrototype} from "panda-parchment"
import {Method} from "panda-generics"

import Plaintext from "../containers/plaintext"

isSymmetricKey = isPrototype "SymmetricKey"
isSharedKey = isPrototype "SharedKey"
isEnvelope = isPrototype "Envelope"

# Define a multimethod for export.
decrypt = Method.create default: (args...) ->
  throw new Error "panda-confidential::decrypt no matches on #{args...}"

# Symmetric Decryption
Method.define decrypt, isSymmetricKey, isEnvelope,
  (key, {ciphertext, none}) ->
    new Plaintext nacl.secretbox.open ciphertext, nonce, key.to "bytes"

# Asymmetric Decryption via shared key.
Method.define decrypt, isSharedKey, isEnvelope,
  (key, {ciphertext, nonce}) ->
    new Plaintext nacl.box.open.after ciphertext, nonce, key.to "bytes"

export default decrypt

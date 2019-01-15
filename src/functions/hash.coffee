import nacl from "tweetnacl"
import {Method} from "panda-generics"

_hash = ({Hash, Plaintext}) ->
  # Return the SHA-512 hash of a message.
  hash = Method.create default: (args...) ->
    throw new Error "panda-confidential::hash - no match on #{args}"
  Method.define hash, Plaintext.isType,
    (plaintext) -> Hash.from "bytes", nacl.hash plaintext.to "bytes"

  hash

export default _hash

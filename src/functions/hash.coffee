import nacl from "tweetnacl"
import {Method} from "panda-generics"
import Plaintext from "../containers/plaintext"
import Hash from "../containers/hash"

# Return the SHA-512 hash of a message.
hash = Method.create default: (args...) ->
  throw new Error "panda-confidential::hash - no match on #{args...}"
Method.define hash, Plaintext.isType,
  (plaintext) -> new Hash nacl.hash plaintext

export default hash

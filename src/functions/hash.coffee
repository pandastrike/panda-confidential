import nacl from "tweetnacl"
import Method from "panda-generics"

_hash = ({Hash, Message}) ->
  # Return the SHA-512 hash of a message.
  hash = Method.create
    name: "hash"
    description: "Generates a SHA-512 hash of a Message."

  Method.define hash, Message.isType,
    (message) -> Hash.from "bytes", nacl.hash message.to "bytes"

  hash

export default _hash

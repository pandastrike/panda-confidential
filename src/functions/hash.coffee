import nacl from "@dashkite/tweetnacl"
import { generic } from "@dashkite/joy/generic"

_hash = ({Hash, Message}) ->
  # Return the SHA-512 hash of a message.
  hash = generic
    name: "hash"
    description: "Generates a SHA-512 hash of a Message."

  generic hash, Message.isType,
    (message) -> Hash.from "bytes", nacl.hash message.to "bytes"

  hash

export default _hash

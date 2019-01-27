import nacl from "tweetnacl"
import {Method} from "panda-generics"
import {toJSON} from "panda-parchment"

Verify = ({Declaration}) ->
  # Define a multimethod.
  verify = Method.create default: (args...) ->
    throw new Error "panda-confidential::verify no matches on #{toJSON args}"

  # Verify the signature(s) on a message.
  Method.define verify, Declaration.isType,
    ({message, signatories, signatures}) ->
      {length} = signatories

      if length < 1
        return false
      if signatures.length != length
        return false

      for i in [0...length]
        isValid = nacl.sign.detached.verify(
          message.to "bytes"
          signatures[i].to "bytes"
          signatories[i].to "bytes"
        )

        return false unless isValid

      return true

  verify

export default Verify

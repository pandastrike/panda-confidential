import nacl from "@dashkite/tweetnacl"
import { generic } from "@dashkite/joy/generic"
import { toJSON } from "../utils"

Verify = ({Declaration}) ->
  # Define a multimethod.
  verify = generic
    name: "verify"
    description: "Verifies the digital signature of a Declaration,
      returning true or false."

  # Verify the signature(s) on a message.
  generic verify, Declaration.isType,
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

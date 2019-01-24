import nacl from "tweetnacl"
import {Method} from "panda-generics"
import {toJSON} from "panda-parchment"

Verify = ({Declaration}) ->
  # Define a multimethod.
  verify = Method.create default: (args...) ->
    throw new Error "panda-confidential::verify no matches on #{toJSON args}"

  # Verify the signature(s) on a message.
  Method.define verify, Declaration.isType,
    ({data, signatories, signatures}) ->
      if signatories.length != signatures.length
        return false
      for signatory, i in signatories
        unless nacl.sign.detached.verify data, signatures[i], signatory
          return false
      return true

  verify

export default Verify

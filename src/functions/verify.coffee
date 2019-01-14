import nacl from "tweetnacl"
import {isPrototype} from "panda-parchment"
import {Method} from "panda-generics"

import Declaration from "../containers/declaration"

isPublicKey = isPrototype "PublicKey"
isPrivatedKey = isPrototype "PrivateKey"
isSignatureKeyPair = isPrototype "SignatureKeyPair"
isDeclaration = Declaration.isType

# Define a multimethod.
verify = Method.create default: (args...) ->
  throw new Error "panda-confidential::verify no matches on #{args...}"

# Verify the signature(s) on a message.
Method.define verify, isDeclaration,
  ({data, signatories, signatures}) ->
    if signatories.length != signatures.length
      return false
    for signatory, i in signatories
      unless nacl.sign.detached.verify data, signatures[i], signatory
        return false
    return true

export default verify

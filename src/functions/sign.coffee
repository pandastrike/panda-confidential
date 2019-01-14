import nacl from "tweetnacl"
import {isPrototype} from "panda-parchment"
import {Method} from "panda-generics"

import Declaration from "../containers/declaration"

isPublicKey = isPrototype "PublicKey"
isPrivatedKey = isPrototype "PrivateKey"
isSignatureKeyPair = isPrototype "SignatureKeyPair"
isPlaintext = isPrototype "Plaintext"
isDeclaration = Declaration.isType

# Define a multimethod.
sign = Method.create default: (args...) ->
  throw new Error "panda-confidential::sign no matches on #{args...}"

# Signing a plain message.
Method.define sign, isPrivateKey, isPublicKey, isPlaintext,
  (privateKey, publicKey, plaintext) ->
      data = plaintext.to "bytes"
      new Declaration
        data: data
        signatories: [publicKey.to "bytes"]
        signatures: [nacl.sign.detached data, privateKey.to "bytes"]

# Signing Declaration class (previously signed message).
Method.define sign, isPrivateKey, isPublicKey, isDeclaration,
  (privateKey, publicKey, declaration) ->
    declaration.signatories.push publicKey.to "bytes"
    declaration.signatures.push(
      nacl.sign.detached declaration.data, privateKey.to "bytes"
    )
    declaration

# Signing with whole Key Pair.
Method.define sign, isSignatureKeyPair, isAny,
  ({privateKey, publicKey}, thing) -> sign privateKey, publicKey, thing

# Signing with public key first
Method.define sign, isPublicKey, isPrivateKey, isAny,
  (publicKey, privateKey, thing) -> sign privateKey, publicKey, thing

export default sign

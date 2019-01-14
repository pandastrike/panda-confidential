import nacl from "tweetnacl"
import {Method} from "panda-generics"

isAny = (foo) -> if foo? then true else false

Sign = ({PublicKey, PrivateKey, SignatureKeyPair, Plaintext, Declaration}) ->
  # Define a multimethod.
  sign = Method.create default: (args...) ->
    throw new Error "panda-confidential::sign no matches on #{arg}"

  # Signing a plain message.
  Method.define sign, PrivateKey.isType, PublicKey.isType, Plaintext.isType,
    (privateKey, publicKey, plaintext) ->
        data = plaintext.to "bytes"
        new Declaration
          data: data
          signatories: [publicKey.to "bytes"]
          signatures: [nacl.sign.detached data, privateKey.to "bytes"]

  # Signing Declaration class (previously signed message).
  Method.define sign, PrivateKey.isType, PublicKey.isType, Declaration.isType,
    (privateKey, publicKey, declaration) ->
      declaration.signatories.push publicKey.to "bytes"
      declaration.signatures.push(
        nacl.sign.detached declaration.data, privateKey.to "bytes"
      )
      declaration

  # Signing with whole Key Pair.
  Method.define sign, SignatureKeyPair.isType, isAny,
    ({privateKey, publicKey}, thing) -> sign privateKey, publicKey, thing

  # Signing with public key first
  Method.define sign, PublicKey.isType, PrivateKey.isType, isAny,
    (publicKey, privateKey, thing) -> sign privateKey, publicKey, thing

  sign

export default Sign

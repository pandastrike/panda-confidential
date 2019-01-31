import nacl from "tweetnacl"
import {toJSON, cat, first, rest} from "panda-parchment"
import {Method} from "panda-generics"

Sign = ({PublicKey, PrivateKey, SignatureKeyPair,
  Message, Signature, Declaration}) ->

  # sign accepts either a Message or a Declaration
  isContent = (thing) ->
    (Message.isType thing) || (Declaration.isType thing)


  # Define a multimethod.
  sign = Method.create default: (args...) ->
    throw new Error "panda-confidential::sign no matches on #{toJSON args}"

  # Signing a plain Message
  Method.define sign, PrivateKey.isType, PublicKey.isType, Message.isType,
    (privateKey, publicKey, message) ->
        signature = Signature.from "bytes",
          nacl.sign.detached(
            message.to "bytes"
            privateKey.to "bytes"
          )

        Declaration.create
          message: message
          signatures: [signature]
          signatories: [publicKey]

  # Signing a Declaration (previously signed Message)
  Method.define sign, PrivateKey.isType, PublicKey.isType, Declaration.isType,
    (privateKey, publicKey, declaration) ->
      signature = Signature.from "bytes",
        nacl.sign.detached(
          declaration.message.to "bytes"
          privateKey.to "bytes"
        )

      declaration.signatures.push signature
      declaration.signatories.push publicKey
      declaration

  # Signing with public key first
  Method.define sign, PublicKey.isType, PrivateKey.isType, isContent,
    (publicKey, privateKey, thing) -> sign privateKey, publicKey, thing

  # Signing with whole key pair.
  Method.define sign, SignatureKeyPair.isType, isContent,
    ({privateKey, publicKey}, thing) -> sign privateKey, publicKey, thing

  # Signing with a collection of key pairs
  Method.define sign, SignatureKeyPair.areType, isContent,
    (keyPairs, thing) ->
      declaration = sign (first keyPairs), thing
      for pair in rest keyPairs
        declaration = sign pair, declaration
      declaration

  sign

export default Sign

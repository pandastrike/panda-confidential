import nacl from "tweetnacl"
import {isDefined, toJSON} from "panda-parchment"
import {Method} from "panda-generics"
import {convert} from "../utils"

Sign = ({PublicKey, PrivateKey, SignatureKeyPair,
  Message, Signature, Declaration}) ->
  # Define a multimethod.
  sign = Method.create default: (args...) ->
    throw new Error "panda-confidential::sign no matches on #{arg}"

  # Signing a plain message.
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

  # Signing Declaration class (previously signed message).
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

  # Signing with whole Key Pair.
  Method.define sign, SignatureKeyPair.isType, isDefined,
    ({privateKey, publicKey}, thing) -> sign privateKey, publicKey, thing

  # Signing with public key first
  Method.define sign, PublicKey.isType, PrivateKey.isType, isDefined,
    (publicKey, privateKey, thing) -> sign privateKey, publicKey, thing

  sign

export default Sign

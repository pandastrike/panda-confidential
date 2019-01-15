import nacl from "tweetnacl"
import {isDefined} from "panda-parchment"
import {Method} from "panda-generics"
import {convert} from "../utils"

Sign = ({PublicKey, PrivateKey, SignatureKeyPair,
  Plaintext, Declaration}) ->
  # Define a multimethod.
  sign = Method.create default: (args...) ->
    throw new Error "panda-confidential::sign no matches on #{arg}"

  # Signing a plain message.
  Method.define sign, PrivateKey.isType, PublicKey.isType, Plaintext.isType,
    (privateKey, publicKey, plaintext) ->
        data = plaintext.to "bytes"
        signature = nacl.sign.detached data, privateKey.to "bytes"
        signature = convert from: "bytes", to: "base64", signature
        Declaration.from "utf8", JSON.stringify
          data: plaintext.to "base64"
          signatories: [publicKey.to "base64"]
          signatures: [signature]

  # Signing Declaration class (previously signed message).
  Method.define sign, PrivateKey.isType, PublicKey.isType, Declaration.isType,
    (privateKey, publicKey, declaration) ->
      declaration.signatories.push publicKey.to "bytes"
      declaration.signatures.push nacl.sign.detached declaration.data,
        privateKey.to "bytes"
      declaration

  # Signing with whole Key Pair.
  Method.define sign, SignatureKeyPair.isType, isDefined,
    ({privateKey, publicKey}, thing) -> sign privateKey, publicKey, thing

  # Signing with public key first
  Method.define sign, PublicKey.isType, PrivateKey.isType, isDefined,
    (publicKey, privateKey, thing) -> sign privateKey, publicKey, thing

  sign

export default Sign

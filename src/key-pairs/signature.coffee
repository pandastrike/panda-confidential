import nacl from "tweetnacl"
import {isType, isObject} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"
import {KeyPair} from "./key-pair"
import {privateKey, publicKey} from "../keys"

class SignatureKeyPair extends KeyPair

isSignatureKeyPair = isType SignatureKeyPair

signatureKeyPair = (randomBytes) ->
  # Generate a random input to generate a pair. Length comes from TweetNaCl.
  getPair = Method.create
    default: ->
      input = await randomBytes nacl.sign.seedLength
      pair = nacl.sign.keyPair.fromSeed input
      new SignatureKeyPair
        privateKey: privateKey pair.secretKey
        publicKey: publicKey pair.publicKey
  Method.define getPair, isObject, (o) -> new SignatureKeyPair o
  getPair

export {signatureKeyPair, isSignatureKeyPair}

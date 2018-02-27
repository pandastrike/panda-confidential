import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {privateKey as PrivateKey, publicKey} from "../keys"
import {KeyPair} from "./key-pair"

class SignatureKeyPair extends KeyPair

isSignatureKeyPair = isType SignatureKeyPair

signatureKeyPair = (randomBytes) ->
  # Instanciate construction helper with the desired randomBytes interface
  privateKey = PrivateKey randomBytes

  # Length is a constant specified within TweetNaCl.
  getRandom = -> await randomBytes nacl.sign.seedLength

  # Accept a TweetNaCl method and use it with an input to generate a pair.
  generate = (input) ->
    pair = nacl.sign.keyPair.fromSeed input
    new SignatureKeyPair
      privateKey: await privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

  -> await generate await getRandom()


export {signatureKeyPair, isSignatureKeyPair}

import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {privateKey as PrivateKey, publicKey} from "../keys"
import {KeyPair} from "./key-pair"

class SignatureKeyPair extends KeyPair

isSignatureKeyPair = isType SignatureKeyPair

signatureKeyPair = (randomBytes, privateKey, publicKey) ->
  # Generate a random input to generate a pair. Length comes from TweetNaCl.
  ->
    input = await randomBytes nacl.sign.seedLength
    pair = nacl.sign.keyPair.fromSeed input
    new SignatureKeyPair
      privateKey: await privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

export {signatureKeyPair, isSignatureKeyPair}

import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {KeyPair} from "./key-pair"
import {privateKey, publicKey} from "../keys"

class SignatureKeyPair extends KeyPair

isSignatureKeyPair = isType SignatureKeyPair

signatureKeyPair = (randomBytes) ->
  # Generate a random input to generate a pair. Length comes from TweetNaCl.
  ->
    input = await randomBytes nacl.sign.seedLength
    pair = nacl.sign.keyPair.fromSeed input
    new SignatureKeyPair
      privateKey: privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

export {signatureKeyPair, isSignatureKeyPair}

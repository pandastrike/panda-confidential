import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {privateKey, publicKey} from "../keys"
import {KeyPair} from "./key-pair"

# Constant specified within TweetNaCl to generate signature key pair.
LENGTH = nacl.sign.seedLength

class SignatureKeyPair extends KeyPair

isSignatureKeyPair = isType SignatureKeyPair

signatureKeyPair = ({KMS:{randomKey}}) ->
  getRandom = -> await randomKey LENGTH, "buffer"

  # Accept a TweetNaCl method and use it with an input to generate a pair.
  generate = (input) ->
    pair = nacl.sign.keyPair.fromSeed input
    new SignatureKeyPair
      privateKey: privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

  -> generate await getRandom()


export {signatureKeyPair, isSignatureKeyPair}

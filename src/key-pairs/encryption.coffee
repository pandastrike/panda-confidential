import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {privateKey as PrivateKey, publicKey} from "../keys"
import {KeyPair} from "./key-pair"

class EncryptionKeyPair extends KeyPair

isEncryptionKeyPair = isType EncryptionKeyPair

encryptionKeyPair = (randomBytes) ->
  # Instanciate construction helper with the desired randomBytes interface
  privateKey = PrivateKey randomBytes

  # Length is a constant specified within TweetNaCl.
  getRandom = -> await randomBytes nacl.box.secretKeyLength

  # Accept a TweetNaCl method and use it with an input to generate a pair.
  generate = (input) ->
    pair = nacl.box.keyPair.fromSecretKey input
    new EncryptionKeyPair
      privateKey: await privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

  -> await generate await getRandom()


export {encryptionKeyPair, isEncryptionKeyPair}

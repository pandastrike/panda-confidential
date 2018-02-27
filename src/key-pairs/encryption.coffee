import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {KeyPair} from "./key-pair"

class EncryptionKeyPair extends KeyPair

isEncryptionKeyPair = isType EncryptionKeyPair

encryptionKeyPair = (randomBytes, privateKey, publicKey) ->
  # Generate a random input to generate a pair. Length comes from TweetNaCl.
  ->
    input = await randomBytes nacl.box.secretKeyLength
    pair = nacl.box.keyPair.fromSecretKey input
    new EncryptionKeyPair
      privateKey: await privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

export {encryptionKeyPair, isEncryptionKeyPair}

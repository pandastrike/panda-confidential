import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {privateKey, publicKey} from "../keys"
import {KeyPair} from "./key-pair"

# Constant specified within TweetNaCl to generate encryption key pair.
LENGTH = nacl.box.secretKeyLength

class EncryptionKeyPair extends KeyPair

isEncryptionKeyPair = isType EncryptionKeyPair

encryptionKeyPair = ({KMS:{randomKey}}) ->
  getRandom = -> await randomKey LENGTH, "buffer"

  # Accept a TweetNaCl method and use it with an input to generate a pair.
  generate = (input) ->
    pair = nacl.box.keyPair.fromSecretKey input
    new EncryptionKeyPair
      privateKey: privateKey pair.secretKey
      publicKey: publicKey pair.publicKey

  -> generate await getRandom()


export {encryptionKeyPair, isEncryptionKeyPair}

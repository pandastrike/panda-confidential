import nacl from "tweetnacl"
import {isType, isObject} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"
import {KeyPair} from "./key-pair"
import {privateKey, publicKey} from "../keys"

class EncryptionKeyPair extends KeyPair

isEncryptionKeyPair = isType EncryptionKeyPair

encryptionKeyPair = (randomBytes) ->
  # Generate a random input to generate a pair. Length comes from TweetNaCl.
  getPair = Method.create
    default: ->
      input = await randomBytes nacl.box.secretKeyLength
      pair = nacl.box.keyPair.fromSecretKey input
      new EncryptionKeyPair
        privateKey: privateKey pair.secretKey
        publicKey: publicKey pair.publicKey

  Method.define getPair, isObject, (o) -> new EncryptionKeyPair o
  getPair


export {encryptionKeyPair, isEncryptionKeyPair}

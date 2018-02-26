import Sundog from "sundog"
import nacl from "tweetnacl"

import {kmsKeyID, privateKey, publicKey, sharedKey} from "./keys"
import {encryptionKeyPair, signatureKeyPair} from "./key-pairs"
import {signedMessage} from "./signed-message"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"

Confidential = (SDK) ->
  {AWS} = Sundog SDK

  Object.defineProperties {},
    encryptionKeyPair:
      enumerable: true
      get: -> encryptionKeyPair AWS
    signatureKeyPair:
      enumerable: true
      get: -> signatureKeyPair AWS
    kmsKeyID:
      enumerable: true
      get: -> kmsKeyID
    privateKey:
      enumerable: true
      get: -> privateKey
    publicKey:
      enumerable: true
      get: -> publicKey
    sharedKey:
      enumerable: true
      get: -> sharedKey
    signedMessage:
      enumerable: true
      get: -> signedMessage
    encrypt:
      enumerable: true
      get: -> encrypt AWS
    decrypt:
      enumerable: true
      get: -> decrypt AWS
    sign:
      enumerable: true
      get: -> sign()
    verify:
      enumerable: true
      get: -> verify()
    hash:
      enumerable: true
      get: -> hash


export default Confidential

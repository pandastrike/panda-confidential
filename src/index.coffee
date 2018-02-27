import Sundog from "sundog"
import nacl from "tweetnacl"

import validate from "./validate-input"
import {kmsKeyID, privateKey, publicKey, sharedKey} from "./keys"
import {encryptionKeyPair, signatureKeyPair} from "./key-pairs"
import {signedMessage} from "./signed-message"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"

Confidential = (input={}) ->
  {randomBytes, externalEncrypter, isExternalKeyClass} = validate input

  Object.defineProperties {},
    encryptionKeyPair:
      enumerable: true
      get: -> encryptionKeyPair randomBytes
    signatureKeyPair:
      enumerable: true
      get: -> signatureKeyPair randomBytes
    kmsKeyID:
      enumerable: true
      get: -> kmsKeyID
    privateKey:
      enumerable: true
      get: -> privateKey randomBytes
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
      get: -> encrypt randomBytes, externalEncrypter, isExternalKeyClass
    decrypt:
      enumerable: true
      get: -> decrypt externalEncrypter, isExternalKeyClass
    sign:
      enumerable: true
      get: -> sign
    verify:
      enumerable: true
      get: -> verify
    hash:
      enumerable: true
      get: -> hash


export default Confidential

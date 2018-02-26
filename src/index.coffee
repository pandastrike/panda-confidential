import Sundog from "sundog"

import {kmsKeyID, privateKey, publicKey, sharedKey, keyPair, signedMessage} from "./classes"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"

Confidential = (SDK) ->
  {AWS} = Sundog SDK

  Object.defineProperties {},
    keyPair:
      enumerable: true
      get: -> keyPair AWS
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

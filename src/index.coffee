import Sundog from "sundog"

import {KMSKey, PrivateKey, PublicKey, SharedKey, KeyPair, SignedMessage} from "./keys"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"

Confidential = (SDK) ->
  {AWS} = Sundog SDK

  Object.defineProperties {},
    KeyPair:
      enumerable: true
      get: ->
        KeyPair._generate AWS
        KeyPair
    KMSKey:
      enumerable: true
      get: -> KMSKey
    PrivateKey:
      enumerable: true
      get: -> PrivateKey
    PublicKey:
      enumerable: true
      get: -> PublicKey
    SharedKey:
      enumerable: true
      get: -> SharedKey
    SignedMessage:
      enumerable: true
      get: -> SignedMessage
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


export default Confidential

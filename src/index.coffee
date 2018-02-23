import Sundog from "sundog"

import KeyPair from "./key-pair"
import {KMSKey, PrivateKey, PublicKey, SharedKey} from "./keys"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"

Confidential = (SDK) ->
  {AWS} = Sundog SDK

  Object.defineProperties {},
    KeyPair:
      enumerable: true
      get: -> KeyPair
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
    encrypt:
      enumerable: true
      get: -> encrypt AWS
    decrypt:
      enumerable: true
      get: -> decrypt AWS
    sign:
      enumerable: true
      get: -> sign AWS
    verify:
      enumerable: true
      get: -> verify AWS


export default Confidential

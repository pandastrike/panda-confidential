import nacl from "tweetnacl"
import {kmsKeyID, privateKey, publicKey, sharedKey} from "./keys"
import {encryptionKeyPair, signatureKeyPair} from "./key-pairs"
import {signedMessage} from "./signed-message"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"

confidential = ->
  Object.defineProperties {},
    randomBytes:
      enumerable: true
      get: -> nacl.randomBytes
    key:
      enumerable: true
      get: ->
        Private: privateKey @randomBytes
        Public: publicKey
        Shared: sharedKey
    keyPair:
      enumerable: true
      get: ->
        Encryption: encryptionKeyPair @randomBytes, @key
        Signature: signatureKeyPair @randomBytes, @key
    signedMessage:
      enumerable: true
      get: -> signedMessage
    encrypt:
      enumerable: true
      get: -> encrypt @randomBytes
    decrypt:
      enumerable: true
      get: -> decrypt
    sign:
      enumerable: true
      get: -> sign
    verify:
      enumerable: true
      get: -> verify
    hash:
      enumerable: true
      get: -> hash

export {confidential}

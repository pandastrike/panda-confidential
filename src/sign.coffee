import nacl from "tweetnacl"
import {isString} from "panda-parchment"
import {Method} from "panda-generics"

import {isData, encode, decode} from "./utils"
import {isPrivateKey, isPublicKey} from "./keys"
import {isSignatureKeyPair} from "./key-pairs"
import {isSignedMessage, signedMessage} from "./signed-message"

# Define a multimethod.
sign = Method.create()

# Signing a plain message.
Method.define sign, isPrivateKey, isPublicKey, isData, isString,
  ({key:privateKey}, {key:publicKey}, message, encoding) ->
      signedMessage
        message: message
        encoding: encoding
        publicKeys: [publicKey]
        signatures: [nacl.sign.detached message, privateKey]

Method.define sign, isPrivateKey, isPublicKey, isData,
  (privateKey, publicKey, message) ->
    sign privateKey, publicKey, message, "buffer"
Method.define sign, isPrivateKey, isPublicKey, isString, isString,
  (privateKey, publicKey, message, encoding) ->
    sign privateKey, publicKey, decode(encoding, message), encoding
Method.define sign, isPrivateKey, isPublicKey, isString,
  (privateKey, publicKey, message) ->
    sign privateKey, publicKey, decode("utf8", message), "utf8"

# Signing a plain message with whole Key Pair.
Method.define sign, isSignatureKeyPair, isData,
  ({privateKey, publicKey}, message) ->
    sign privateKey, publicKey, message, "buffer"
Method.define sign, isSignatureKeyPair, isString, isString,
  ({privateKey, publicKey}, message, encoding) ->
    sign privateKey, publicKey, decode(encoding, message), encoding
Method.define sign, isSignatureKeyPair, isString,
  ({privateKey, publicKey}, message) ->
    sign privateKey, publicKey, decode("utf8", message), "utf8"

# Signing SignedMessage class (previously signed message).
Method.define sign, isPrivateKey, isPublicKey, isSignedMessage,
  ({key:privateKey}, {key:publicKey}, sig) ->
    sig.publicKeys.push publicKey
    sig.signatures.push nacl.sign.detached sig.message, privateKey
    sig

Method.define sign, isSignatureKeyPair, isSignedMessage,
  ({privateKey, publicKey}, sig) ->
    sign privateKey, publicKey, sig


export default sign

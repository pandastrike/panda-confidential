import nacl from "tweetnacl"
import {isString, isBuffer} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"


import {isPrivateKey, isPublicKey} from "../keys"
import {isSignatureKeyPair} from "../key-pairs"
import {isSignedMessage} from "../signed-message"
import {sign, addSignature} from "./engine"

SIGN = ->
  # Define a multimethod.
  Sign = Method.create()

  # Signing SignedMessage class (previously signed message).
  Method.define Sign, isPrivateKey, isPublicKey, isSignedMessage,
    (privateKey, publicKey, signedMessage) ->
      addSignature privateKey, publicKey, signedMessage
  Method.define Sign, isSignatureKeyPair, isSignedMessage,
    ({privateKey, publicKey}, signedMessage, encoding) ->
      addSignature privateKey, publicKey, signedMessage

  # Signing a plain message with whole Key Pair.
  Method.define Sign, isSignatureKeyPair, isBuffer,
    ({privateKey, publicKey}, message) ->
      sign privateKey, publicKey, message, "buffer"
  Method.define Sign, isSignatureKeyPair, isString, isString,
    ({privateKey, publicKey}, message, encoding) ->
      sign privateKey, publicKey, message, encoding
  Method.define Sign, isSignatureKeyPair, isString,
    ({privateKey, publicKey}, message) ->
      sign privateKey, publicKey, message, "utf8"

  # Signing a plain message.
  Method.define Sign, isPrivateKey, isPublicKey, isBuffer,
    (privateKey, publicKey, message) ->
      sign privateKey, publicKey, message, "buffer"
  Method.define Sign, isPrivateKey, isPublicKey, isString, isString,
    (privateKey, publicKey, message, encoding) ->
      sign privateKey, publicKey, message, encoding
  Method.define Sign, isPrivateKey, isPublicKey, isString,
    (privateKey, publicKey, message) ->
      sign privateKey, publicKey, message, "utf8"


  # Return the multimethod.
  Sign

export default SIGN

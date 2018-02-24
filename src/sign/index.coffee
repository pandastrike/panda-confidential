import nacl from "tweetnacl"
import {isString, isBuffer} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"


import {isPrivateKey, isPublicKey, isSignedMessage, isKeyPair} from "../utils"
import {sign, addSignature} from "./engine"

SIGN = ->
  # Define a multimethod.
  Sign = Method.create()

  # Signing a plain message.
  Method.define Sign, isPrivateKey, isPublicKey, isString,
    (privateKey, publicKey, message) ->
      sign privateKey, publicKey, message, "utf8"
  Method.define Sign, isPrivateKey, isPublicKey, isBuffer,
    (privateKey, publicKey, message) ->
      sign privateKey, publicKey, message, "buffer"
  Method.define Sign, isPrivateKey, isPublicKey, isString, isString,
    (privateKey, publicKey, message, encoding) ->
      sign privateKey, publicKey, message, encoding

  # Signing a plain message with whole Key Pair.
  Method.define Sign, isKeyPair, isString,
    ({privateKey, publicKey}, message) ->
      sign privateKey, publicKey, message, "utf8"
  Method.define Sign, isKeyPair, isBuffer,
    ({privateKey, publicKey}, message) ->
      sign privateKey, publicKey, message, "buffer"
  Method.define Sign, isKeyPair, isString, isString,
    ({privateKey, publicKey}, message, encoding) ->
      sign privateKey, publicKey, message, encoding

  # Signing SignedMessage class (previously signed message).
  Method.define Sign, isPrivateKey, isPublicKey, isSignedMessage,
    (privateKey, publicKey, signedMessage) ->
      addSignature privateKey, publicKey, signedMessage

  # Return the multimethod.
  Sign

export default SIGN

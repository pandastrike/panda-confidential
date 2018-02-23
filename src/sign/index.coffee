import nacl from "tweetnacl"
import {Method, isString, isBuffer} from "fairmont-helpers"

import {isPrivateKey, isPublicKey, isSignedMessage} from "./utils"
import {sign, addSignature} from "./engine"

Sign = ->
  # Define a multimethod.
  signMultimethod = Method.create()

  # Signing a plain message.
  Method.define isPrivateKey, isPublicKey, isString,
    (privateKey, publicKey, message) ->
      sign privateKey, publicKey, message, "utf8"
  Method.define isPrivateKey, isPublicKey, isBuffer,
    (privateKey, publicKey, message) ->
      sign privateKey, publicKey, message, "buffer"
  Method.define isPrivateKey, isPublicKey, isString, isString,
    (privateKey, publicKey, message, encoding) ->
      sign privateKey, publicKey, message, encoding

  # Signing SignedMessage class (previously signed message).
  Method.define isPrivateKey, isPublicKey, isSignedMessage
    (privateKey, publicKey, signedMessage) ->
      addSignature privateKey, publicKey, signedMessage

  # Return the multimethod.
  signMultimethod

export default Sign

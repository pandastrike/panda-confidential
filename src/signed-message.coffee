# Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
import {Method} from "fairmont-multimethods"
import {isType, isString, isBuffer, isObject} from "fairmont-helpers"

import {encode, decode, isData} from "./utils"

class SignedMessage
  constructor: ({@message, @encoding, @publicKeys, @signatures}) ->
  encode: ->
    encode
      message: encode "base64", @message
      encoding: @encoding
      publicKeys: (encode "base64", key for key in @publicKeys)
      signatures: (encode "base64", sig for sig in @signatures)
  encodeMessage: -> encode @encoding, @message

isSignedMessage = isType SignedMessage

get = Method.create()
Method.define get, isObject,
  ({message, encoding, publicKeys, signatures}) ->
    if !message || !encoding || !publicKeys || !signatures
      throw new Error "Needs message, encoding, public keys, and signatures."
    message: decode "base64", message
    encoding: encoding
    publicKeys: (decode "base64", key for key in publicKeys)
    signatures: (decode "base64", sig for sig in signatures)
Method.define get, isString, (s) -> get JSON.parse encode "utf8", s
Method.define get, isData, (d) -> get JSON.parse encode "utf8", d

signedMessage = (input) -> new SignedMessage get input

export {signedMessage, isSignedMessage}

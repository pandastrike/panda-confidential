# Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
import {Method} from "fairmont-multimethods"
import {isType, isString, isBuffer, isObject} from "fairmont-helpers"

import {isUint8Array, decodeSignature, encode, encodeSignature} from "../utils"

class SignedMessage
  constructor: ({@message, @encoding, @publicKeys, @signatures}) ->
  dump: -> encodeSignature @
  dumpMessage: (encoding="utf8") -> encode encoding, @message

isSignedMessage = isType SignedMessage

validate = ({message, encoding, publicKeys, signatures}) ->
  if !message || !encoding || !publicKeys || !signatures
    throw new Error "Must provide message, encoding, public key array, and signature array."
  {message, encoding, publicKeys, signatures}

# decodeSignature expects a base64 string and returns an object.
getMsg = Method.create()
Method.define getMsg, isString, (sig) -> decodeSignature sig
Method.define getMsg, isBuffer, (sig) -> decodeSignature encode "base64", sig
Method.define getMsg, isUint8Array,
  (sig) -> decodeSignature encode "base64", sig
Method.define getMsg, isObject, (sig) -> sig

signedMessage = (input) -> new SignedMessage validate getMsg input

export {signedMessage, isSignedMessage}

# Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
import {Method} from "fairmont-multimethods"
import {isType, isString, isBuffer, isObject} from "fairmont-helpers"

import {encode, decode, isData} from "../utils"

class SignedMessage
  constructor: ({@message, @encoding, @publicKeys, @signatures}) ->
  dump: -> encode
    message: encode "base64", @message
    encoding: @encoding
    publicKeys: (encode "base64", key for key in @publicKeys)
    signatures: (encode "base64", sig for sig in @signatures)
  dumpMessage: (encoding="utf8") -> encode encoding, @message

isSignedMessage = isType SignedMessage

validate = ({message, encoding, publicKeys, signatures}) ->
  if !message || !encoding || !publicKeys || !signatures
    throw new Error "Must provide message, encoding, public key array, and signature array."
  {message, encoding, publicKeys, signatures}

_get = ({message, encoding, publicKeys, signatures}) ->
  message: decode "base64" sig.message
  encoding: encoding
  publicKeys: (decode "base64", key for key in publicKeys)
  signatures: (decode "base64", sig for sig in signatures)

get = Method.create()
Method.define get, isString, (s) -> _get JSON.parse encode "utf8", s
Method.define get, isData, (d) -> _get JSON.parse encode "utf8", d
Method.define getMsg, isObject, (sig) -> sig

signedMessage = (input) -> new SignedMessage validate get input

export {signedMessage, isSignedMessage}

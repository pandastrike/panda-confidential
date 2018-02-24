# Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
import {Method} from "fairmont-multimethods"
import {isString, isBuffer, isObject} from "fairmont-helpers"

import {decodeSignature, encode} from "./key-utils"

getMsg = Method.create()
Method.define getMsg, isString, (sig) -> decodeSignature sig
Method.define getMsg, isBuffer, (sig) -> decodeSignature sig, "buffer"
Method.define getMsg, isObject, (sig) -> sig

class SignedMessage
  constructor: (input) ->
    {@message, @encoding, @publicKeys, @signatures} = getMsg input
    @validate()

  validate: ->
    if !@message || !@encoding || !@publicKeys || !@signatures
      throw new Error "Must provide message, encoding, public key array, and signature array."

  dump: ->
    encode "base64",
      JSON.stringify {@message, @encoding, @publicKeys, @signatures}

export default SignedMessage

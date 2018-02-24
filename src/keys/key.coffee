import {isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

# String encode a piece of data or convert into a Buffer.
encode = (encoding, data) ->
  if encoding == "buffer"
    Buffer.from data  # Just output a buffer
  else
    Buffer.from(data).toString encoding

getKey = Method.create()
Method.define getKey, isBuffer, (key) ->
  encode "base64", key
Method.define getKey, isString, (key) ->
  key
Method.define getKey, isString, isString, (key, encoding) ->
  encode "base64", Buffer.from key, encoding

class Key
  constructor: (input, encoding) ->
    if encoding
      @key = getKey input, encoding
    else
      @key = getKey input

export default Key

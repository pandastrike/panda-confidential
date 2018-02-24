import {isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

# String encode a piece of data or convert into a Buffer.
encode = (encoding, data) ->
  if encoding == "buffer"
    Buffer.from data  # Just output a buffer
  else
    Buffer.from(data).toString encoding

class Key
  constructor: (input, encoding) ->
    @key = undefined

    getKey = Method.create()
    Method.define getKey, isBuffer, (key) ->
      @key = encode "base64", key
    Method.define getKey, isString, (key) ->
      @key = key
    Method.define getKey, isString, isString, (key, encoding) ->
      @key = encode "base64", Buffer.from key, encoding

    if encoding
      getKey key, encoding
    else
      getKey key

export default Key

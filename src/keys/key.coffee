import {isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {encode} from "./key-utils"

export class Key
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

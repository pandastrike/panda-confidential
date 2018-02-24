# This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
import nacl from "tweetnacl"
import {isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethod"

import {Key} from "./key"
import {isPrivateKey, isPublicKey, encode} from "./key-utils"

export class SharedKey extends Key
  constructor: (input1, input2) ->
    super()
    @key = undefined

    generateShared = (privateKey, publicKey) ->
      privateKey = decodeKey privateKey
      publicKey = decodeKey publicKey
      @key = encode "base64", nacl.box.before publicKey, privateKey

    # Create a key parsing multimethod.
    getKey = Method.create()

    # The most common usecase is to accept two explicit keys.
    Method.define getKey, isPrivateKey, isPublicKey,
      (privateKey, publicKey) -> generateShared privateKey, publicKey
    Method.define getKey, isPublicKey, isPrivateKey,
      (publicKey, privateKey) -> generateShared privateKey, publicKey

    # Also support a directly input key from somewhere.
    Method.define getKey, isBuffer, (key) ->
      @key = encode "base64", key
    Method.define getKey, isString, (key) ->
      @key = key
    Method.define getKey, isString, isString, (key, encoding) ->
      @key = encode "base64", Buffer.from key, encoding

    if input2
      getKey input1, input2
    else
      getKey input1

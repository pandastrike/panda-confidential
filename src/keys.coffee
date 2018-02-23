import nacl from "tweetnacl"
import {Method, isBuffer, isString, isObject} from "fairmont-helpers"

import {encode, isPrivateKey, isPublicKey, isKey, decodeKey, decodeSignature, decodePlaintext} from "./utils"

import {encryption, signing} from "./constants"


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

class PublicKey extends Key
class PrivateKey extends Key

# This is either a key ID, key Arn, or key alias to identify a key in KMS.
class KMSKey
  constructor: (@key) ->

# This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
class SharedKey extends Key
  constructor: (input1, input2) ->
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


# Allows developers to generate key pairs on demand from KMS's source of randomness for the two types of key pairs in TweetNaCl:
# (1) Public-Key Authenticated Encryption via x25519-xsalsa20-poly1305
# (2) Signing via ed25519
key_pair = ({KMS:{randomKey}}) ->
  class KeyPair
    constructor: ->
    @generate: (type, input, encoding) ->
      getRandom = (length) -> await randomKey length, "buffer"

      getInput = (length) ->
        if !input
          return await getRandom length

        get = Method.create()
        Method.define get, isBuffer, (b) -> b
        Method.define get, isString, (s) -> Buffer.from s, "base64"
        Method.define get, isString, isString, (s, e) -> Buffer.from s, e
        Method.define get, isKey, ({key}) -> Buffer.from key, "base64"
        if encoding then get input, encoding else get input

      # Accept a TweetNaCl method and use it with an input to generate a pair.
      generatePair = (f, input) ->
        pair = f input
        @privateKey = new PrivateKey encode "base64", pair.secretKey
        @publicKey = new PublicKey encode "base64", pair.publicKey

      switch type
        when "encrypt"
          keyInput = await getInput encryption.asymmetric.privateKeyLength
          generatePair nacl.box.keyPair.fromSecretKey, keyInput
        when "sign"
          keyInput = await getInput signing.privateKeyLength
          generatePair nacl.sign.keyPair.fromSeed, keyInput
        else
          throw new Error "Unsupported key pair type, #{type}"


# Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
class SignedMessage
  constructor: (input) ->
    getMsg = Method.create()
    Method.define getMsg, isString, (sig) ->
      {@message, @encoding, @publicKeys, @signatures} = decodeSignature sig
    Method.define getMsg, isBuffer, (sig) ->
      {@message, @encoding, @publicKeys, @signatures} =
        decodeSignature sig, "buffer"
    Method.define getMsg, isObject, (sig) ->
      {@message, @encoding, @publicKeys, @signatures} = sig

    getMsg input
    @validate()

  validate: ->
    if !@message || !@encoding || !@publicKeys || !@signatures
      throw new Error "Must provide message, encoding, public key array, and signature array."


export {
  KMSKey
  PrivateKey
  PublicKey
  SharedKey
  key_pair
  SignedMessage
}

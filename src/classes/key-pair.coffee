# Allows developers to generate key pairs on demand from KMS's source of randomness for the two types of key pairs in TweetNaCl:
# (1) Public-Key Authenticated Encryption via x25519-xsalsa20-poly1305
# (2) Signing via ed25519
import nacl from "tweetnacl"
import {isType, isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isKey} from "./key"
import {privateKey} from "./private-key"
import {publicKey} from "./public-key"
import {decode, isUint8Array} from "../utils"

# Constants that specify the lenght of random numbers used to generate pairs.
LENGTH =
  encrypt: nacl.box.secretKeyLength
  sign: nacl.sign.seedLength

class KeyPair
  constructor: ({@privateKey, @publicKey}) ->

isKeyPair = isType KeyPair

keyPair = ({KMS:{randomKey}}) ->
  getRandom = (length=1) -> await randomKey length, "buffer"

  decodeInput = Method.create()
  Method.define decodeInput, isKey, ({key}) -> key
  Method.define decodeInput, isBuffer, (b) -> b
  Method.define decodeInput, isUint8Array, (b) -> b
  Method.define decodeInput, isString, isString, (s, e) -> decode e, s
  Method.define decodeInput, isString, (s) -> decode "base64", s

  # Accept a TweetNaCl method and use it with an input to generate a pair.
  generate = (f, input) ->
    pair = f input
    privateKey: privateKey pair.secretKey
    publicKey: publicKey pair.publicKey

  (type, input, encoding) ->
    input =
      if input
        decodeInput input, encoding
      else
        await getRandom LENGTH[type]

    new KeyPair switch type
      when "encrypt"
        generate nacl.box.keyPair.fromSecretKey, input
      when "sign"
        generate nacl.sign.keyPair.fromSeed, input
      else
        throw new Error "Unsupported key pair type, #{type}"


export {keyPair, isKeyPair}

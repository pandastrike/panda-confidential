# Allows developers to generate key pairs on demand from KMS's source of randomness for the two types of key pairs in TweetNaCl:
# (1) Public-Key Authenticated Encryption via x25519-xsalsa20-poly1305
# (2) Signing via ed25519
import nacl from "tweetnacl"
import {isBuffer, isString} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isKey, encode} from "./key-utils"
import PrivateKey from "./private-key"
import PublicKey from "./public-key"
import {encryption, signing} from "../constants"

class KeyPair
  constructor: ->
  @_generate: ({KMS:{randomKey}}) ->
    @generate = (type, input, encoding) ->
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

export default KeyPair

# This submodule uses the TweetNaCl-js signature API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements  ed25519.
import nacl from "tweetnacl"

signature = ({KMS}) ->
  # Access to the KMS API via sundog.
  {randomKey} = KMS

  ## Constants
  ################################
  # Length in bytes
  publicLength = 32
  privateLength = 64
  seedLength = 32

  ## Helpers
  ##################################
  # Ensure a given key is in the right form for NaCl-js
  prepareKey = (key) ->
    if typeof key == "string"
      Buffer.from key, "base64"
    else
      key

  # Ensure the plaintext is in the right form for NaCl-js
  preparePlaintext = (msg, encoding) ->
    if encoding == "buffer"
      msg
    else
      Buffer.from msg, encoding


  ## Exposed Functions
  ################################
  generateKeyPairFromSeed = (seed, encoding="base64") ->
    if encoding != "buffer"
      seed = Buffer.from seed, encoding

    pair = nacl.sign.keyPair.fromSeed seed

    publicKey: Buffer.from(pair.publicKey).toString("base64")
    privateKey: Buffer.from(pair.secretKey).toString("base64")

  generateKeyPair = ->
    seed = await randomKey seedLength, "buffer"
    generateKeyPairFromSeed seed, "buffer"

  sign = (key, message, encoding="utf8") ->
    key = prepareKey key
    message = preparePlaintext message, encoding
    Buffer.from(nacl.sign message, key).toString("base64")

  open = (key, message, encoding="utf8") ->
    key = prepareKey key
    message = Buffer.from message, "base64"

    # Return the message without signature
    if encoding == "buffer"
      Buffer.from nacl.sign.open message, key
    else
      Buffer.from nacl.sign.open message, key
      .toString encoding

  # Returns signature only.
  generate = (key, message, encoding="utf8") ->
    key = prepareKey key
    message = preparePlaintext message, encoding
    Buffer.from(nacl.sign.detached message, key).toString("base64")

  # Verifies detached signature with a document.
  verify = (key, sig, message, encoding="utf8") ->
    key = prepareKey key
    sig = Buffer.from sig, "base64"
    message = preparePlaintext message, encoding
    nacl.sign.detached.verify message, sig, key

  {generateKeyPairFromSeed, generateKeyPair, sign, open, generate, verify}

export default signature

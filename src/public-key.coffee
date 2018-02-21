# This submodule uses the TweetNaCl-js public key encryption API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements x25519-xsalsa20-poly1305.
import nacl from "tweetnacl"

box = ({KMS}) ->
  # Access to the KMS API via sundog.
  {randomKey} = KMS

  ## Constants
  ################################
  # Length in bytes
  publicLength = 32
  secretLength = 32
  nonceLength = 24

  ## Helpers
  ##################################
  # Generate nonce from KMS's robust source of randomness.
  prepareNonce = -> await randomKey nonceLength, "buffer"

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

  # Extract data from the blob for decryption.
  extractBlob = (blob) ->
    {ciphertext, nonce} = JSON.parse Buffer.from(blob, "base64").toString()
    ciphertext: Buffer.from ciphertext.data
    nonce: Buffer.from nonce.data

  ## Mutual Functions
  generateKeyPairFromSecret = (secret, encoding="base64") ->
    if encoding != "buffer"
      secret = Buffer.from secret, encoding

    pair = nacl.box.keyPair.fromSecretKey secret

    publicKey: Buffer.from(pair.publicKey).toString("base64")
    privateKey: Buffer.from(pair.secretKey).toString("base64")

  generateKeyPair = ->
    privateKey = await randomKey secretLength, "buffer"
    generateKeyPairFromSecret privateKey, "buffer"


  ## Exposed Sub-Modules
  ################################
  _publicKey = do ->
    encrypt = (publicKey, privateKey, message, encoding="utf8") ->
      # Prepare for encryption.
      nonce = await prepareNonce()
      publicKey = prepareKey publicKey
      privateKey = prepareKey privateKey
      message = preparePlaintext message, encoding

      # Encrypt.
      ciphertext= Buffer.from nacl.box message, nonce, publicKey, privateKey

      # Return a blob of base64 to the outer layer.
      Buffer.from JSON.stringify {ciphertext, nonce}
      .toString("base64")

    decrypt = (publicKey, privateKey, blob, encoding="utf8") ->
      # Prepare for decryption
      {ciphertext, nonce} = extractBlob blob
      publicKey = prepareKey publicKey
      privateKey = prepareKey privateKey

      # Return the decrypted the message.
      if encoding == "buffer"
        Buffer.from nacl.box.open ciphertext, nonce, publicKey, privateKey
      else
        Buffer.from nacl.box.open ciphertext, nonce, publicKey, privateKey
        .toString encoding

    {generateKeyPair, generateKeyPairFromSecret, encrypt, decrypt}


  sharedPublicKey = do ->

    generateKey = (publicKey, privateKey) ->
      Buffer.from nacl.box.before(publicKey, privateKey)
      .toString("base64")

    encrypt = (sharedKey, messager, encoding="utf8") ->
      # Prepare for encryption.
      nonce = await prepareNonce()
      sharedKey = prepareKey sharedKey
      message = preparePlaintext message, encoding

      # Encrypt.
      ciphertext = Buffer.from nacl.box.after message, nonce, sharedKey

      # Return a blob of base64 to the outer layer.
      Buffer.from JSON.stringify {ciphertext, nonce}
      .toString("base64")

    decrypt = (sharedKey, blob, encoding="utf8") ->
      # Prepare for decryption
      {ciphertext, nonce} = extractBlob blob
      sharedKey = prepareKey sharedKey

      # Return the decrypted the message.
      if encoding == "buffer"
        Buffer.from nacl.box.open.after ciphertext, nonce, sharedKey
      else
        Buffer.from nacl.box.open.after ciphertext, nonce, sharedKey
        .toString encoding

    {generateKeyPair, generateKeyPairFromSecret, generateKey, encrypt, decrypt}

  {publicKey:_publicKey, sharedPublicKey}

export default box

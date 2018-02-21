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
      Buffer.from message, encoding

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
    secretKey: Buffer.from(pair.secretKey).toString("base64")

  generateKeyPair = ->
    secretKey = await randomKey secretLength, "buffer"
    generateKeyPairFromSecret secretKey, "buffer"


  ## Exposed Sub-Modules
  ################################
  publicKey = do ->
    encrypt = (theirPublicKey, mySecretKey, message, encoding="utf8") ->
      # Prepare for encryption.
      nonce = await prepareNonce()
      theirPublicKey = prepareKey theirPublicKey
      mySecretKey = prepareKey mySecretKey
      message = preparePlaintext message, encoding

      # Encrypt.
      ciphertext= Buffer.from nacl.box message, nonce, theirPublicKey, mySecretKey

      # Return a blob of base64 to the outer layer.
      Buffer.from JSON.stringify {ciphertext, nonce}
      .toString("base64")

    decrypt = (theirPublicKey, mySecretKey, blob, encoding="utf8") ->
      # Prepare for decryption
      {ciphertext, nonce} = extractBlob blob
      theirPublicKey = prepareKey theirPublicKey
      mySecretKey = prepareKey mySecretKey

      # Return the decrypted the message.
      if encoding == "buffer"
        Buffer.from nacl.box.open ciphertext, nonce, theirPublicKey, mySecretKey
      else
        Buffer.from nacl.box.open ciphertext, nonce, theirPublicKey, mySecretKey
        .toString encoding

    {generateKeyPair, generateKeyPairFromSecret, encrypt, decrypt}


  sharedPublicKey = do ->

    generateKey = (theirPublicKey, mySecretKey) ->
      Buffer.from nacl.box.before(theirPublicKey, mySecretKey)
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

    {generateKeyPair, generateKeyPairFromSecret, generateSharedKey, encrypt, decrypt}

  {publicKey, sharedPublicKey}

export default box

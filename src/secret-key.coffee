# This submodule uses the TweetNaCl-js secret key encryption API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements xsalsa20-poly1305.
import nacl from "tweetnacl"

secretBox = ({KMS}) ->
  (kmsKey) ->
    # Access to the KMS API via sundog.
    {randomKey, encrypt:kmsEncrypt, decrypt:kmsDecrypt} = KMS

    # Length in bytes
    keyLength = 32
    nonceLength = 24

    encrypt = (message, encoding="utf8") ->
      # Get key + nonce from KMS's robust source of entropy.
      random = await randomKey (keyLength + nonceLength), "buffer"
      key = random.slice 0, keyLength
      nonce = random.slice keyLength

      # Encrypt the message. Convert from UInt8Array to Buffer.
      if encoding != "buffer"
        message = Buffer.from message, encoding
      ciphertext = Buffer.from nacl.secretbox message, nonce, key

      # Lock the key
      lockedKey = await kmsEncrypt kmsKey, key, "buffer"

      # Return a blob of base64 to the outer layer.
      Buffer.from JSON.stringify {ciphertext, nonce, lockedKey}
      .toString("base64")

    decrypt = (blob, encoding="utf8") ->
      # Extract data from the blob for decryption.
      {ciphertext, nonce, lockedKey} =
        JSON.parse Buffer.from(blob, "base64").toString()
      ciphertext = Buffer.from ciphertext.data
      nonce = Buffer.from nonce.data

      # Unlock the key.
      key = await kmsDecrypt lockedKey, "buffer"

      # Return the decrypted the message.
      if encoding == "buffer"
        Buffer.from nacl.secretbox.open ciphertext, nonce, key
      else
        Buffer.from nacl.secretbox.open(ciphertext, nonce, key)
        .toString encoding

    {encrypt, decrypt}

export default secretBox

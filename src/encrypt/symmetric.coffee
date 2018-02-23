import nacl from "tweetnacl"
import {decodePlaintext} from "../utils"

SymmetricEncrypt = (KMS) ->
  # Access to the KMS API via sundog.
  {randomKey, encrypt:kmsEncrypt, decrypt:kmsDecrypt} = KMS

  # Length in bytes
  keyLength = 32
  nonceLength = 24

  (kmsKey, message, encoding) ->
    # Get key + nonce from KMS's robust source of entropy.
    random = await randomKey (keyLength + nonceLength), "buffer"
    key = random.slice 0, keyLength
    nonce = random.slice keyLength
    message = decodePlaintext message, encoding

    # Encrypt the message. Convert from UInt8Array to Buffer.
    ciphertext = Buffer.from nacl.secretbox message, nonce, key

    # Lock the key
    lockedKey = await kmsEncrypt kmsKey, key, "buffer"

    # Return a blob of base64 to the outer layer.
    Buffer.from JSON.stringify {ciphertext, nonce, lockedKey}
    .toString("base64")


export default SymmetricEncrypt

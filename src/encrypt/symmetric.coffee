import nacl from "tweetnacl"
import {decodePlaintext, encode} from "../utils"
keyLength = 32    # Constant byte length specified by TweetNaCl
nonceLength = 24  # Constant byte length specified by TweetNaCl

SymmetricEncrypt = ({randomKey, encrypt:kmsEncrypt}) ->
  (kmsKey, message, encoding) ->
    # Get key + nonce from KMS's robust source of entropy.
    random = await randomKey (keyLength + nonceLength), "buffer"
    key = random.slice 0, keyLength
    nonce = random.slice keyLength
    message = decodePlaintext message, encoding

    # Encrypt the message. Convert from UInt8Array to Buffer.
    ciphertext = encode "buffer", nacl.secretbox message, nonce, key

    # Lock the key
    lockedKey = await kmsEncrypt kmsKey, key, "buffer"

    # Return a blob of base64 to the outer layer.
    encode "base64", JSON.stringify {ciphertext, nonce, lockedKey}


export default SymmetricEncrypt

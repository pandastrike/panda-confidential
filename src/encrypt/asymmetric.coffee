import nacl from "tweetnacl"
import {decodeKey, decodePlaintext} from "../utils"

AsymmetricEncrypt = (KMS) ->
  {randomKey} = KMS
  nonceLength = 24

  (sharedKey, message, encoding) ->
    # Generate nonce from KMS's robust source of randomness.
    nonce = await randomKey nonceLength, "buffer"
    sharedKey = decodeKey sharedKey
    message = decodePlaintext message, encoding

    # Encrypt the message. Convert from UInt8Array to Buffer.
    ciphertext = Buffer.from nacl.box.after message, nonce, sharedKey

    # Return a blob of base64 to the outer layer.
    Buffer.from JSON.stringify {ciphertext, nonce}
    .toString("base64")

export default AsymmetricEncrypt

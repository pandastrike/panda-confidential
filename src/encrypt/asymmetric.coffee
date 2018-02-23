import nacl from "tweetnacl"
import {decodeKey, decodePlaintext, encode} from "../utils"
nonceLength = 24  # Constant byte length specified by TweetNaCl

AsymmetricEncrypt = ({randomKey}) ->
  (sharedKey, message, encoding) ->
    # Generate nonce from KMS's robust source of randomness.
    nonce = await randomKey nonceLength, "buffer"
    sharedKey = decodeKey sharedKey
    message = decodePlaintext message, encoding

    # Encrypt the message. Convert from UInt8Array to Buffer.
    ciphertext = encode "buffer", nacl.box.after message, nonce, sharedKey

    # Return a blob of base64 to the outer layer.
    encode "base64", JSON.stringify {ciphertext, nonce}

export default AsymmetricEncrypt

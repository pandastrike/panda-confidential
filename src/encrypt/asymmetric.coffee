import nacl from "tweetnacl"
import {decode, encodeCiphertext} from "../utils"
{nonceLength} = nacl.box

AsymmetricEncrypt = (randomBytes) ->
  ({key}, message, encoding) ->
    # Generate nonce from KMS's robust source of randomness.
    nonce = await randomBytes nonceLength, "buffer"
    message = decode encoding, message

    # Encrypt the message.
    ciphertext = nacl.box.after message, nonce, key

    # Return a blob of base64 to the outer layer.
    encodeCiphertext {ciphertext, nonce}

export default AsymmetricEncrypt

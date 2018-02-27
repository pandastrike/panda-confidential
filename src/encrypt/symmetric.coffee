import nacl from "tweetnacl"
import {decode, encodeCiphertext} from "../utils"
{nonceLength} = nacl.secretbox

SymmetricEncrypt = (randomBytes) ->
  ({key}, message, encoding) ->
    # Get key + nonce from KMS's robust source of entropy.
    nonce = await randomBytes nonceLength
    message = decode encoding, message

    # Encrypt the message.
    ciphertext = nacl.secretbox message, nonce, key

    # Return a blob of base64 to the outer layer.
    encodeCiphertext {ciphertext, nonce}


export default SymmetricEncrypt

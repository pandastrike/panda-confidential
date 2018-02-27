import nacl from "tweetnacl"
import {decode, encodeCiphertext} from "../utils"
{nonceLength, keyLength} = nacl.secretbox

SymmetricEncrypt = (randomBytes, {encrypt}) ->
  (input, message, encoding) ->
    # Get key + nonce from KMS's robust source of entropy.
    random = await randomBytes (keyLength + nonceLength)
    key = random.slice 0, keyLength
    nonce = random.slice keyLength
    message = decode encoding, message

    # Encrypt the message.
    ciphertext = nacl.secretbox message, nonce, key

    # Lock the key
    lockedKey = await encrypt input, key

    # Return a blob of base64 to the outer layer.
    encodeCiphertext {ciphertext, nonce, lockedKey}


export default SymmetricEncrypt

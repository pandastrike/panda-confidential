import nacl from "tweetnacl"
import {decode, encodeCiphertext} from "../utils"
{nonceLength, keyLength} = nacl.secretbox

SymmetricEncrypt = ({randomKey, encrypt:kmsEncrypt}) ->
  ({id:kmsKeyID}, message, encoding) ->
    # Get key + nonce from KMS's robust source of entropy.
    random = await randomKey (keyLength + nonceLength), "buffer"
    key = random.slice 0, keyLength
    nonce = random.slice keyLength
    message = decode encoding, message

    # Encrypt the message. Convert from UInt8Array to Buffer.
    ciphertext = nacl.secretbox message, nonce, key

    # Lock the key
    lockedKey = await kmsEncrypt kmsKeyID, key, "buffer"

    # Return a blob of base64 to the outer layer.
    encodeCiphertext {ciphertext, nonce, lockedKey}


export default SymmetricEncrypt

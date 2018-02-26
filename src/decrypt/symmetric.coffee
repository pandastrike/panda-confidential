import nacl from "tweetnacl"
import {decodeCiphertext, encode} from "../utils"

SymmetricDecrypt = ({decrypt:kmsDecrypt}) ->
  (blob, encoding) ->
    # Extract data from the blob for decryption.
    {ciphertext, nonce, lockedKey} = decodeCiphertext blob

    # Unlock the key. KMS's ciphertext has an internal KeyID reference.
    key = await kmsDecrypt lockedKey, "buffer"

    # Return the decrypted the message.
    encode encoding, nacl.secretbox.open ciphertext, nonce, key

export default SymmetricDecrypt

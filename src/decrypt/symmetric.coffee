import nacl from "tweetnacl"
import {decodeCiphertext, encodeIntArray} from "../utils"

SymmetricDecrypt = (KMS) ->
  # Access to the KMS API via sundog.
  {decrypt:kmsDecrypt} = KMS

  (kmsKey, blob, encoding) ->
    # Extract data from the blob for decryption.
    {ciphertext, nonce, lockedKey} = decodeCiphertext blob

    # Unlock the key.
    key = await kmsDecrypt lockedKey, "buffer"

    # Return the decrypted the message.
    encode = encodeIntArray encoding
    encode nacl.secretbox.open ciphertext, nonce, key

export default SymmetricDecrypt

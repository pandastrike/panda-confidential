import nacl from "tweetnacl"
import {decodeCiphertext, encode} from "../utils"

SymmetricDecrypt = ({decrypt}) ->
  (input, blob, encoding) ->
    # Extract data from the blob for decryption.
    {ciphertext, nonce, lockedKey} = decodeCiphertext blob

    # Unlock the key with external service.
    key = await decrypt input, lockedKey

    # Return the decrypted the message.
    encode encoding, nacl.secretbox.open ciphertext, nonce, key

export default SymmetricDecrypt

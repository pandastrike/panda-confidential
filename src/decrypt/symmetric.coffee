import nacl from "tweetnacl"
import {decodeCiphertext, encode} from "../utils"

SymmetricDecrypt = ({key}, blob, encoding) ->
  # Extract data from the blob for decryption.
  {ciphertext, nonce} = decodeCiphertext blob

  # Return the decrypted the message.
  encode encoding, nacl.secretbox.open ciphertext, nonce, key

export default SymmetricDecrypt

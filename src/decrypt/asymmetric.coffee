import nacl from "tweetnacl"
import {decodeCiphertext, decodeKey, encode} from "../utils"

AsymmetricDecrypt = ({key}, blob, encoding) ->
  # Extract data from the blob for decryption.
  {ciphertext, nonce} = decodeCiphertext blob

  # Return the decrypted the message.
  encode encoding, nacl.box.open.after ciphertext, nonce, key

export default AsymmetricDecrypt

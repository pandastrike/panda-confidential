import nacl from "tweetnacl"
import {decodeCiphertext, decodeKey, encodeIntArray} from "../utils"

AsymmetricDecrypt = ->

  (sharedKey, blob, encoding) ->
    # Extract data from the blob for decryption.
    {ciphertext, nonce} = decodeCiphertext blob
    sharedKey = decodeKey sharedKey

    # Return the decrypted the message.
    encode = encodeIntArray encoding
    encode nacl.box.open.after ciphertext, nonce, sharedKey

export default AsymmetricDecrypt

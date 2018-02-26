import nacl from "tweetnacl"
import {decode, encodeCiphertext} from "../utils"
import {encryption} from "../constants"
{nonceLength} = encryption.asymmetric

AsymmetricEncrypt = ({randomKey}) ->
  ({key}, message, encoding) ->
    # Generate nonce from KMS's robust source of randomness.
    nonce = await randomKey nonceLength, "buffer"
    message = decode encoding, message

    # Encrypt the message. Convert from UInt8Array to Buffer.
    ciphertext = nacl.box.after message, nonce, key

    # Return a blob of base64 to the outer layer.
    encodeCiphertext {ciphertext, nonce}

export default AsymmetricEncrypt

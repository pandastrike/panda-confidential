import nacl from "tweetnacl"
import {decodeKey, decodePlaintext, encode} from "../utils"

_verify = (message, key, sig) ->
  key = decodeKey key
  sig = decodePlaintext sig, "base64"
  nacl.sign.detached.verify message, sig, key

verify = ({message, encoding, publicKeys, signatures}) ->
  if publicKeys.length != signatures.length
    return false

  # Run through list of signatures and public keys and verify.
  message = decodePlaintext message, "base64"
  for i in [0..publicKeys.length]
    return false unless _verify message, publicKeys[i], signatures[i]

  # Verification completed successfully.  Return originally encoded message.
  encode encoding, message

export {verify}

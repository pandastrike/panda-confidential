import nacl from "tweetnacl"
import {decodeKey, decodePlaintext, encode} from "../utils"

sign = (privateKey, publicKey, message, encoding) ->
  key = decodeKey privateKey
  message = decodePlaintext message, encoding

  # Return a blob of base64 to the outer layer.
  encode "base64", JSON.stringify
    message: encode "base64", message
    encoding: encoding
    publicKeys: [publicKey.key]
    signatures: [encode "base64", nacl.sign.detached message, key]


addSignature = (privateKey, publicKey, signedMessage) ->
  key = decodeKey privateKey
  message = decodePlaintext signedMessage.message, "base64"

  signedMessage.publicKeys.push publicKey.key
  signedMessage.signatures.push encode "base64", nacl.sign.detached message, key

  # Return a blob of base64 to the outer layer.
  encode "base64", JSON.stringify signedMessage


export {sign, addSignature}

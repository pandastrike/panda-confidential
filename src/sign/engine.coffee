import nacl from "tweetnacl"
import {decodeKey, decodePlaintext, encode} from "../utils"

enforceBase64 = (key) -> encode "base64", (decodeKey key)

sign = (privateKey, publicKey, message, encoding) ->
  key = decodeKey privateKey
  message = decodePlaintext message, encoding

  message: encode "base64", message
  encoding: encoding
  publicKeys: [enforceBase64 publicKey]
  signatures: [encode "base64", nacl.sign.detached message, key]


addSignature = (privateKey, publicKey, signedMessage) ->
  key = decodeKey privateKey
  message = decodePlaintext signedMessage.message, "base64"

  signedMessage.publicKeys.push enforceBase64 publicKey
  signedMessage.signatures.push encode "base64", nacl.sign.detached message, key
  signedMessage


export {sign, addSignature}

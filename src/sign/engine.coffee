import nacl from "tweetnacl"
import {signedMessage} from "../signed-message"
import {decode} from "../utils"

sign = ({key:privateKey}, {key:publicKey}, message, encoding) ->
  message = decode encoding, message

  signedMessage
    message: message
    encoding: encoding
    publicKeys: [publicKey]
    signatures: [nacl.sign.detached message, privateKey]


addSignature = ({key:privateKey}, {key:publicKey}, signedMessage) ->
  {message} = signedMessage
  signedMessage.publicKeys.push publicKey
  signedMessage.signatures.push nacl.sign.detached message, privateKey
  signedMessage


export {sign, addSignature}

import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"

publicKeyTest = (SDK) -> ->
  {Signature} = Confidential SDK

  # Test Key Pair Generation
  {privateKey, publicKey} = await Signature.generateKeyPair()
  assert privateKey, "failed to generate private key"
  assert publicKey, "failed to generate public key"
  assert (Buffer.from(privateKey, "base64").length == 64),
    "private key is improper length"
  assert (Buffer.from(publicKey, "base64").length == 32),
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  A = {privateKey, publicKey}
  message = "Hello World!"

  # Person A signs the message.
  # signedMessage = Signature.sign A.privateKey, message
  # assert (signedMessage && signedMessage != message),
  #   "failed to create a signed message"
  # console.log "signed message", signedMessage
  # # Person B uses A's public key to verify and open the message.
  # output = Signature.open A.publicKey, signedMessage
  # assert.equal message, output, "failed to verify"

  # Person A generates a detatched signature.
  signature = Signature.generate A.privateKey, message
  assert (signature && signature != message),
    "failed to create a signature message"
  console.log "signature", signature
  console.log "message", Buffer.from(message, "utf8").length
  console.log Buffer.from(signature, "base64").length
  # Person B verifies the message.
  output = Signature.verify A.publicKey, signature, message
  console.log "output", output
  assert (output == true), "failed to verify"


export default publicKeyTest

import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"

Signature = ->
  {sign, verify, key, keyPair, isSignedMessage, nacl} = confidential()

  # Test Key Pair Generation
  A = {privateKey, publicKey} = await keyPair.Signature()
  assert (privateKey && key.isPrivateKey privateKey), "must make private key"
  assert (publicKey && key.isPublicKey publicKey), "must make public key"
  assert privateKey.key.length == nacl.sign.secretKeyLength,
    "private key is improper length"
  assert publicKey.key.length == nacl.sign.publicKeyLength,
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  B = await keyPair.Signature()
  message = "Hello World!"

  ## Case 1
  ################################
  # Person A signs a message.
  signedMsg = sign A.privateKey, A.publicKey, message
  assert (signedMsg && isSignedMessage signedMsg), "bad signature"
  assert signedMsg.dumpMessage() == message, "message must be the same"

  # Person B uses A's public key to verify and open the message.
  output = verify signedMsg
  assert output == true, "failed to verify"


  ## Case 2
  ################################
  # Person A and B sign a message with key pairs.
  signedMsg = sign A, message
  signedMsg = sign B, signedMsg
  assert (signedMsg && isSignedMessage signedMsg), "bad signature"
  assert signedMsg.dumpMessage() == message, "message must be the same"

  # Person C verifies the message from both.
  output = verify signedMsg
  assert output == true, "failed to verify"

  ## Case 3
  ################################
  # Person D recieves a base64 encoded blob of the signed message and verifies.
  blob = signedMsg.dump()
  output = verify blob
  assert output == true, "failed to verify"

export default Signature

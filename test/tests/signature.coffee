import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"
import {isSignedMessage, isPrivateKey, isPublicKey} from "../../src/types"

Signature = (SDK) -> ->
  {sign, verify, KeyPair, SignedMessage} = Confidential SDK

  # Test Key Pair Generation
  {privateKey, publicKey} = await KeyPair.generate "sign"
  assert privateKey, "failed to generate private key"
  assert publicKey, "failed to generate public key"
  assert (Buffer.from(privateKey.key, "base64").length == 64),
    "private key is improper length"
  assert (Buffer.from(publicKey.key, "base64").length == 32),
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  A = {privateKey, publicKey}
  B = await KeyPair.generate "sign"
  message = "Hello World!"

  ## Case 1
  ################################
  # Person A signs a message.
  signedMessage = sign A.privateKey, A.publicKey, message
  assert (signedMessage && signedMessage != message),
    "failed to create a signed message"

  # Person B uses A's public key to verify and open the message.
  output = verify signedMessage
  assert.equal message, output, "failed to verify"


  ## Case 2
  ################################
  # Person A and B sign a message.
  signedMessage = sign A.privateKey, A.publicKey, message
  signedMessage = sign B.privateKey, B.publicKey, signedMessage
  assert (signedMessage && signedMessage != message),
    "failed to create a signed message"

  # Person C verifies the message from both.
  output = verify signedMessage
  assert.equal output, message, "failed to verify"


export default Signature

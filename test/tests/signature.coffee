import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"
import {isSignedMessage, isPrivateKey, isPublicKey} from "../../src/classes"

Signature = (SDK) -> ->
  {sign, verify, keyPair, signedMessage} = Confidential SDK

  # Test Key Pair Generation
  A = {privateKey, publicKey} = await keyPair "sign"
  assert (privateKey && isPrivateKey privateKey), "must make private key"
  assert (publicKey && isPublicKey publicKey), "must make public key"
  assert privateKey.key.length == 64, "private key is improper length"
  assert publicKey.key.length == 32, "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  B = await keyPair "sign"
  message = "Hello World!"

  ## Case 1
  ################################
  # Person A signs a message.
  signedMessage = sign A.privateKey, A.publicKey, message
  assert (signedMessage && signedMessage != message), "bad signature"
  assert signedMessage.dumpMessage() == message, "message must be the same"

  # Person B uses A's public key to verify and open the message.
  output = verify signedMessage
  assert output == true, "failed to verify"


  ## Case 2
  ################################
  # Person A and B sign a message with key pairs.
  signedMessage = sign A, message
  signedMessage = sign B, signedMessage
  assert (signedMessage && signedMessage != message), "bad signature"
  assert signedMessage.dumpMessage() == message, "message must be the same"

  # Person C verifies the message from both.
  output = verify signedMessage
  assert output == true, "failed to verify"


export default Signature

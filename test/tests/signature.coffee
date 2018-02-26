import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"
import {isSignedMessage, isPrivateKey, isPublicKey} from "../../src/classes"
import nacl from "tweetnacl"

Signature = (SDK) -> ->
  {sign, verify, keyPair, signedMessage} = Confidential SDK

  # Test Key Pair Generation
  A = {privateKey, publicKey} = await keyPair "sign"
  assert (privateKey && isPrivateKey privateKey), "must make private key"
  assert (publicKey && isPublicKey publicKey), "must make public key"
  assert privateKey.key.length == nacl.sign.secretKeyLength,
    "private key is improper length"
  assert publicKey.key.length == nacl.sign.publicKeyLength,
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  B = await keyPair "sign"
  message = "Hello World!"

  ## Case 1
  ################################
  # Person A signs a message.
  signedMsg = sign A.privateKey, A.publicKey, message
  assert (signedMsg && signedMsg != message), "bad signature"
  assert signedMsg.dumpMessage() == message, "message must be the same"

  # Person B uses A's public key to verify and open the message.
  output = verify signedMsg
  assert output == true, "failed to verify"


  ## Case 2
  ################################
  # Person A and B sign a message with key pairs.
  signedMsg = sign A, message
  signedMsg = sign B, signedMsg
  assert (signedMsg && signedMsg != message), "bad signature"
  assert signedMsg.dumpMessage() == message, "message must be the same"

  # Person C verifies the message from both.
  output = verify signedMsg
  assert output == true, "failed to verify"

  ## Case 3
  ################################
  # Person D recieves a base64 encoded blob of the signed message and verifies.
  blob = signedMsg.dump()
  signedMsg = signedMessage blob
  output = verify signedMsg
  assert output == true, "failed to verify"


export default Signature

import assert from "assert"

Signature = ({sign, verify, key, keyPair, isSignedMessage, nacl}) -> ->
  # Test Key Pair Generation
  A = {privateKey, publicKey} = await keyPair.signature()
  assert (privateKey && key.isPrivate privateKey), "must make private key"
  assert (publicKey && key.isPublic publicKey), "must make public key"
  assert privateKey.key.length == nacl.sign.secretKeyLength,
    "private key is improper length"
  assert publicKey.key.length == nacl.sign.publicKeyLength,
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  B = await keyPair.signature()
  message = "Hello World!"

  ## Case 1
  ################################
  # Person A signs a message.
  signedMsg = sign A.privateKey, A.publicKey, message
  assert (signedMsg && isSignedMessage signedMsg), "bad signature"
  assert signedMsg.encodeMessage() == message, "message must be the same"

  # Person B uses A's public key to verify and open the message.
  output = verify signedMsg
  assert output == true, "failed to verify"
  assert key.equal(signedMsg.publicKeys[0], A.publicKey), "public key is wrong"

  ## Case 2
  ################################
  # Person A and B sign a message with key pairs.
  signedMsg = sign A, message
  signedMsg = sign B, signedMsg
  assert (signedMsg && isSignedMessage signedMsg), "bad signature"
  assert signedMsg.encodeMessage() == message, "message must be the same"
  assert key.equal(signedMsg.publicKeys[0], A.publicKey), "public key is wrong"
  assert key.equal(signedMsg.publicKeys[1], B.publicKey), "public key is wrong"

  # Person C verifies the message from both.
  output = verify signedMsg
  assert output == true, "failed to verify"

  ## Case 3
  ################################
  # Person D recieves a base64 encoded blob of the signed message and verifies.
  blob = signedMsg.encode()
  output = verify blob
  assert output == true, "failed to verify"

export default Signature

import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"

sharedKeyTest = (SDK) -> ->
  {SharedPublicKey} = Confidential SDK

  # Test key pair generation on Shared API
  {privateKey, publicKey} = await SharedPublicKey.generateKeyPair()
  assert privateKey, "failed to generate private key"
  assert publicKey, "failed to generate public key"
  assert (Buffer.from(privateKey, "base64").length == 32),
    "private key is improper length"
  assert (Buffer.from(publicKey, "base64").length == 32),
    "public key is improper length"

  # Test shared key generation
  A = {privateKey, publicKey}
  B = await SharedPublicKey.generateKeyPair()
  A.sharedKey = SharedPublicKey.generateKey B.publicKey, A.privateKey

  assert A.sharedKey, "failed to generate shared key"
  assert (Buffer.from(A.sharedKey, "base64").length == 32),
    "shared key is improper length"

  B.sharedKey = SharedPublicKey.generateKey A.publicKey, B.privateKey
  assert.equal A.sharedKey, B.sharedKey, "shared keys are not identical"


  # Test Encrypt - Decrypt Cycle
  message = "Hello World!"

  # Person A encrypts the message for person B.
  cipher = await SharedPublicKey.encrypt A.sharedKey, message
  assert (cipher && message != cipher), "failed to create a ciphertext"

  # Person B gets the cipher and decrypts the message.
  output = SharedPublicKey.decrypt B.sharedKey, cipher
  assert.equal message, output, "failed to decrypt"

export default sharedKeyTest

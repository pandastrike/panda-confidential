import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"

secretKeyTest = (SDK) -> ->
  {PublicKey} = Confidential SDK

  # Test Key Pair Generation
  {privateKey, publicKey} = await PublicKey.generateKeyPair()
  assert privateKey, "failed to generate secret key"
  assert publicKey, "failed to generate public key"
  assert (Buffer.from(privateKey, "base64").length == 32),
    "secret key is improper length"
  assert (Buffer.from(publicKey, "base64").length == 32),
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  A = {privateKey, publicKey}
  B = await PublicKey.generateKeyPair()
  message = "Hello World!"

  # Person A encrypts the message for person B.
  cipher = await PublicKey.encrypt B.publicKey, A.privateKey, message
  assert (message != cipher), "failed to create a ciphertext"

  # Person B gets the cipher and decrypts the message.
  output = PublicKey.decrypt A.publicKey, B.privateKey, cipher
  assert.equal message, output, "failed to decrypt"

export default secretKeyTest

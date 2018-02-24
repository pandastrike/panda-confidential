import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"

asymmetric = (SDK) -> ->
  {KeyPair, encrypt, decrypt} = Confidential SDK

  # Test Key Pair Generation
  {privateKey, publicKey} = await KeyPair.generate "encrypt"
  assert privateKey, "failed to generate private key"
  assert publicKey, "failed to generate public key"
  assert (Buffer.from(privateKey.key, "base64").length == 32),
    "private key is improper length"
  assert (Buffer.from(publicKey.key, "base64").length == 32),
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  A = {privateKey, publicKey}
  B = await KeyPair.generate "encrypt"
  message = "Hello World!"

  # Person A encrypts the message for person B.
  cipher = await encrypt A.privateKey, B.publicKey, message
  assert (cipher && message != cipher), "failed to create a ciphertext"

  # Person B gets the cipher and decrypts the message.
  output = await decrypt B.privateKey, A.publicKey, cipher
  assert.equal message, output, "failed to decrypt"

export default asymmetric

import assert from "assert"
import Confidential from "../../src/index"
import kmsKeyName from "../key-name"

symmetric = (SDK) -> ->
  # Setup for encryption
  {encrypt, decrypt, kmsKeyID} = Confidential SDK
  keyID = kmsKeyID kmsKeyName
  message = "Hello World!"

  # Person A symmetrically encrypts their data.
  cipher = await encrypt keyID, message
  assert (cipher && message != cipher), "must create a ciphertext"

  # Person A later decrypts that ciphertext.
  output = await decrypt cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric

import assert from "assert"
import Confidential from "../../src/index"
import kmsKeyName from "../key-name"

symmetric = (SDK) -> ->
  # Setup for encryption
  {encrypt, decrypt, KMSKey} = Confidential SDK
  key = new KMSKey kmsKeyName
  message = "Hello World!"

  # Person A symmetrically encrypts their data.
  cipher = await encrypt key, message
  assert (cipher && message != cipher), "must create a ciphertext"
  output = await decrypt key, cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric

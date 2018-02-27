import assert from "assert"
import Confidential from "../../../src/index"
import kmsKeyName from "../../key-name"

symmetric = ->
  # Setup for encryption
  {encrypt, decrypt, privateKey} = Confidential()

  # Generate symmetric key of correct length that should be saved.
  key = await privateKey()

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  cipher = await encrypt key, message
  assert (cipher && message != cipher), "must create a ciphertext"

  # Person A later decrypts that ciphertext.
  output = await decrypt key, cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric

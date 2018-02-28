import assert from "assert"
import kmsKeyName from "../../key-name"

symmetric = ({encrypt, decrypt, key}) -> ->
  # Generate symmetric key of correct length that should be saved.
  KEY = await key.Private()
  assert (KEY && key.isPrivateKey KEY), "bad key"

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  cipher = await encrypt KEY, message
  assert (cipher && message != cipher), "must create a ciphertext"

  # Person A later decrypts that ciphertext.
  output = await decrypt KEY, cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric
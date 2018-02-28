import assert from "assert"
import kmsKeyName from "../../key-name"

import {kmsKeyID, isKMSKeyID} from "./kms-key"

symmetric = ({encrypt, decrypt}) -> ->
  # Create our custom key class to pass into Confidential.
  keyID = kmsKeyID kmsKeyName
  assert (keyID && isKMSKeyID keyID), "bad key"

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  cipher = await encrypt keyID, message
  assert (cipher && message != cipher), "must create a ciphertext"

  # Person A later decrypts that ciphertext.
  output = await decrypt keyID, cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric

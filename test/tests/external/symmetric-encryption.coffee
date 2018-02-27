import assert from "assert"
import Confidential from "../../../src/index"
import kmsKeyName from "../../key-name"

import {kmsKeyID} from "./kms-key"

symmetric = (externalInterface) -> ->
  # Setup for encryption
  {encrypt, decrypt} = Confidential externalInterface

  # Create our custom key class to pass into Confidential.
  keyID = kmsKeyID kmsKeyName

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  cipher = await encrypt keyID, message
  assert (cipher && message != cipher), "must create a ciphertext"

  # Person A later decrypts that ciphertext.
  output = await decrypt keyID, cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric

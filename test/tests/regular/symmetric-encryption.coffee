import assert from "assert"
import {confidential} from "../../../src/index"
import {isPrivateKey} from "../../../src/keys"
import kmsKeyName from "../../key-name"

symmetric = ->
  # Setup for encryption
  {encrypt, decrypt, key} = confidential()

  # Generate symmetric key of correct length that should be saved.
  key = await key.Private()
  assert (key && isPrivateKey key), "bad key"

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  cipher = await encrypt key, message
  assert (cipher && message != cipher), "must create a ciphertext"

  # Person A later decrypts that ciphertext.
  output = await decrypt key, cipher
  assert.equal message, output, "failed to decrypt"

export default symmetric

import assert from "assert"
import Confidential from "../../src/index"
import kmsKeyName from "../key-name"

secretKeyTest = (SDK) -> ->
  {SecretKey} = Confidential SDK
  box = SecretKey kmsKeyName

  message = "Hello World!"
  cipher = await box.encrypt message
  assert (cipher && message != cipher), "created a ciphertext"
  output = await box.decrypt cipher
  assert.equal message, output, "failed to decrypt"

export default secretKeyTest

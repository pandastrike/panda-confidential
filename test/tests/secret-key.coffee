import assert from "assert"
import Confidential from "../../src/index"
import kmsKeyName from "../key-name"

secretKeyTest = (SDK) ->
  {secretKey} = Confidential SDK
  box = secretKey kmsKeyName

  message = "Hello World!"
  cipher = await box.encrypt message
  assert (message != cipher), "created a ciphertext"
  output = await box.decrypt cipher
  assert.equal message, output, "failed to decrypt"

export default secretKeyTest

import assert from "assert"
import Confidential from "../../src/index"
import kmsKeyName from "../key-name"

import {isKMSKey, isKey} from "../../src/utils"

secretKeyTest = (SDK) -> ->
  # Setup for encryption
  try
    {encrypt, decrypt, KMSKey} = Confidential SDK
    key = new KMSKey kmsKeyName
    message = "Hello World!"

    console.log "foooo", key
    console.log "fooooo", key.prototype
    process.exit()

    # Person A symmetrically encrypts their data.
    cipher = await encrypt key, message
    assert (cipher && message != cipher), "must create a ciphertext"
    output = await decrypt key, cipher
    assert.equal message, output, "failed to decrypt"
  catch e
   console.log e

export default secretKeyTest

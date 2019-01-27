import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"

HashTest = ->
  {hash, Hash, Message} = confidential()

  string = "Hello, World!"
  message = Message.from "utf8", string

  # Perform SHA-512 hash.
  hashResult = hash message

  assert (Hash.isType hashResult), "bad hash"
  assert.equal(
    hashResult.to "base64"
    "N015SpXNz9izWZMYX++bo2jxYNja9DLQi6nx7R5avmzGkpHg+i/gAGpSVw7xjBne9OYXwzzlLvCm5fvjGMsDhw=="
    "bad hash result"
  )

export default HashTest

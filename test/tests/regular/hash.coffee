import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"

HashTest = ->
  {hash, Hash, Plaintext} = confidential()

  message = "Hello World!"
  plaintext = Plaintext.from "utf8", message

  # Perform SHA-512 hash.
  hashResult = hash plaintext

  assert (Hash.isType hashResult), "bad hash"
  assert.equal(
    hashResult.to "base64"
    "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA=="
    "bad hash result"
  )

export default HashTest

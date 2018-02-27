import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../../src/index"

Hash = ->
  {hash} = Confidential()

  message = "Hello World!"
  expectedOutput = "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA=="

  output = hash message
  assert.equal output, expectedOutput, "Unexpected hash result"

export default Hash

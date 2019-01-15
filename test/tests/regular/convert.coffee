import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"

Test = ->
  {convert} = confidential()

  compose = ([string, transformations...]) ->
    string = convert transform, string for transform in transformations
    string

  final = compose [
    "Hello, World!"
    {from: "utf8", to: "bytes"}
    {from: "bytes", to: "base64"}
    {from: "base64", to: "bytes"}
    {from: "bytes", to: "safe-base64"}
    {from: "safe-base64", to: "bytes"}
    {from: "bytes", to: "utf8"}
  ]

  assert.equal final, "Hello, World!", "bad convert"

export default Test

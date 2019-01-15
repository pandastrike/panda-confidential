import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"

compose = (list) ->
  [context, transformations...] = list
  for transform in transformations
    context.message = transform context.message
  context.message

Test = ->
  {convert} = confidential()
  _convert = (hint) ->
    (data) -> convert hint, data

  message = "Hello, World!"

  final = compose [
    {message}
    _convert from: "utf8", to: "bytes"
    _convert from: "bytes", to: "base64"
    _convert from: "base64", to: "bytes"
    _convert from: "bytes", to: "safe-base64"
    _convert from: "safe-base64", to: "bytes"
    _convert from: "bytes", to: "utf8"
  ]

  assert.equal final, message, "bad convert"

export default Test

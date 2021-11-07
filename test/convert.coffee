import { pipe } from "@dashkite/joy/function"
import assert from "@dashkite/assert"
import { test } from "@dashkite/amen"
import nacl from "@dashkite/tweetnacl"

convert = do (
  plaintext = "Hello, World!"
  representations = {}
) ->

  ($) ->

    tests = []

    for _from in $.supportedEncodings
      for _to in $.supportedEncodings when _from != _to
        representations[_from] ?= $.convert from: "utf8", to: _from, plaintext
        tests.push test "#{_from} -> #{_to} (-> utf8)", ->
          _result = $.convert from: _from, to: _to, representations[_from]
          assert.equal plaintext,
            if _to == "utf8"
             _result
            else
              $.convert from: _to, to: "utf8", _result
    
    tests

export default convert
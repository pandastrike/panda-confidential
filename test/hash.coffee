import assert from "@dashkite/assert"
import { test } from "@dashkite/amen"
import nacl from "tweetnacl"

hash = do ({
  plaintext
  message
  digest
  payload
} = {}) ->

  ($) ->

    [

      test "create a hash", ->
        plaintext = "Hello, World!"
        message = $.Message.from "utf8", plaintext
        digest = $.hash message
        assert $.Hash.isType digest

      test "serialize hash", ->
        payload = digest.to "base64"
        assert.equal payload,
          "N015SpXNz9izWZMYX++bo2jxYNja9D\
            LQi6nx7R5avmzGkpHg+i/gAGpSVw7\
            xjBne9OYXwzzlLvCm5fvjGMsDhw=="

    ]

export default hash

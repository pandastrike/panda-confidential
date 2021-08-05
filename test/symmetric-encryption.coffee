import assert from "@dashkite/assert"
import { test } from "@dashkite/amen"
import nacl from "@dashkite/tweetnacl"

symmetric = do ({
  plaintext
  message
  envelope
  channel
  payload
} = {}) ->

  ($) ->

    [

      await test "generate symmetric key", ->
        channel = await $.SymmetricKey.create()
        assert $.SymmetricKey.isType channel

      test "create message", ->
        plaintext = "Hello, World!"
        message = $.Message.from "utf8", plaintext
        assert $.Message.isType message

      await test "create envelope", ->
        envelope = await $.encrypt channel, message
        assert $.Envelope.isType envelope

      test "serialize envelope", ->
        payload = envelope.to "base64"

      test "deserialize envelope", ->
        envelope = $.Envelope.from "base64", payload
        assert $.Envelope.isType envelope

      test "recover message", ->
        message = $.decrypt channel, envelope
        assert $.Message.isType message
        assert.equal plaintext, message.to "utf8"

      test "can't recover with different key", ->
        channel = await $.SymmetricKey.create()
        assert.throws ->
          $.decrypt channel, envelope

    ]

export default symmetric

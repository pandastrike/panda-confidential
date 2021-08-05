import assert from "@dashkite/assert"
import { test } from "@dashkite/amen"
import nacl from "@dashkite/tweetnacl"

asymmetric = do ({
  alice
  bob
  eve
  plaintext
  message
  envelope
  channel
  payload
} = {}) ->

  ($) ->

    [

      await test "generate encryption key pair", ->
        alice = await $.EncryptionKeyPair.create()
        assert $.PrivateKey.isType alice.privateKey
        assert $.PublicKey.isType alice.publicKey

      test  "private key is expected length", ->
        assert.equal nacl.box.secretKeyLength,
          alice.privateKey.key.length  

      test "public key is expected length", ->
        assert.equal nacl.box.publicKeyLength,
          alice.publicKey.key.length

      test "create message", ->
        plaintext = "Hello, Alice!"
        message = $.Message.from "utf8", plaintext
        assert $.Message.isType message

      await test "create shared channel", ->
        bob = await $.EncryptionKeyPair.create()
        channel = $.SharedKey.create bob.privateKey, alice.publicKey
        assert $.SharedKey.isType channel

      test "shared key is expected length", ->
        assert.equal nacl.box.sharedKeyLength,
          channel.key.length

      await test "create envelope", ->
        envelope = await $.encrypt channel, message
        assert $.Envelope.isType envelope

      test "serialize envelope", ->
        payload = envelope.to "base64"

      test "deserialize envelope", ->
        envelope = $.Envelope.from "base64", payload
        assert $.Envelope.isType envelope

      test "recreate shared channel", ->
        _channel = channel
        channel = $.SharedKey.create alice.privateKey, bob.publicKey
        assert $.SharedKey.isType channel
        assert.equal (_channel.to "base64"), (channel.to "base64")

      test "recover message", ->
        message = $.decrypt channel, envelope
        assert $.Message.isType message
        assert.equal plaintext, message.to "utf8"

      test "can't decrypt with another key", ->
        eve = await $.EncryptionKeyPair.create()
        assert.throws ->
          channel = $.SharedKey.create alice.publicKey, eve.privateKey
          $.decrypt channel, envelope

  ]

export default asymmetric

import assert from "@dashkite/assert"
import { test } from "@dashkite/amen"
import nacl from "@dashkite/tweetnacl"

signature = do ({
  alice
  bob
  mallory
  plaintext
  message
  declaration
  payload
} = {}) ->

  ($) ->

    [
      
      await test "generate signature key pair", ->
        alice = await $.SignatureKeyPair.create()
        assert $.PrivateKey.isType alice.privateKey
        assert $.PublicKey.isType alice.publicKey

      test "keys are expected length", ->
        assert.equal nacl.sign.secretKeyLength,
          alice.privateKey.key.length
        assert.equal nacl.sign.publicKeyLength,
          alice.publicKey.key.length

      test "alice signs a message", ->
        plaintext = "Hello, World!"
        # this is tested in encryption scenarios
        message = $.Message.from "utf8", plaintext
        declaration = $.sign alice, message
        assert $.Declaration.isType declaration
        assert.equal plaintext,
          message.to "utf8"
        assert.equal (alice.publicKey.to "base64"),
          declaration.signatories[0].to "base64"

      test "serialize declaration", ->
        payload = declaration.to "base64"
        declaration = $.Declaration.from "base64", payload
        assert $.Declaration.isType declaration        

      test "signature is verifiable", ->
        assert $.verify declaration

      await test "verification fails if signatures don't match", ->
        bob = await $.SignatureKeyPair.create()
        declaration.signatories = [ bob.publicKey ]
        assert ! $.verify declaration

      test "alice and bob sign a message", ->
        declaration = $.sign [ alice, bob ], message
        assert.equal 2, declaration.signatories.length
        assert.equal (declaration.signatories[0].to "base64"),
          alice.publicKey.to "base64"
        assert.equal (declaration.signatories[1].to "base64"),
          bob.publicKey.to "base64"
        assert $.verify declaration

      await test "verification fails if signatures don't match", ->
        mallory = await $.SignatureKeyPair.create()
        declaration.signatories = [ mallory.publicKey ]
        assert ! $.verify declaration
    ]

export default signature

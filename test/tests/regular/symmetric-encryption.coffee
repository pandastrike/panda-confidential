import assert from "assert"
import {confidential} from "../../../src/index"

symmetric = ->
  # Setup for encryption
  {encrypt, decrypt, SymmetricKey, Plaintext, Envelope} = confidential()

  # Generate symmetric key of correct length that should be saved.
  key = await SymmetricKey.create()
  assert (SymmetricKey.isType key), "bad key"

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  plaintext = Plaintext.from "utf8", message
  assert (Plaintext.isType plaintext), "bad plaintext"

  envelope = await encrypt key, plaintext
  assert (Envelope.isType envelope), "bad envelope"

  # Person A serializes their envelope for storage.
  serialized = envelope.to "base64"

  # Person A later hydrates the envelope and decrypts.
  envelope = Envelope.from "base64", serialized
  outPlaintext = decrypt key, envelope
  assert (Plaintext.isType outPlaintext), "bad plaintext"

  assert.equal (outPlaintext.to "utf8"), message, "failed to decrypt"

  # negative test
  try
    key = await SymmetricKey.create()
    decrypt key, envelope
    assert.fail "This decrypt should fail"
  catch

export default symmetric

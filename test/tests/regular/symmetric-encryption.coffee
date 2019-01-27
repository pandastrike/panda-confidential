import assert from "assert"
import {confidential} from "../../../src/index"

symmetric = ->
  # Setup for encryption
  {encrypt, decrypt, SymmetricKey, Message, Envelope} = confidential()

  # Generate symmetric key of correct length that should be saved.
  key = await SymmetricKey.create()
  assert (SymmetricKey.isType key), "bad key"

  # Person A symmetrically encrypts their message.
  string = "Hello World!"
  message = Message.from "utf8", string
  assert (Message.isType message), "bad message"

  envelope = await encrypt key, message
  assert (Envelope.isType envelope), "bad envelope"

  # Person A serializes their envelope for storage.
  serialized = envelope.to "base64"

  # Person A later hydrates the envelope and decrypts.
  envelope = Envelope.from "base64", serialized
  outMessage = decrypt key, envelope
  assert (Message.isType outMessage), "bad message"

  assert.equal (outMessage.to "utf8"), string, "failed to decrypt"

  # negative test
  try
    key = await SymmetricKey.create()
    decrypt key, envelope
    assert.fail "This decrypt should fail"
  catch

export default symmetric

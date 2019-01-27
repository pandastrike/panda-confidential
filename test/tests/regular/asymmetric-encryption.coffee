import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"
import nacl from "tweetnacl"

asymmetric = ->
  {encrypt, decrypt, EncryptionKeyPair, Message, Envelope, PrivateKey, PublicKey, SharedKey} = confidential()

  # Test Key Pair Generation
  A = {privateKey, publicKey} = await EncryptionKeyPair.create()
  assert (PrivateKey.isType privateKey), "bad private key"
  assert (PublicKey.isType publicKey), "bad public key"
  assert privateKey.key.length == nacl.box.secretKeyLength,
    "private key is improper length"
  assert publicKey.key.length == nacl.box.publicKeyLength,
    "public key is improper length"

  # Test Encrypt - Decrypt Cycle
  B = await EncryptionKeyPair.create()

  # Person A encrypts the message for person B.
  string = "Hello World!"
  message = Message.from "utf8", string
  assert (Message.isType message), "bad message"

  key1 = SharedKey.create A.privateKey, B.publicKey
  assert (SharedKey.isType key1), "bad shared key"
  assert key1.key.length == nacl.box.sharedKeyLength, "bad shared key"

  envelope = await encrypt key1, message
  assert (Envelope.isType envelope), "bad envelope"
  serialized = envelope.to "base64"

  # Person B gets the envelope and decrypts the message with counterpart.
  envelope = Envelope.from "base64", serialized

  key2 = SharedKey.create B.privateKey, A.publicKey
  assert.equal (key1.to "base64"), (key2.to "base64"), "shared keys must match"

  outMessage = decrypt key2, envelope
  assert (Message.isType outMessage), "bad message"

  assert.equal (outMessage.to "utf8"), string, "failed to decrypt"

  # Negative test
  try
    C = await EncryptionKeyPair.create()
    key3 = SharedKey.create A.publicKey, C.privateKey
    decrypt key3, envelope
    assert.fail "This decrypt shoudl fail"
  catch

export default asymmetric

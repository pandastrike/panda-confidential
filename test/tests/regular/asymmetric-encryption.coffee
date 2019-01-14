import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"
import nacl from "tweetnacl"

asymmetric = ->
  {encrypt, decrypt, EncryptionKeyPair, Plaintext, Envelope, PrivateKey, PublicKey, SharedKey} = confidential()

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
  message = "Hello World!"
  plaintext = Plaintext.from "utf8", message
  assert (Plaintext.isType plaintext), "bad plaintext"

  key1 = SharedKey.create A.privateKey, B.publicKey
  assert (SharedKey.isType key1), "bad shared key"
  assert key1.key.length == nacl.box.sharedKeyLength, "bad shared key"

  envelope = await encrypt key1, plaintext
  assert (Envelope.isType envelope), "bad envelope"
  serialized = envelope.to "base64"

  # Person B gets the envelope and decrypts the message with counterpart.
  envelope = Envelope.from "base64", serialized

  key2 = SharedKey.create B.privateKey, A.publicKey
  assert.equal (key1.to "base64"), (key2.to "base64"), "shared keys must match"

  outPlaintext = decrypt key2, envelope
  assert (Plaintext.isType outPlaintext), "bad plaintext"

  assert.equal (outPlaintext.to "utf8"), message, "failed to decrypt"

  # Negative test
  C = await EncryptionKeyPair.create()
  key3 = SharedKey.create A.publicKey, C.privateKey
  outPlaintext = decrypt key3, envelope
  assert outPlaintext.plaintext == null, "decrypt negative test failure"

export default asymmetric

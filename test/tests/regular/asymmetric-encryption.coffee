import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../../src/index"
import {isPublicKey, isPrivateKey, isSharedKey} from "../../../src/keys"
import nacl from "tweetnacl"

asymmetric = ->
  {encryptionKeyPair, sharedKey, encrypt, decrypt} = Confidential()

  # Test Key Pair Generation
  A = {privateKey, publicKey} = await encryptionKeyPair()
  assert (privateKey && isPrivateKey privateKey), "must make private key"
  assert (publicKey && isPublicKey publicKey), "must make public key"
  assert privateKey.key.length == nacl.box.secretKeyLength,
    "private key is improper length"
  assert publicKey.key.length == nacl.box.publicKeyLength,
    "public key is improper length"

  # Test Encrypt - Decrypt Cycle
  B = await encryptionKeyPair()
  message = "Hello World!"

  # Person A encrypts the message for person B.
  key1 = sharedKey A.privateKey, B.publicKey
  assert (key1 && isSharedKey(key1) && (key1.key.length == nacl.box.sharedKeyLength)), "failed to create shared key."
  cipher = await encrypt key1, message
  assert (cipher && message != cipher), "failed to create a ciphertext"

  # Person B gets the cipher and decrypts the message with counterpart.
  key2 = sharedKey B.privateKey, A.publicKey
  assert.equal key1.dump(), key2.dump(), "shared keys must be identical"
  output = decrypt key2, cipher
  assert.equal message, output, "failed to decrypt"

export default asymmetric

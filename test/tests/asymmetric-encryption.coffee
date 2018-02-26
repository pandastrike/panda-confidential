import assert from "assert"
import {test, print} from "amen"
import Confidential from "../../src/index"
import {isPublicKey, isPrivateKey} from "../../src/classes"

asymmetric = (SDK) -> ->
  {keyPair, sharedKey, encrypt, decrypt} = Confidential SDK
  # Test Key Pair Generation
  A = {privateKey, publicKey} = await keyPair "encrypt"
  assert (privateKey && isPrivateKey privateKey), "must make private key"
  assert (publicKey && isPublicKey publicKey), "must make public key"
  assert privateKey.key.length == 32, "private key is improper length"
  assert publicKey.key.length == 32, "public key is improper length"

  # Test Encrypt - Decrypt Cycle
  B = await keyPair "encrypt"
  message = "Hello World!"

  # Person A encrypts the message for person B.
  key1 = sharedKey A.privateKey, B.publicKey
  cipher = await encrypt key1, message
  assert (cipher && message != cipher), "failed to create a ciphertext"

  # Person B gets the cipher and decrypts the message with counterpart.
  key2 = sharedKey B.privateKey, A.publicKey
  assert.equal key1.dump(), key2.dump(), "shared keys must be identical"
  output = decrypt key2, cipher
  assert.equal message, output, "failed to decrypt"


export default asymmetric

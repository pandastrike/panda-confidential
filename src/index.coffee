import nacl from "tweetnacl"
import {privateKey, publicKey, sharedKey, symmetricKey, isPrivateKey, isPublicKey, isSharedKey, isSymmetricKey, equal} from "./keys"
import {encryptionKeyPair, signatureKeyPair, isEncryptionKeyPair, isSignatureKeyPair} from "./key-pairs"
import {signedMessage, isSignedMessage} from "./signed-message"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"
import {encode, decode, isData, isEqual} from "./utils"

confidential = ->
  c =
    randomBytes: nacl.randomBytes

  # Key types.  Symmetric key generation requires randomBytes.
  c.key =
    private: privateKey
    public: publicKey
    shared: sharedKey
    symmetric: symmetricKey c.randomBytes
    isPrivate: isPrivateKey
    isPublic: isPublicKey
    isShared: isSharedKey
    isSymmetric: isSymmetricKey
    equal: equal

  # Key pair types.  Pair generation requires randomBytes
  c.keyPair =
    encryption: encryptionKeyPair c.randomBytes
    signature: signatureKeyPair c.randomBytes
    isEncryption: isEncryptionKeyPair
    isSignature: isSignatureKeyPair

  # Signed message type.
  c.signedMessage = signedMessage
  c.isSignedMessage = isSignedMessage

  # Main functions, 3 pairs of opposing operations.
  # encrypt needs randomBytes for nonce generation
  c.encrypt = encrypt c.randomBytes
  c.decrypt = decrypt
  c.sign = sign
  c.verify = verify
  c.encode = encode
  c.decode = decode

  # Helper functions
  c.nacl = nacl      # Base methods directly use tweetnacl.
  c.hash = hash      # wrapper around tweetnacl's SHA-512 hash
  c.isData = isData  # Is Uint8Array or Node.js buffer?
  c

export {confidential}

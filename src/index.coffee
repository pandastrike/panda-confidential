import nacl from "tweetnacl"
import {privateKey, publicKey, sharedKey, symmetricKey, isPrivateKey, isPublicKey, isSharedKey, isSymmetricKey} from "./keys"
import {encryptionKeyPair, signatureKeyPair, isEncryptionKeyPair, isSignatureKeyPair} from "./key-pairs"
import {signedMessage, isSignedMessage} from "./signed-message"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"
import {encode, decode, isData} from "./utils"

confidential = ->
  c =
    nacl: nacl
    randomBytes: nacl.randomBytes

  # Key types.  Symmetric key generation requires randomBytes.
  c.key =
    Private: privateKey
    Public: publicKey
    Shared: sharedKey
    Symmetric: symmetricKey c.randomBytes
    isPrivate: isPrivateKey
    isPublic: isPublicKey
    isShared: isSharedKey
    isSymmetric: isSymmetricKey

  # Key pair types.  Pair generation requires randomBytes
  c.keyPair =
    Encryption: encryptionKeyPair c.randomBytes
    Signature: signatureKeyPair c.randomBytes
    isEncryption: isEncryptionKeyPair
    isSignature: isSignatureKeyPair

  # Main functions, 3 pairs of opposing operations.
  # encrypt needs randomBytes for nonce generation
  c.encrypt = encrypt c.randomBytes
  c.decrypt = decrypt
  c.sign = sign
  c.verify = verify
  c.encode = encode
  c.decode = decode

  # Helper functions
  c.hash = hash      # wrapper around nacl's SHA-512 hash
  c.isData = isData  # Is Uint8Array or Node.js buffer?
  c.signedMessage = signedMessage
  c.isSignedMessage = isSignedMessage
  c

export {confidential}

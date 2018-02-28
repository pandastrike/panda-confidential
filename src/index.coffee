import nacl from "tweetnacl"
import {privateKey, publicKey, sharedKey, isPrivateKey, isPublicKey, isSharedKey} from "./keys"
import {encryptionKeyPair, signatureKeyPair, isEncryptionKeyPair, isSignatureKeyPair} from "./key-pairs"
import {signedMessage, isSignedMessage} from "./signed-message"
import encrypt from "./encrypt"
import decrypt from "./decrypt"
import sign from "./sign"
import verify from "./verify"
import hash from "./hash"
import {encode, decode, isData} from "./utils"

confidential = ->
  c = randomBytes: nacl.randomBytes
  c.key =
    Private: privateKey c.randomBytes
    Public: publicKey
    Shared: sharedKey
    isPrivateKey: isPrivateKey
    isPublicKey: isPublicKey
    isSharedKey: isSharedKey
  c.keyPair =
    Encryption: encryptionKeyPair c.randomBytes, c.key
    Signature: signatureKeyPair c.randomBytes, c.key
    isEncryptionKeyPair: isEncryptionKeyPair
    isSignatureKeyPair: isSignatureKeyPair
  c.signedMessage = signedMessage
  c.isSignedMessage = isSignedMessage
  c.encrypt = encrypt c.randomBytes
  c.decrypt = decrypt
  c.sign = sign
  c.verify = verify
  c.hash = hash
  c.utils = {encode, decode, isData}
  c.nacl = nacl
  c

export {confidential}

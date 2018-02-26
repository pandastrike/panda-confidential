import {key, isKey} from "./key"
import {kmsKeyID, isKMSKeyID} from "./kms-key"
import {publicKey, isPublicKey} from "./public-key"
import {privateKey, isPrivateKey} from "./private-key"
import {sharedKey, isSharedKey} from "./shared-key"
import KeyPair from "./key-pair"
import {signedMessage, isSignedMessage} from "./signed-message"

export {
  key
  kmsKey
  publicKey
  privateKey
  sharedKey
  KeyPair
  signedMessage
  isKey
  isKMSKey
  isPublicKey
  isPrivateKey
  isSharedKey
  isSignedMessage
}

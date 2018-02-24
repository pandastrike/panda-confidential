import {Key, KMSKey, PrivateKey, PublicKey, SharedKey, KeyPair, SignedMessage} from "./keys"
import {isType, isKind} from "fairmont-helpers"

isKey = isKind Key
isKMSKey = isType KMSKey
isPrivateKey = isType PrivateKey
isPublicKey = isType PublicKey
isSharedKey = isType SharedKey
isKeyPair = isType KeyPair
isSignedMessage = isType SignedMessage

export {
  isKey
  isKMSKey
  isPrivateKey
  isPublicKey
  isSharedKey
  isKeyPair
  isSignedMessage
}

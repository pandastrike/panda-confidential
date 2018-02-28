import nacl from "tweetnacl"
import {kmsKeyID, privateKey, publicKey, sharedKey} from "./keys"
import {encryptionKeyPair, signatureKeyPair} from "./key-pairs"
import {signedMessage} from "./signed-message"
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
  c.keyPair =
    Encryption: encryptionKeyPair c.randomBytes, c.key
    Signature: signatureKeyPair c.randomBytes, c.key
  c.signedMessage = signedMessage
  c.encrypt = encrypt c.randomBytes
  c.decrypt = decrypt
  c.sign = sign
  c.verify = verify
  c.hash = hash
  c.utils = {encode, decode, isData}
  c

export {confidential}

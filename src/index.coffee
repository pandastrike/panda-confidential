import nacl from "tweetnacl"
import {Key, PrivateKey, PublicKey, SharedKey, symmetricKey} from "./keys"
import {KeyPair, encryptionKeyPair, signatureKeyPair} from "./key-pairs"
import {Envelope, Declaration, Plaintext} from "./containers"
import {_encrypt, decrypt, sign, verify, hash} from "./functions"
import {convert, isBytes} from "./utils"

confidential = (randomBytes) ->

  randomBytes ?= nacl.randomBytes

  SymmetricKey = symmetricKey randomBytes
  EncryptionKeyPair = encryptionKeyPair randomBytes
  SignatureKeyPair = signatureKeyPair randomBytes

  encrypt = _encrypt randomBytes

  {nacl, randomBytes,
  convert, isBytes,
  encrypt, decrypt, sign, verify, hash,
  Envelope, Declaration, Plaintext,
  Key, SymmetricKey, PublicKey, PrivateKey, SharedKey,
  KeyPair, EncryptionKeyPair, SignatureKeyPair}

export {confidential}

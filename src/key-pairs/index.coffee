import {include} from "panda-parchment"
import KeyPair from "./key-pair"
import encryptionKeyPair from "./encryption"
import signatureKeyPair from "./signature"

keyPairs = (confidential) ->
  EncryptionKeyPair = encryptionKeyPair confidential
  SignatureKeyPair = signatureKeyPair confidential
  include confidential, {KeyPair, EncryptionKeyPair, SignatureKeyPair}

export default keyPairs

import { assign } from "@dashkite/joy/object"
import KeyPair from "./key-pair"
import encryptionKeyPair from "./encryption"
import signatureKeyPair from "./signature"

keyPairs = (confidential) ->
  EncryptionKeyPair = encryptionKeyPair confidential
  SignatureKeyPair = signatureKeyPair confidential
  assign confidential, {KeyPair, EncryptionKeyPair, SignatureKeyPair}

export default keyPairs

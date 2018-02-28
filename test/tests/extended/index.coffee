# Tests
import {print, test} from "amen"
import symmetric from "./symmetric-encryption"
import symmetricKMS from "./symmetric-encryption-kms"
import asymmetric from "./asymmetric-encryption"
import signature from "./signature"
import hash from "./hash"

# Used to extend the confidential interface.
import {confidential} from "../../../src/index"
import KMS from "./kms"


ExtensionTests = (SDK) ->
  kms = KMS confidential(), SDK
  await print await test "Panda Confidential with KMS", [
    test
      description: "Symmetric Encryption"
      wait: false,
      symmetric kms

    test
      description: "Symmetric Encryption with KMS"
      wait: false,
      symmetricKMS kms

    test
      description: "Public Key Encryption"
      wait: false,
      asymmetric kms

    test
      description: "Digital Signature"
      wait: false,
      signature kms

    test
      description: "SHA-512 Hash"
      wait: false,
      hash kms
  ]

export default ExtensionTests

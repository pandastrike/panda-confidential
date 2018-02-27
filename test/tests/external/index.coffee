# These are used to test the extension interface.
import {print, test} from "amen"

import symmetric from "./symmetric-encryption"
import asymmetric from "./asymmetric-encryption"
import signature from "./signature"
import hash from "./hash"

import Sundog from "sundog"
import {isKMSKeyID} from "./kms-key"

ExtensionTests = (SDK) ->
  {AWS:KMS:{randomKey, encrypt, decrypt}} = Sundog SDK

  externalInterface =
    randomBytes: (length) -> await randomKey length, "buffer"
    encrypt: ({id}, message) -> await encrypt id, message, "buffer"
    decrypt: (foo, cipher) -> await decrypt cipher, "buffer"
    isKeyClass: isKMSKeyID

  await print await test "Panda Confidential with KMS", [
    test
      description: "Symmetric Encryption"
      wait: false,
      symmetric externalInterface

    test
      description: "Public Key Encryption"
      wait: false,
      asymmetric externalInterface

    test
      description: "Digital Signature"
      wait: false,
      signature externalInterface

    test
      description: "SHA-512 Hash"
      wait: false,
      hash externalInterface
  ]

export default ExtensionTests

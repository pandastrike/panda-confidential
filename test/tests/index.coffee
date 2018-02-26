import {print, test} from "amen"
import symmetric from "./symmetric-encryption"
import publicKey from "./asymmetric-encryption"
import signature from "./signature"
import hash from "./hash"

Tests = (SDK) ->
  print await test "Panda Confidential", [
    test
      description: "Symmetric Encryption"
      wait: false,
      symmetric SDK

    test
      description: "Public Key Encryption"
      wait: false,
      publicKey SDK

    test
      description: "Digital Signature"
      wait: false,
      signature SDK

    test
      description: "SHA-512 Hash"
      wait: false,
      hash SDK
  ]
export default Tests

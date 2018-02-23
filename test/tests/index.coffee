import {print, test} from "amen"
import secretKey from "./secret-key"
import publicKey from "./public-key"
import sharedPublicKey from "./shared-public-key"
import scalar from "./scalar"
import signature from "./signature"

Tests = (SDK) ->
  print await test "Panda Confidential", [
    test
      description: "Secret Key Encryption"
      wait: false,
      secretKey SDK

    test
      description: "Public Key Encryption"
      wait: false,
      publicKey SDK

    test
      description: "Shared Public Key Encryption"
      wait: false,
      sharedPublicKey SDK

    test
      description: "Digital Signature"
      wait: false,
      signature SDK
  ]
export default Tests

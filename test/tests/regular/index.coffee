import {print, test} from "amen"

import symmetric from "./symmetric-encryption"
import asymmetric from "./asymmetric-encryption"
import signature from "./signature"
import hash from "./hash"
import convert from "./convert"

Test = ->
  await print await test "Panda Confidential", [
    test
      description: "Symmetric Encryption"
      wait: false,
      symmetric

    test
      description: "Public Key Encryption"
      wait: false,
      asymmetric

    test
      description: "Digital Signature"
      wait: false,
      signature

    test
      description: "SHA-512 Hash"
      wait: false,
      hash

    test
      description: "Format Conversions"
      wait: false,
      convert
  ]

export default Test

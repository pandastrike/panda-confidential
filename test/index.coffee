import { test } from "@dashkite/amen"
import print from "@dashkite/amen-console"
import { confidential } from "../src/index"

import symmetric from "./symmetric-encryption"
import asymmetric from "./asymmetric-encryption"
import signature from "./signature"
import hash from "./hash"
import convert from "./convert"

$ = confidential()

do ->

  await print await test "Panda Confidential", [

    test
      description: "Symmetric Encryption"
      wait: false,
      await symmetric $

    await test
      description: "Public Key Encryption"
      wait: false,
      await asymmetric $

    test
      description: "Digital Signature"
      wait: false,
      await signature $

    test
      description: "SHA-512 Hash"
      wait: false,
      hash $

    test
      description: "Format Conversions"
      wait: false,
      convert $

  ]


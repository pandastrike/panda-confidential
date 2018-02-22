import assert from "assert"
import Confidential from "../../src/index"
import kmsKeyName from "../key-name"

scalarTest = (SDK) -> ->
  {Scalar} = Confidential SDK

  n = "zWC1zYDOzPKC7zjWLxFGT/F9g1ca40z8EwAbVPRHg64="
  p = "ChpfbZlvjlDKGRjGmwQfoOUfPaZhEXtT9NiFaclI8VU="

  assert Buffer.from(Scalar.multiply(n), "base64").length == 32,
    "result is improper length"
  assert Buffer.from(Scalar.multiply(n, p), "base64").length == 32,
    "result is improper length"

export default scalarTest

import {print, test} from "amen"
import secretKey from "./secret-key"

Tests = (SDK) ->
  print await test "Panda Confidential", [
    test
      description: "Secret Key Encryption"
      wait: false,
      -> secretKey SDK
  ]
export default Tests

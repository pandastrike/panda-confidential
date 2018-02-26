import {isString, isBuffer} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isSharedKey} from "../classes"
import SymmetricDecrypt from "./symmetric"
import AsymmetricDecrypt from "./asymmetric"

Decrypt = ({KMS}) ->
  symmetric = SymmetricDecrypt KMS
  asymmetric = AsymmetricDecrypt()

  # Define a multimethod.
  decrypt = Method.create()

  # Symmetric Decryption
  Method.define decrypt, isString,
    (ciphertext) -> symmetric ciphertext, "utf8"
  Method.define decrypt, isString, isString,
    (ciphertext, encoding) -> symmetric ciphertext, encoding

  # Asymmetric Decryption via shared key.
  Method.define decrypt, isSharedKey, isString,
    (key, ciphertext) -> asymmetric key, ciphertext, "utf8"
  Method.define decrypt, isSharedKey, isString, isString,
    (key, ciphertext, encoding) -> asymmetric key, ciphertext, encoding

  # Return the multimethod.
  decrypt

export default Decrypt

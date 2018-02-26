import {isString, isBuffer} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isKMSKeyID, isSharedKey} from "../classes"
import SymmetricEncrypt from "./symmetric"
import AsymmetricEncrypt from "./asymmetric"

Encrypt = ({KMS}) ->
  symmetric = SymmetricEncrypt KMS
  asymmetric = AsymmetricEncrypt KMS

  # Define a multimethod.
  encrypt = Method.create()

  # Symmetric Encryption
  Method.define encrypt, isKMSKeyID, isString,
    (key, plaintext) -> symmetric key, plaintext, "utf8"
  Method.define encrypt, isKMSKeyID, isBuffer,
    (key, plaintext) -> symmetric key, plaintext, "buffer"
  Method.define encrypt, isKMSKeyID, isString, isString,
    (key, plaintext, encoding) -> symmetric key, plaintext, encoding

  # Asymmetric Encryption via shared key.
  Method.define encrypt, isSharedKey, isString,
    (key, plaintext) -> asymmetric key, plaintext, "utf8"
  Method.define encrypt, isSharedKey, isBuffer,
    (key, plaintext) -> asymmetric key, plaintext, "buffer"
  Method.define encrypt, isSharedKey, isString, isString,
    (key, plaintext, encoding) -> asymmetric key, plaintext, encoding

  # Return the multimethod.
  encrypt

export default Encrypt

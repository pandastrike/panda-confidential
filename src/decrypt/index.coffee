import {isString, isBuffer} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isSharedKey, isPrivateKey} from "../keys"
import SymmetricDecrypt from "./symmetric"
import SymmetricDecryptExternal from "./symmetric-external"
import AsymmetricDecrypt from "./asymmetric"

Decrypt = (externalEncrypter, isExternalKeyClass) ->
  if externalEncrypter
    symmetricExternal = SymmetricDecryptExternal externalEncrypter
  else
    symmetricExternal = ->
      throw new Error "No external encryption service defined"

  symmetric = SymmetricDecrypt
  asymmetric = AsymmetricDecrypt

  # Define a multimethod.
  decrypt = Method.create()

  if isExternalKeyClass
    # Symmetric Decryption extended via external service.
    Method.define decrypt, isExternalKeyClass, isString, isString,
      (key, ciphertext, encoding) -> symmetricExternal key, ciphertext, encoding
    Method.define decrypt, isExternalKeyClass, isString,
      (key, ciphertext) -> symmetricExternal key, ciphertext, "utf8"

  # Symmetric Decryption
  Method.define decrypt, isPrivateKey, isString, isString,
    (key, ciphertext, encoding) -> symmetric key, ciphertext, encoding
  Method.define decrypt, isPrivateKey, isString,
    (key, ciphertext) -> symmetric key, ciphertext, "utf8"

  # Asymmetric Decryption via shared key.
  Method.define decrypt, isSharedKey, isString,
    (key, ciphertext) -> asymmetric key, ciphertext, "utf8"
  Method.define decrypt, isSharedKey, isString, isString,
    (key, ciphertext, encoding) -> asymmetric key, ciphertext, encoding

  # Return the multimethod.
  decrypt

export default Decrypt

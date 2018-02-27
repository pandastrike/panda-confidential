import {isString, isBuffer} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {isPrivateKey, isSharedKey} from "../keys"
import {isUint8Array} from "../utils"
import SymmetricEncrypt from "./symmetric"
import SymmetricEncryptExternal from "./symmetric-external"
import AsymmetricEncrypt from "./asymmetric"

Encrypt = (randomBytes, externalEncrypter, isExternalKeyClass) ->
  if externalEncrypter
    symmetricExternal = SymmetricEncryptExternal randomBytes, externalEncrypter
  else
    symmetricExternal = ->
      throw new Error "No external encryption service defined"

  symmetric = SymmetricEncrypt randomBytes
  asymmetric = AsymmetricEncrypt randomBytes

  # Define a multimethod.
  encrypt = Method.create()

  if isExternalKeyClass
    # Symmetric Encryption extended by external service.
    Method.define encrypt, isExternalKeyClass, isString,
      (key, plaintext) -> symmetricExternal key, plaintext, "utf8"
    Method.define encrypt, isExternalKeyClass, isBuffer,
      (key, plaintext) -> symmetricExternal key, plaintext, "buffer"
    Method.define encrypt, isExternalKeyClass, isUint8Array,
      (key, plaintext) -> symmetricExternal key, plaintext, "buffer"
    Method.define encrypt, isExternalKeyClass, isString, isString,
      (key, plaintext, encoding) -> symmetricExternal key, plaintext, encoding

  # Symmetric Encryption
  Method.define encrypt, isPrivateKey, isString,
    (key, plaintext) -> symmetric key, plaintext, "utf8"
  Method.define encrypt, isPrivateKey, isBuffer,
    (key, plaintext) -> symmetric key, plaintext, "buffer"
  Method.define encrypt, isPrivateKey, isUint8Array,
    (key, plaintext) -> symmetric key, plaintext, "buffer"
  Method.define encrypt, isPrivateKey, isString, isString,
    (key, plaintext, encoding) -> symmetric key, plaintext, encoding

  # Asymmetric Encryption via shared key.
  Method.define encrypt, isSharedKey, isString,
    (key, plaintext) -> asymmetric key, plaintext, "utf8"
  Method.define encrypt, isSharedKey, isBuffer,
    (key, plaintext) -> asymmetric key, plaintext, "buffer"
  Method.define encrypt, isSharedKey, isUint8Array,
    (key, plaintext) -> asymmetric key, plaintext, "buffer"
  Method.define encrypt, isSharedKey, isString, isString,
    (key, plaintext, encoding) -> asymmetric key, plaintext, encoding

  # Return the multimethod.
  encrypt

export default Encrypt

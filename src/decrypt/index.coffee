import {Method, isString, isBuffer} from "fairmont-helpers"

import {SharedKey} from "../keys"
import {isKMSKey, isPrivateKey, isPublicKey, isSharedKey} from "../utils"
import SymmetricDecrypt from "./symmetric"
import AsymmetricDecrypt from "./asymmetric"

Decrypt = ({KMS}) ->
  symmetric = SymmetricDecrypt KMS
  asymmetric = AsymmetricDecrypt()

  # Define a multimethod.
  decrypt = Method.create()

  # Symmetric Decryption
  Method.define isKMSKey, isString,
    (key, ciphertext) -> symmetric key, ciphertext, "utf8"
  Method.define isKMSKey, isString, isString,
    (key, ciphertext, encoding) -> symmetric key, ciphertext, encoding

  # Asymmetric Decryption via shared key.
  Method.define isSharedKey, isString,
    (key, ciphertext) -> asymmetric key, ciphertext, "utf8"
  Method.define isSharedKey, isString, isString,
    (key, ciphertext, encoding) -> asymmetric key, ciphertext, encoding

  # Asymmetric Decryption via separate private / public keys.
  Method.define isPrivateKey, isPublicKey, isString,
    (privateKey, publicKey, ciphertext) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, ciphertext, "utf8"
  Method.define isPrivateKey, isPublicKey, isString, isString,
    (privateKey, publicKey, ciphertext, encoding) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, ciphertext, encoding


  # Return the multimethod.
  decrypt

export default Decrypt

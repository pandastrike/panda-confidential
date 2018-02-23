import {Method, isString, isBuffer} from "fairmont-helpers"

import {SharedKey} from "../keys"
import {isKMSKey, isPrivateKey, isPublicKey, isSharedKey} from "../utils"
import SymmetricEncrypt from "./symmetric"
import AsymmetricEncrypt from "./asymmetric"

Encrypt = ({KMS}) ->
  symmetric = SymmetricEncrypt KMS
  asymmetric = AsymmetricEncrypt KMS

  # Define a multimethod.
  encrypt = Method.create()

  # Symmetric Encryption
  Method.define isKMSKey, isString,
    (key, plaintext) -> symmetric key, plaintext, "utf8"
  Method.define isKMSKey, isBuffer,
    (key, plaintext) -> symmetric key, plaintext, "buffer"
  Method.define isKMSKey, isString, isString,
    (key, plaintext, encoding) -> symmetric key, plaintext, encoding

  # Asymmetric Encryption via shared key.
  Method.define isSharedKey, isString,
    (key, plaintext) -> asymmetric key, plaintext, "utf8"
  Method.define isSharedKey, isBuffer,
    (key, plaintext) -> asymmetric key, plaintext, "buffer"
  Method.define isSharedKey, isString, isString,
    (key, plaintext, encoding) -> asymmetric key, plaintext, encoding

  # Asymmetric Encryption via separate private / public keys.
  Method.define isPrivateKey, isPublicKey, isString,
    (privateKey, publicKey, plaintext) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, plaintext, "utf8"
  Method.define isPrivateKey, isPublicKey, isBuffer,
    (privateKey, publicKey, plaintext) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, plaintext, "buffer"
  Method.define isPrivateKey, isPublicKey, isString, isString,
    (privateKey, publicKey, plaintext, encoding) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, plaintext, encoding


  # Return the multimethod.
  encrypt

export default Encrypt

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
  Method.define encrypt, isKMSKey, isString,
    (key, plaintext) -> symmetric key, plaintext, "utf8"
  Method.define encrypt, isKMSKey, isBuffer,
    (key, plaintext) -> symmetric key, plaintext, "buffer"
  Method.define encrypt, isKMSKey, isString, isString,
    (key, plaintext, encoding) -> symmetric key, plaintext, encoding

  # Asymmetric Encryption via shared key.
  Method.define encrypt, isSharedKey, isString,
    (key, plaintext) -> asymmetric key, plaintext, "utf8"
  Method.define encrypt, isSharedKey, isBuffer,
    (key, plaintext) -> asymmetric key, plaintext, "buffer"
  Method.define encrypt, isSharedKey, isString, isString,
    (key, plaintext, encoding) -> asymmetric key, plaintext, encoding

  # Asymmetric Encryption via separate private / public keys.
  Method.define encrypt, isPrivateKey, isPublicKey, isString,
    (privateKey, publicKey, plaintext) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, plaintext, "utf8"
  Method.define encrypt, isPrivateKey, isPublicKey, isBuffer,
    (privateKey, publicKey, plaintext) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, plaintext, "buffer"
  Method.define encrypt, isPrivateKey, isPublicKey, isString, isString,
    (privateKey, publicKey, plaintext, encoding) ->
      key = new SharedKey privateKey, publicKey
      asymmetric key, plaintext, encoding


  # Return the multimethod.
  encrypt

export default Encrypt

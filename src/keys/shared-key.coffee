# This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
import nacl from "tweetnacl"
import {isType, isString} from "panda-parchment"
import {Method} from "panda-generics"

import {Key} from "./key"
import {isPrivateKey} from "./private-key"
import {isPublicKey} from "./public-key"
import {decode, isData} from "../utils"

class SharedKey extends Key

isSharedKey = isType SharedKey

# Create a key parsing multimethod.  Default to decoding a key literal...
get = Method.create()
Method.define get, isData,
  (input) -> new SharedKey input
Method.define get, isString,
  (input) -> get decode "base64", input
Method.define get, isString, isString,
  (input, encoding) -> get decode encoding, input

# ... but the most common usecase is to accept two explicit key classes.
Method.define get, isPrivateKey, isPublicKey,
  (privateKey, publicKey) -> get nacl.box.before publicKey.key, privateKey.key
Method.define get, isPublicKey, isPrivateKey,
  (publicKey, privateKey) -> get nacl.box.before publicKey.key, privateKey.key


export {get as sharedKey, isSharedKey}

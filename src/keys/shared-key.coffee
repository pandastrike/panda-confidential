# This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {Key} from "./key"
import {isPrivateKey} from "./private-key"
import {isPublicKey} from "./public-key"
import {decode} from "../utils"

class SharedKey extends Key

# Create a key parsing multimethod.  Default to decoding a key literal...
get = Method.create default: decode

# ... but the most common usecase is to accept two explicit key classes.
Method.define get, isPrivateKey, isPublicKey,
  (privateKey, publicKey) -> nacl.box.before publicKey.key, privateKey.key
Method.define get, isPublicKey, isPrivateKey,
  (publicKey, privateKey) -> nacl.box.before publicKey.key, privateKey.key

sharedKey = (input1, input2) -> new SharedKey get input1, input2

isSharedKey = isType SharedKey

export {sharedKey, isSharedKey}

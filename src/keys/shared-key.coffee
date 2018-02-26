# This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
import nacl from "tweetnacl"
import {isType} from "fairmont-helpers"
import {Method} from "fairmont-multimethods"

import {Key} from "./key"
import {isPrivateKey} from "./private-key"
import {isPublicKey} from "./public-key"
import {decodeKey} from "../utils"

class SharedKey extends Key

# Create a key parsing multimethod.
get = Method.create default: decodeKey

# Oddly named NaCl function to generate shared key.
generate = nacl.box.before

# While we may accept a key literal, the most common usecase is to accept two explicit key classes.
Method.define get, isPrivateKey, isPublicKey,
  (privateKey, publicKey) -> generate publicKey.key, privateKey.key
Method.define get, isPublicKey, isPrivateKey,
  (publicKey, privateKey) -> generate publicKey.key, privateKey.key

sharedKey = (input1, input2) -> new SharedKey get input1, input2

isSharedKey = isType SharedKey

export {sharedKey, isSharedKey}

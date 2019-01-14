import nacl from "tweetnacl"
import {isType, isPrototype} from "panda-parchment"
import {Method} from "panda-generics"
import Key from "./key"
import {convert} from "../utils"

create = Method.create default: (args...) ->
  throw new Error "panda-confidential::SharedKey.create - no match on #{args...}"

Method.define create, isPrototype "PublicKey", isPrototype "PrivateKey",
  (publicKey, privateKey) ->
    nacl.box.before publicKey.to "bytes", privateKey.to "bytes"
Method.define create, isPrototype "PrivateKey", isPrototype "PublicKey",
  (privateKey, publicKey) -> create publicKey, privateKey
Method.define create, isPrototype "EncryptionKeyPair",
  (keyPair) -> create keyPair.publicKey, keyPair.privateKey

class SharedKey extends Key

  @from: (hint, value) ->
    new SharedKey do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @

  @create: (args...) -> new SharedKey create args...

export default SharedKey

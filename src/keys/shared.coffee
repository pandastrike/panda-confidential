import nacl from "tweetnacl"
import {isType, isPrototype} from "panda-parchment"
import {Method} from "panda-generics"
import Key from "./key"
import PublicKey from "./public"
import PrivateKey from "./private"
import {convert} from "../utils"

sharedKey = ({EncryptionKeyPair}) ->
  create = Method.create default: (args...) ->
    throw new Error "panda-confidential::SharedKey.create - no match on #{args}"

  Method.define create, PublicKey.isType, PrivateKey.isType,
    (publicKey, privateKey) ->
      nacl.box.before (publicKey.to "bytes"), (privateKey.to "bytes")
  Method.define create, PrivateKey.isType, PublicKey.isType,
    (privateKey, publicKey) -> create publicKey, privateKey
  Method.define create, EncryptionKeyPair.isType,
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

export default sharedKey

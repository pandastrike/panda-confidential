import nacl from "tweetnacl"
import {isType, isPrototype, toJSON} from "panda-parchment"
import Method from "panda-generics"
import Key from "./key"
import PublicKey from "./public"
import PrivateKey from "./private"
import {convert, areType} from "../utils"

sharedKey = ({EncryptionKeyPair}) ->

  create = Method.create
    name: "SharedKey::create"
    description: "Instantiates a SharedKey from one PrivateKey and
      one PublicKey"

  Method.define create, PublicKey.isType, PrivateKey.isType,
    (publicKey, privateKey) ->
      new SharedKey nacl.box.before (publicKey.to "bytes"),
        (privateKey.to "bytes")

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
    @areType: areType @isType

    @create: create

export default sharedKey

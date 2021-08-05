import nacl from "@dashkite/tweetnacl"
import { isType, isPrototype } from "@dashkite/joy/type"
import { generic } from "@dashkite/joy/generic"
import Key from "./key"
import PublicKey from "./public"
import PrivateKey from "./private"
import { convert, areType, toJSON } from "../utils"

sharedKey = ({EncryptionKeyPair}) ->

  create = generic
    name: "SharedKey::create"
    description: "Instantiates a SharedKey from one PrivateKey and
      one PublicKey"

  generic create, PublicKey.isType, PrivateKey.isType,
    (publicKey, privateKey) ->
      new SharedKey nacl.box.before (publicKey.to "bytes"),
        (privateKey.to "bytes")

  generic create, PrivateKey.isType, PublicKey.isType,
    (privateKey, publicKey) -> create publicKey, privateKey

  generic create, EncryptionKeyPair.isType,
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

import nacl from "tweetnacl"
import {isType, fromJSON} from "panda-parchment"
import {convert, areType} from "../utils"
import KeyPair from "./key-pair"

toBytes = (string) -> convert from: "base64", to: "bytes", string

encryptionKeyPair = ({randomBytes}) ->
  class EncryptionKeyPair extends KeyPair

    @create: ->
      input = await randomBytes nacl.box.secretKeyLength
      pair = nacl.box.keyPair.fromSecretKey input
      new EncryptionKeyPair
        privateKey: pair.secretKey
        publicKey: pair.publicKey

    @from: (hint, value) ->
      new EncryptionKeyPair do ->
        value =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        privateKey: toBytes value.privateKey
        publicKey: toBytes value.publicKey

    @isType: isType @
    @areType: areType @isType

export default encryptionKeyPair

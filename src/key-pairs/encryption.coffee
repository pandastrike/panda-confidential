import nacl from "tweetnacl"
import {isType} from "panda-parchment"
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
            JSON.parse value
          else
            JSON.parse convert from: hint, to: "utf8", value

        privateKey: toBytes value.privateKey
        publicKey: toBytes value.publicKey

    @isType: isType @


export default encryptionKeyPair

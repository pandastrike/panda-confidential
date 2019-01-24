import nacl from "tweetnacl"
import {isType, fromJSON} from "panda-parchment"
import {convert} from "../utils"
import KeyPair from "./key-pair"

toBytes = (string) -> convert from: "base64", to: "bytes", string

signatureKeyPair = ({randomBytes}) ->
  class SignatureKeyPair extends KeyPair

    @create: ->
      input = await randomBytes nacl.sign.seedLength
      pair = nacl.sign.keyPair.fromSeed input
      new SignatureKeyPair
        privateKey: pair.secretKey
        publicKey: pair.publicKey

    @from: (hint, value) ->
      new SignatureKeyPair do ->
        value =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        privateKey: toBytes value.privateKey
        publicKey: toBytes value.publicKey

    @isType: isType @

export default signatureKeyPair

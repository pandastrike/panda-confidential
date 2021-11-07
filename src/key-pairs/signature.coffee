import nacl from "@dashkite/tweetnacl"
import { isType } from "@dashkite/joy/type"
import { fromJSON, convert, areType } from "../utils"
import KeyPair from "./key-pair"
import PublicKey from "../keys/public"
import PrivateKey from "../keys/private"

signatureKeyPair = ({randomBytes}) ->

  class SignatureKeyPair extends KeyPair

    @create: ->
      input = await randomBytes nacl.sign.seedLength
      pair = nacl.sign.keyPair.fromSeed input
      new SignatureKeyPair
        privateKey: PrivateKey.from "bytes", pair.secretKey
        publicKey: PublicKey.from "bytes", pair.publicKey

    @from: (hint, value) ->
      new SignatureKeyPair do ->
        {privateKey, publicKey} =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        privateKey: PrivateKey.from "base64", privateKey
        publicKey: PublicKey.from "base64", publicKey

    @isType: isType @
    @areType: areType @isType

export default signatureKeyPair

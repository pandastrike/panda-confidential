import nacl from "@dashkite/tweetnacl"
import { isType } from "@dashkite/joy"
import { fromJSON, convert, areType } from "../utils"
import KeyPair from "./key-pair"
import PublicKey from "../keys/public"
import PrivateKey from "../keys/private"

encryptionKeyPair = ({randomBytes}) ->
  class EncryptionKeyPair extends KeyPair

    @create: ->
      input = await randomBytes nacl.box.secretKeyLength
      pair = nacl.box.keyPair.fromSecretKey input
      new EncryptionKeyPair
        privateKey: PrivateKey.from "bytes", pair.secretKey
        publicKey: PublicKey.from "bytes", pair.publicKey

    @from: (hint, value) ->
      new EncryptionKeyPair do ->
        {privateKey, publicKey} =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        privateKey: PrivateKey.from "base64", privateKey
        publicKey: PublicKey.from "base64", publicKey

    @isType: isType @
    @areType: areType @isType

export default encryptionKeyPair

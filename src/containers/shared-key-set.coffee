import {isType, toJSON, fromJSON} from "panda-parchment"
import {Method} from "panda-generics"
import {convert, areType} from "../utils"

Container = ({PublicKey, PrivateKey, SharedKey, EncryptionKeyPair}) ->

  create = Method.create default: (args...) ->
    throw new Error "panda-confidential::SharedKeySet.create -
      no match on #{toJSON args}"

  Method.define create, EncryptionKeyPair.isType, PublicKey.isType,
    (keyPair, recipient) ->
      new SharedKeySet
        sharedKey: SharedKey.create keyPair.privateKey, recipient
        source: keyPair.publicKey
        recipient: recipient

  class SharedKeySet
    constructor: ({@sharedKey, @source, @recipient}) ->

    to: (hint) ->
      output = toJSON
        sharedKey: @sharedKey.to "base64"
        source: @source.to "base64"
        recipient: @recipient.to "base64"

      if hint == "utf8"
        output
      else
        convert from: "utf8", to: hint, output

    @create: create

    @from: (hint, value) ->
      new SharedKeySet do ->
        {sharedKey, source, recipient} =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        sharedKey: SharedKey.from "base64", sharedKey
        source: PublicKey.from "base64", source
        recipient: PublicKey.from "base64", recipient

    @isType: isType @
    @areType: areType @isType

export default Container

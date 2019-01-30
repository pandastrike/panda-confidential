import {isType, toJSON, fromJSON} from "panda-parchment"
import {convert, areType} from "../utils"

Container = ({Message, Signature, PublicKey}) ->

  class Declaration
    constructor: ({@message, @signatories, @signatures}) ->
      @signatories.list = (hint) ->
        signatory.to hint for signatory in @
      @signatures.list = (hint) ->
        signature.to hint for signature in @

    to: (hint) ->
      output = toJSON
        message: @message.to "base64"
        signatories: @signatories.list "base64"
        signatures: @signatures.list "base64"

      if hint == "utf8"
        output
      else
        convert from: "utf8", to: hint, output

    @create: (value) -> new Declaration value

    @from: (hint, value) ->
      new Declaration do ->
        {message, signatories, signatures} =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        message: Message.from "base64", message
        signatories: (PublicKey.from "base64", s for s in signatories)
        signatures: (Signature.from "base64", s for s in signatures)

    @isType: isType @
    @areType: areType @isType

export default Container

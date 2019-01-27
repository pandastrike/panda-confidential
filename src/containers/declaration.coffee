import {isType, toJSON, fromJSON} from "panda-parchment"
import {convert} from "../utils"

Container = ({Message, Signature, PublicKey}) ->

  class Declaration
    constructor: ({@message, @signatories, @signatures}) ->

    to: (hint) ->
      output = toJSON
        message: @message.to "base64"
        signatories: (s.to "base64" for s in @signatories)
        signatures: (s.to "base64" for s in @signatures)

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

export default Container

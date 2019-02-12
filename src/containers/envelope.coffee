import {isType, toJSON, fromJSON} from "panda-parchment"
import {convert, areType} from "../utils"

Container = ({Nonce, Ciphertext, PublicKey}) ->

  class Envelope
    constructor: ({@ciphertext, @nonce, @source, @recipient}) ->

    to: (hint) ->
      output =
        ciphertext: @ciphertext.to "base64"
        nonce: @nonce.to "base64"

      if @source?
        output.source = @source.to "base64"
        output.recipient = @recipient.to "base64"

      if hint == "utf8"
        toJSON output
      else
        convert from: "utf8", to: hint, toJSON output

    @create: (value) -> new Envelope value

    @from: (hint, value) ->
      new Envelope do ->
        {ciphertext, nonce, source, recipient} =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        result =
          ciphertext: Ciphertext.from "base64", ciphertext
          nonce: Nonce.from "base64", nonce

        if source?
          result.source = PublicKey.from "base64", source
          result.recipient = PublicKey.from "base64", recipient
        result

    @isType: isType @
    @areType: areType @isType

export default Container

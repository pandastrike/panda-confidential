import {isType, toJSON, fromJSON, eq, isDefined, isObject} from "panda-parchment"
import {convert, isAllowedHint} from "../utils"

Container = ({Nonce, Ciphertext}) ->

  class Envelope
    constructor: ({@ciphertext, @nonce}) ->

    to: (hint) ->
      output = toJSON
        ciphertext: @ciphertext.to "base64"
        nonce: @nonce.to "base64"

      if hint == "utf8"
        output
      else
        convert from: "utf8", to: hint, output

    @from: (hint, value) ->
      new Envelope do ->
        {ciphertext, nonce} =
          if hint == "utf8"
            fromJSON value
          else
            fromJSON convert from: hint, to: "utf8", value

        ciphertext: Ciphertext.from "base64", ciphertext
        nonce: Nonce.from "base64", nonce

    @isType: isType @

export default Container

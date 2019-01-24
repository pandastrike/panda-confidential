import {isType, toJSON, fromJSON} from "panda-parchment"
import {convert} from "../utils"

toBase64 = (bytes) -> convert from: "bytes", to: "base64", bytes
toBytes = (string) -> convert from: "base64", to: "bytes", string

class Envelope
  constructor: ({@ciphertext, @nonce}) ->

  to: (hint) ->
    output = toJSON
      ciphertext: toBase64 @ciphertext
      nonce: toBase64 @nonce

    if hint == "utf8"
      output
    else
      convert from: "utf8", to: hint, output

  @from: (hint, value) ->
    new Envelope do ->
      value =
        if hint == "utf8"
          fromJSON value
        else
          fromJSON convert from: hint, to: "utf8", value

      ciphertext: toBytes value.ciphertext
      nonce: toBytes value.nonce

  @isType: isType @

export default Envelope

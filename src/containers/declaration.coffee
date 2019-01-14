import {isType} from "panda-parchment"
import {convert} from "../utils"

toBase64 = (bytes) -> convert from: "bytes", to: "base64", bytes
toBytes = (string) -> convert from: "base64", to: "bytes", string

class Declaration
  constructor: ({@data, @signatories, @signatures}) ->

  to: (hint) ->
    output = JSON.stringify
      data: toBase64 @data
      signatories: (toBase64 s for s in @signatories)
      signatures: (toBase64 s for s in @signatures)

    if hint == "utf8"
      output
    else
      convert from: "utf8", to: hint, output

  @from: (hint, value) ->
    new Declaration do ->
      value =
        if hint == "utf8"
          JSON.parse value
        else
          JSON.parse convert from: hint, to: "utf8", value

      data: toBytes value.data
      signatories: (toBytes s for s in value.signatories)
      signatures: (toBytes s for s in value.signatures)

  @isType: isType @

export default Declaration

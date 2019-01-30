import {isType} from "panda-parchment"
import {convert, areType} from "../utils"

class Signature
  constructor: (@signature) ->

  to: (hint) ->
    if hint == "bytes"
      @signature
    else
      convert from: "bytes", to: hint, @signature

  @from: (hint, value) ->
    new Signature do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @
  @areType: areType @isType

export default Signature

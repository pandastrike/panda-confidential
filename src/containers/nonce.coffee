import { isType } from "@dashkite/joy/type"
import {convert, areType} from "../utils"

class Nonce
  constructor: (@nonce) ->

  to: (hint) ->
    if hint == "bytes"
      @nonce
    else
      convert from: "bytes", to: hint, @nonce

  @from: (hint, value) ->
    new Nonce do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @
  @areType: areType @isType

export default Nonce

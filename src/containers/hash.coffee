import { isType } from "@dashkite/joy/type"
import {convert, areType} from "../utils"

class Hash
  constructor: (@hash) ->

  to: (hint) ->
    if hint == "bytes"
      @hash
    else
      convert from: "bytes", to: hint, @hash

  @from: (hint, value) ->
    new Hash do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @
  @areType: areType @isType

export default Hash

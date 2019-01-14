import {isType} from "panda-parchment"
import {convert} from "../utils"

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

export default Hash

import {isKind} from "panda-parchment"
import {convert, areType} from "../utils"

class Key
  constructor: (@key) ->

  to: (hint) ->
    if hint == "bytes"
      @key
    else
      convert from: "bytes", to: hint, @key

  @isKind: isKind @
  @areType: areType @isType

export default Key

import {isKind} from "panda-parchment"
import {convert} from "../utils"

class Key
  constructor: (@key) ->

  to: (hint) ->
    if hint == "bytes"
      @key
    else
      convert from: "bytes", to: hint, @key

  @isKind: isKind @

export default Key

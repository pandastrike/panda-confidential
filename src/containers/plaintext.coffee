import {isType} from "panda-parchment"
import {convert} from "../utils"

class Plaintext
  constructor: (@plaintext) ->

  to: (hint) ->
    if hint == "bytes"
      @plaintext
    else
      convert from: "bytes", to: hint, @plaintext

  @from: (hint, value) ->
    new Plaintext do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @

export default Plaintext

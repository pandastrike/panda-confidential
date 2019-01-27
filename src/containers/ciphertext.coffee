import {isType} from "panda-parchment"
import {convert} from "../utils"

class Ciphertext
  constructor: (@ciphertext) ->

  to: (hint) ->
    if hint == "bytes"
      @ciphertext
    else
      convert from: "bytes", to: hint, @ciphertext

  @from: (hint, value) ->
    new Ciphertext do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @

export default Ciphertext

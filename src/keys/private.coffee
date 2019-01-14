import {isType} from "panda-parchment"
import Key from "./key"
import {convert} from "../utils"

class PrivateKey extends Key

  @from: (hint, value) ->
    new PrivateKey do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @

export default PrivateKey

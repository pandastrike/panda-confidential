import {isType} from "panda-parchment"
import Key from "./key"
import {convert} from "../utils"

class PublicKey extends Key

  @from: (hint, value) ->
    new PublicKey do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @

export default PublicKey

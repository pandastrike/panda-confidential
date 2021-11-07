import { isType } from "@dashkite/joy/type"
import Key from "./key"
import {convert, areType} from "../utils"

class PrivateKey extends Key

  @from: (hint, value) ->
    new PrivateKey do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @
  @areType: areType @isType

export default PrivateKey

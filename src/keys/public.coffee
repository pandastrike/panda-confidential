import { isType } from "@dashkite/joy/type"
import Key from "./key"
import {convert, areType} from "../utils"

class PublicKey extends Key

  @from: (hint, value) ->
    new PublicKey do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @
  @areType: areType @isType

export default PublicKey

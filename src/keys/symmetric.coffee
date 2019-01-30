import nacl from "tweetnacl"
import {isType} from "panda-parchment"
import Key from "./key"
import {convert, areType} from "../utils"

symmetricKey = ({randomBytes}) ->

  class SymmetricKey extends Key
    @create: ->
      new SymmetricKey await randomBytes nacl.secretbox.keyLength

    @from: (hint, value) ->
      new SymmetricKey do ->
        if hint == "bytes"
          value
        else
          convert from: hint, to: "bytes", value

    @isType: isType @
    @areType: areType @isType

export default symmetricKey

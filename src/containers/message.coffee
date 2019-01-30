import {isType, fromJSON} from "panda-parchment"
import {convert, areType} from "../utils"

class Message
  constructor: (@message) ->

  to: (hint) ->
    if hint == "bytes"
      @message
    else
      convert from: "bytes", to: hint, @message

  json: -> fromJSON @to "utf8"

  @from: (hint, value) ->
    new Message do ->
      if hint == "bytes"
        value
      else
        convert from: hint, to: "bytes", value

  @isType: isType @
  @areType: areType @isType

export default Message

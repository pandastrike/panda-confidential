# This submodule uses the TweetNaCl-js hash API, along with
import nacl from "tweetnacl"

utility = ->
  ## Helpers
  ##################################
  # Ensure a given key is in the right form for NaCl-js
  prepareKey = (key) ->
    if typeof key == "string"
      Buffer.from key, "base64"
    else
      key

  ## Exposed Functions
  ################################
  verify = (keyA, keyB) ->
    keyA = prepareKey keyA
    keyB = prepareKey keyB
    nacl.verify(x, y)

  {verify}

export default utility

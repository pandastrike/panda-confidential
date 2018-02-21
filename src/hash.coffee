# This submodule uses the TweetNaCl-js hash API, along with
import nacl from "tweetnacl"
import Crypto from "crypto"

hash = ->

  ## Helpers
  ##################################
  # Ensure the plaintext is in the right form for NaCl-js
  preparePlaintext = (msg, encoding) ->
    if encoding == "buffer"
      msg
    else
      Buffer.from message, encoding

  ## Exposed Functions
  ################################
  # encoding is ignored by Node if msg is a buffer.
  md5 = (msg, encoding="utf8") ->
    Crypto.createHash('md5').update(msg, encoding).digest("hex")

  sha512 = (msg, encoding="utf8") ->
    msg = preparePlaintext msg, encoding
    Bufffer.from(nacl.hash msg).toString("hex")

  {md5, sha512}

export default hash

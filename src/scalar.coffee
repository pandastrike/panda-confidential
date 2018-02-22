# This submodule uses the TweetNaCl-js scalar multiplication API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements x25519.
import nacl from "tweetnacl"

scalar = ->

  toBuffer = (x) -> Buffer.from x, "base64"

  multiply = (n, p) ->
    n = toBuffer n
    if p
      p = toBuffer p
      Buffer.from(nacl.scalarMult n, p).toString("base64")
    else
      Buffer.from(nacl.scalarMult.base n).toString("base64")

  {multiply}

export default scalar

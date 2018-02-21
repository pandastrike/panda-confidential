# This submodule uses the TweetNaCl-js scalar multiplication API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements x25519.
import nacl from "tweetnacl"

scalar = ->

  multiply = (n, p) ->
    if p
      nacl.scalarMult n, p
    else
      nacl.scalarMult.base n

  {multiply}

export default scalar

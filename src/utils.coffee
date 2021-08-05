import { unary, curry } from "@dashkite/joy/function"
import {
  isType
  isObject
  isString
  isArray
  isDefined
} from "@dashkite/joy/type"

import { generic } from "@dashkite/joy/generic"

# The author of tweetnacl-js strongly recommends his stablelib modules, but
# be careful with the encode-decode name convention.
import { encode as decodeUTF8, decode as encodeUTF8 } from "@dashkite/utf8"
import { decode as decodeBase64, encode as encodeBase64 } from "@dashkite/base64"

# TODO this predicate should exist within Joy
# (this is different than the deep equality function)
equal = curry (a, b) -> a == b

fromJSON = (json) -> JSON.parse json
toJSON = (value) -> JSON.stringify value

# Apply isType to a collection.
areType = curry (typeCheck, array) ->
  return false unless isArray array
  for item in array
    return false unless typeCheck item
  true

isBytes = isType Uint8Array

supportedEncodings = ["bytes", "utf8", "base64", "safe-base64"]
isSupportedEncoding = (x) -> x in supportedEncodings

hint =
  isBytes: equal "bytes"
  isUTF8: equal "utf8"
  isBase64: equal "base64"
  isSafeBase64: equal "safe-base64"

# decode takes an input and breaks it down to a byte array.
decode = generic
  name: "decode"
  description: "Uses an encoding hint to decode a given string into a
    byte array. NoOp on bytes."

generic decode, hint.isBytes, isBytes,
  (_, bytes) -> bytes  # no op, but enforcing bytes type

generic decode, hint.isUTF8, isString,
  (_, string) -> decodeUTF8 string

generic decode, hint.isBase64, isString,
  (_, string) -> decodeBase64 string

generic decode, hint.isSafeBase64, isString,
  (_, string) ->
    # Based on RFC 4648's "base64url" mapping:
    # https://tools.ietf.org/html/rfc4648#section-5
    padding =
      switch string.length % 4
        when 3 then "="
        when 2 then "=="
        else ""
    decodeBase64 string.replace(/\-/g, '+').replace(/\_/g, '/') + padding

# encode takes a byte array and formats it according to the hint.
encode = generic
  name: "encode"
  description: "Encodes a given byte array using an encoding hint."

generic encode, hint.isBytes, isBytes,
  (_, bytes) -> bytes  # no op, but enforcing bytes type

generic encode, hint.isUTF8, isBytes,
  (_, bytes) ->  encodeUTF8 bytes

generic encode, hint.isBase64, isBytes,
  (_, bytes) ->  encodeBase64 bytes

generic encode, hint.isSafeBase64, isBytes,
  (_, bytes) ->
    # Based on RFC 4648's "base64url" mapping:
    # https://tools.ietf.org/html/rfc4648#section-5
    encode "base64", bytes
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=+$/, '')

# convert takes a piece of data and converts it by using decode to get bytes,
# then encode to get the final format.
convert = curry (hints, value) ->
  encode hints.to, decode hints.from, value

export {
  fromJSON
  toJSON
  convert
  isBytes
  supportedEncodings
  isSupportedEncoding
  areType
}

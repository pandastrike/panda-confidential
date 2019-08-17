import {unary, curry} from "panda-garden"
import {isType, isObject, isString, isArray, eq, isDefined, toJSON} from "panda-parchment"
import Method from "panda-generics"

# The author of tweetnacl-js strongly recommends his stablelib modules, but
# be careful with the encode-decode name convention.
import {encode as decodeUTF8, decode as encodeUTF8} from "@stablelib/utf8"
import {decode as decodeBase64, encode as encodeBase64} from "@stablelib/base64"

# Apply isType to a collection.
areType = curry (typeCheck, array) ->
  return false unless isArray array
  for item in array
    return false unless typeCheck item
  true

isBytes = isType Uint8Array

allowedHints = ["bytes", "utf8", "base64", "safe-base64"]
isAllowedHint = (x) -> x in allowedHints

hint =
  isBytes: eq "bytes"
  isUTF8: eq "utf8"
  isBase64: eq "base64"
  isSafeBase64: eq "safe-base64"


# decode takes an input and breaks it down to a byte array.
decode = Method.create
  name: "decode"
  description: "Uses an encoding hint to decode a given string into a
    byte array. NoOp on bytes."

Method.define decode, hint.isBytes, isBytes,
  (_, bytes) -> bytes  # no op, but enforcing bytes type

Method.define decode, hint.isUTF8, isString,
  (_, string) -> decodeUTF8 string

Method.define decode, hint.isBase64, isString,
  (_, string) -> decodeBase64 string

Method.define decode, hint.isSafeBase64, isString,
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
encode = Method.create
  name: "encode"
  description: "Encodes a given byte array using an encoding hint."

Method.define encode, hint.isBytes, isBytes,
  (_, bytes) -> bytes  # no op, but enforcing bytes type

Method.define encode, hint.isUTF8, isBytes,
  (_, bytes) ->  encodeUTF8 bytes

Method.define encode, hint.isBase64, isBytes,
  (_, bytes) ->  encodeBase64 bytes

Method.define encode, hint.isSafeBase64, isBytes,
  (_, bytes) ->
    # Based on RFC 4648's "base64url" mapping:
    # https://tools.ietf.org/html/rfc4648#section-5
    encode "base64", bytes
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=+$/, '')



isHint = Method.create
  name: "isHint"
  description: "Checks to see if the arugment is a valid hint."

Method.define isHint, isAllowedHint, isAllowedHint,
  -> true

Method.define isHint, eq,
  (_from, to) ->
    throw new Error "panda-confidential::convert -
      'from' (#{_from}) and 'to' (#{to}) hints cannot be identical."

Method.define isHint, isObject,
  ({from:_from, to}) -> isHint _from, to

# convert takes a piece of data and converts it by using decode to get bytes,
# then encode to get the final format.
convert = Method.create
  name: "convert"
  description: "Converts data from one form to another according to a hint."

Method.define convert, (unary isHint), isDefined,
  ({from: _from, to}, value) -> encode to, decode _from, value


export {
  convert
  isBytes
  isAllowedHint
  areType
}

import nacl from "tweetnacl-util"
import {unary} from "panda-garden"
import {isType, isObject, isString, eq, isDefined} from "panda-parchment"
import {Method} from "panda-generics"

{decodeBase64, decodeUTF8, encodeBase64, encodeUTF8} = nacl

isBytes = isType Uint8Array

allowedHints = ["bytes", "utf8", "base64", "safe-base64"]
isAllowedHint = (x) -> x in allowedHints

hint =
  isBytes: eq "bytes"
  isUTF8: eq "utf8"
  isBase64: eq "base64"
  isSafeBase64: eq "safe-base64"


# decode takes an input and breaks it down to a byte array.
decode = Method.create default: (args...) ->
  throw new Error "panda-confidential::convert::decode -
    Confirm your data type matches the hint.
    No matches on #{JSON.stringify args}"

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
    decodeBase64 string.replace(/\-/g, '+').replace(/\_//g, '/') + padding


# encode takes a byte array and formats it according to the hint.
encode = Method.create default: (args...) ->
  throw new Error "panda-confidential::convert::encode -
    Confirm your data type matches the hint.
    No matches on #{JSON.stringify args}"

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



isHint = Method.create default: (args...) ->
  throw new Error "panda-confidential::convert:: - invalid hint:
    no matches on #{JSON.stringify args}"

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
convert = Method.create default: (args...) ->
  throw new Error "panda-confidential::convert:: -
    no matches on #{JSON.stringify args}"

Method.define convert, (unary isHint), isDefined,
  ({from: _from, to}, value) -> encode to, decode _from, value


export {
  convert
  isBytes
}

import nacl from "tweetnacl-util"
import {isType, isBuffer, isString} from "panda-parchment"
import {Method} from "panda-generics"

{decodeBase64, decodeUTF8, encodeBase64, encodeUTF8} = nacl

isEqual = (x) -> (y) -> x == y
hint =
  isBytes: isEqual "bytes"
  isUTF8: isEqual "utf8"
  isBase64: isEqual "base64"
  isSafeBase64: isEqual "safe-base64"

isUint8Array = isType Uint8Array
isBytes = (x) -> isBuffer(x) || isUint8Array(x)
isAny = (x) -> true

decode = Method.create default: (args...) ->
  throw new Error "panda-confidential::convert::decode no matches on #{JSON.stringify args}"
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
    modulo =
      switch string.length % 4
        when 3 then "="
        when 2 then "=="
        else ""
    decodeBase64 string.replace(/\-/g, '+').replace(/\_//g, '/') + modulo

encode = Method.create default: (args...) ->
  throw new Error "panda-confidential::convert::encode no matches on #{JSON.stringify args}"
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


allowedHints = ["bytes", "utf8", "base64", "safe-base64"]

convert = ({from: _from, to}, value) ->
  if !_from?
    throw new Error "panda-confidential::convert - must provide 'from' hint"

  if _from not in allowedHints
    throw new Error "panda-confidential::convert - hint from = '#{_from}' not recognized"

  if !to?
    throw new Error "panda-confidential::convert - must provide 'to' hint"

  if to not in allowedHints
    throw new Error "panda-confidential::convert - hint to = '#{_from}' not recognized"

  if _from == to
    throw new Error "panda-confidential::convert - 'from' (#{_from}) and 'to' (#{to}) hints are not allowed to be identical."

  if _from == "bytes" && !(isBytes value)
    throw new Error "panda-confidential::convert - 'from' hint is '#{_from}', but the input value '#{value}', is type #{typeof value}"

  if _from in ["utf8", "base64", "safe-base64"] && !(isString value)
    throw new Error "panda-confidential::convert - 'from' hint is '#{_from}', but the input value, '#{value}', is type #{typeof value}"

  encode to, decode _from, value



export {
  convert
  isBytes
}

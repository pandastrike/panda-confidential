import nacl from "tweetnacl-util"
import {isType, isBuffer, isString, isObject} from "panda-parchment"
import {Method} from "panda-generics"

{decodeBase64, decodeUTF8, encodeBase64, encodeUTF8} = nacl

isEqual = (x) -> (y) -> x == y
isUTF8 = isEqual "utf8"
isBase64 = isEqual "base64"
isBase64URLSafe = isEqual "base64url"
isBinary = isEqual "binary"

isUint8Array = isType Uint8Array
isData = (x) -> isBuffer(x) || isUint8Array(x)
isAny = (x) -> true

decode = Method.create default: (args...) ->
  throw new Error "Unable to decode string #{args}"
Method.define decode, isUTF8, isString,
  (_, string) -> decodeUTF8 string
Method.define decode, isBase64, isString,
  (_, string) -> decodeBase64 string
Method.define decode, isObject,
  (object) -> decode "utf8", JSON.stringify object
Method.define decode, isAny, isData,
  (_, array) -> array  # no op

encode = Method.create default: (args...) ->
  throw new Error "Unable to encode data #{args}"
Method.define encode, isData,
  (array) -> encodeUTF8 array
Method.define encode, isUTF8, isData,
  (_, array) ->  encodeUTF8 array
Method.define encode, isBase64, isData,
  (_, array) ->  encodeBase64 array
Method.define encode, isUTF8, isString,
  (_, string) ->  encode "utf8", decode "base64", string
Method.define encode, isBase64, isString,
  (_, string) ->  encode "base64", decode "utf8", string
Method.define encode, isBase64, isObject,
  (_, object) ->  encode "base64", decode object
Method.define encode, isObject,
  (object) -> encode "base64", object
Method.define encode, isBase64URLSafe, isAny,
  (_, thing) ->
    # Based on RFC 4648's "base64url" mapping:
    # https://tools.ietf.org/html/rfc4648#section-5
    encode "base64", thing
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=+$/, '')
Method.define encode, isString, isObject,
  (encoding, object) -> encode encoding, decode object
Method.define encode, isBinary, isData,
  (_, array) -> array  # no op

export {
  encode
  decode
  isData
}

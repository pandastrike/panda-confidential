import nacl from "tweetnacl"
import {isString} from "panda-parchment"
import {Method} from "panda-generics"
import {isData, decode} from "../utils"
import {isKey} from "./key"

# Wrap tweetnacl's constant time comparison method for large values.
equal = Method.create()
Method.define equal, isData, isData,
  (x, y) -> nacl.verify x, y
Method.define equal, isData, isString,
  (x, y) -> equal x, decode("base64", y)
Method.define equal, isString, isData,
  (x, y) -> equal decode("base64", x), y
Method.define equal, isString, isString,
  (x, y) -> equal decode("base64", x), decode("base64", y)
Method.define equal, isKey, isData,
  ({key:x}, y) -> equal x, y
Method.define equal, isData, isKey,
  (x, {key:y}) -> equal x, y
Method.define equal, isKey, isString,
  ({key:x}, y) -> equal x, y
Method.define equal, isString, isKey,
  (x, {key:y}) -> equal x, y
Method.define equal, isKey, isKey,
  ({key:x}, {key:y}) -> equal x, y

export default equal

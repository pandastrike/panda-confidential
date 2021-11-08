import { curry } from "@dashkite/joy/function"
import { isType, isArray } from "@dashkite/joy/type"

fromJSON = (json) -> JSON.parse json
toJSON = (value) -> JSON.stringify value

isBytes = isType Uint8Array

# Apply isType to a collection.
areType = curry (typeCheck, array) ->
  return false unless isArray array
  for item in array
    return false unless typeCheck item
  true


export * from "@dashkite/bake"
export {
  fromJSON
  toJSON
  isBytes
  areType
}
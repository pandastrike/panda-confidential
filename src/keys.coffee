import nacl from "tweetnacl"

class Key
  @create: (key) -> new @ key
  constructor: (@key) ->
  @p: (instance) -> isType @, instance

class KMSKey extends Key
class PublicKey extends Key
class PrivateKey extends Key
class SharedKey extends Key
  @create: (description) -> new @ description
  constructor: ({public, private}) ->
     # construct shared key

export {
  KMSKey
  PrivateKey
  PublicKey
  SharedKey
}

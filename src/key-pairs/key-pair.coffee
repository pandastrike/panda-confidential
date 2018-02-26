import {isKind} from "fairmont-helpers"

class KeyPair
  constructor: ({@privateKey, @publicKey}) ->
  dump: -> JSON.stringify
    privateKey: @privateKey.dump()
    publicKey: @publicKey.dump()

isKeyPair = isKind KeyPair

keyPair = (object) -> new KeyPair object

export {KeyPair, keyPair, isKeyPair}

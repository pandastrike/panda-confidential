import {include} from "panda-parchment"
import Key from "./key"
import PublicKey from "./public"
import PrivateKey from "./private"
import sharedKey from "./shared"
import symmetricKey from "./symmetric"

keys = (confidential) ->
  SharedKey = sharedKey confidential
  SymmetricKey = symmetricKey confidential
  include confidential, {Key, PublicKey, PrivateKey, SharedKey, SymmetricKey}

export default keys

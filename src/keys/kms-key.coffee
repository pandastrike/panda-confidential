# This identifies a KMS key by key ID, key Arn, or key alias.
import {isType} from "fairmont-helpers"

class KMSKeyID
  constructor: (@id) ->

kmsKeyID = (id) -> new KMSKeyID id

isKMSKeyID = isType KMSKeyID

export {kmsKeyID, isKMSKeyID}

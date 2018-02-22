import Sundog from "sundog"

import secretKey from "./secret-key"
import PUBLIC_KEY from "./public-key"
import scalar from "./scalar"
import signature from "./signature"
#import hash from "./hash"
#import utility from "./utility"

Confidential = (SDK) ->
  {AWS} = Sundog SDK
  {publicKey, sharedPublicKey} = PUBLIC_KEY AWS

  Object.defineProperties {},
    SecretKey:
      enumerable: true
      get: -> secretKey AWS
    PublicKey:
      enumerable: true
      get: -> publicKey
    SharedPublicKey:
      enumerable: true
      get: -> sharedPublicKey
    Scalar:
      enumerable: true
      get: -> scalar()
    Signature:
      enumerable: true
      get: -> signature AWS
    # Hash:
    #   enumerable: true
    #   get: -> hash()
    # Random:
    #   enumerable: true
    #   get: -> AWS.KMS.randomKey
    # Utility:
    #   enumerable: true
    #   get: -> utility()


export default Confidential

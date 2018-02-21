import Sundog from "sundog"

import secretKey from "./secret-key"
#import PUBLIC_KEY from "./public-key"
#import scalar from "./scalar"
#import signature from "./signature"
#import hash from "./hash"
#import utility from "./utility"

Confidential = (SDK) ->
  {AWS} = Sundog SDK
  #{publicKey, sharedPublicKey} = PUBLIC_KEY AWS

  Object.defineProperties {},
    secretKey:
      enumerable: true
      get: -> secretKey AWS
    # publicKey:
    #   enumerable: true
    #   get: -> publicKey
    # sharedPublicKey:
    #   enumerable: true
    #   get: -> sharedPublicKey
    # scalar:
    #   enumerable: true
    #   get: -> scalar()
    # signature:
    #   enumerable: true
    #   get: -> signature AWS
    # hash:
    #   enumerable: true
    #   get: -> hash()
    # random:
    #   enumerable: true
    #   get: -> AWS.KMS.randomKey
    # utility:
    #   enumerable: true
    #   get: -> utility()


export default Confidential

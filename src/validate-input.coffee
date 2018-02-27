import nacl from "tweetnacl"

validate = ({randomBytes, encrypt, decrypt, keyClass, isKeyClass}) ->
  out = {}
  out.randomBytes = randomBytes || nacl.randomBytes

  if encrypt || decrypt || isKeyClass
    if !encrypt || !decrypt || !isKeyClass
      throw new Error "Must supply methods encrypt, decrypt, and iskeyClass to use extended symmetric encryption scheme."
    out.externalEncrypter = {encrypt, decrypt}
    out.isExternalKeyClass = isKeyClass
  else
    out.externalEncrypter = false
    out.isExternalKeyClass = false

  out

export default validate

import nacl from "tweetnacl"

verify = ({message, encoding, publicKeys, signatures}) ->
  if publicKeys.length != signatures.length
    return false

  # Run through list of signatures and public keys and verify.
  for i in [0...publicKeys.length]
    if !nacl.sign.detached.verify message, signatures[i], publicKeys[i]
      return false

  true # Verification completed successfully.

export {verify}

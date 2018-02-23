# There are a series of byte length constants Confidential needs to reference, collected here for convenience.

encryption =
  symmetric:
    implementation: "xsalsa20-poly1305"
    keyLength: 32
    nonceLength: 24
    overheadLength: 16
  asymmetric:
    implementation: "x25519-xsalsa20-poly1305"
    publicKeyLength: 32
    privateKeyLength: 32
    sharedKeyLength: 32
    nonceLength: 24
    overheadLength: 16

signing =
  implementation: "ed25519"
  seedLength: 32
  publicKeyLength: 32
  privateKeyLength: 64
  signatureLength: 64

export {encryption, signing}

import assert from "assert"
import {test, print} from "amen"
import {confidential} from "../../../src/index"
import nacl from "tweetnacl"

Signature = ->
  {sign, verify, SignatureKeyPair, PrivateKey, PublicKey, Declaration, Message, convert} = confidential()

  # Test Key Pair Generation
  A = {privateKey, publicKey} = await SignatureKeyPair.create()
  assert (PrivateKey.isType privateKey), "bad private key"
  assert (PublicKey.isType publicKey), "bad public key"
  assert privateKey.key.length == nacl.sign.secretKeyLength,
    "private key is improper length"
  assert publicKey.key.length == nacl.sign.publicKeyLength,
    "public key is improper length"


  # Test Encrypt - Decrypt Cycle
  B = await SignatureKeyPair.create()

  string = "Hello World!"
  message = Message.from "utf8", string
  assert (Message.isType message), "bad message"

  ## Case 1
  ################################
  # Person A signs a message.
  declaration = sign A.privateKey, A.publicKey, message
  assert (Declaration.isType declaration), "bad declaration"
  assert.equal(
    declaration.message.to "utf8"
    string
    "bad declaration: message must be intact"
  )
  assert.equal(
    declaration.signatories[0].to "base64"
    A.publicKey.to "base64"
    "bad declaration: signatory's public key is incorrect"
  )

  serialized = declaration.to "base64"

  # Person B uses A's public key to verify and open the message.
  declaration = Declaration.from "base64", serialized
  assert (verify declaration) == true, "failed to verify"

  # Negative test.
  declaration.signatories = [B.publicKey]
  assert (verify declaration) == false, "signature negative test failure"



  ## Case 2
  ################################
  # Person A and B sign a message with key pairs.
  declaration = sign A, message
  sign B, declaration
  assert (Declaration.isType declaration), "bad declaration"
  assert.equal(
    declaration.message.to "utf8"
    string
    "bad declaration: message must be intact"
  )
  assert.equal(
    declaration.signatories[0].to "base64"
    A.publicKey.to "base64"
    "bad declaration: signatory A's public key is incorrect"
  )
  assert.equal(
    declaration.signatories[1].to "base64"
    B.publicKey.to "base64"
    "bad declaration: signatory B's public key is incorrect"
  )

  serialized = declaration.to "base64"

  # Person C verifies the message from both.
  declaration = Declaration.from "base64", serialized
  assert (verify declaration) == true, "failed to verify"

export default Signature

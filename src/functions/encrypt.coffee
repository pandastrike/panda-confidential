import nacl from "tweetnacl"
import {toJSON} from "panda-parchment"
import {Method} from "panda-generics"

Encrypt = ({randomBytes, SymmetricKey, SharedKey, SharedKeySet,
  EncryptionKeyPair, PublicKey, PrivateKey,
  Message, Nonce, Ciphertext, Envelope}) ->

  # Define a multimethod to export.
  encrypt = Method.create default: (args...) ->
    throw new Error "panda-confidential::encrypt no matches on #{toJSON args}"

  # Symmetric Encryption
  Method.define encrypt, SymmetricKey.isType, Nonce.isType, Message.isType,
    (key, nonce, message) ->
      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          key.to "bytes"
        )

      Promise.resolve Envelope.create {ciphertext, nonce}

  Method.define encrypt, SymmetricKey.isType, Message.isType,
    (key, message) ->
      nonce = Nonce.from "bytes", await randomBytes nacl.secretbox.nonceLength
      encrypt key, nonce, message


  # Asymmetric Encryption
  getNonce = -> Nonce.from "bytes", await randomBytes nacl.box.nonceLength

  Method.define encrypt, SharedKeySet.isType, Nonce.isType, Message.isType,
    (keySet, nonce, message) ->
      {sharedKey, source, recipient} = keySet

      ciphertext = Ciphertext.from "bytes",
        nacl.secretbox(
          message.to "bytes"
          nonce.to "bytes"
          sharedKey.to "bytes"
        )

      Promise.resolve Envelope.create {ciphertext, nonce, source, recipient}

  Method.define encrypt, SharedKeySet.isType, Message.isType,
    (keySet, message) ->
      encrypt keySet, await getNonce(), message

  Method.define encrypt, EncryptionKeyPair.isType, Nonce.isType, Message.isType,
    (keyPair, nonce, message) ->
      encrypt (SharedKeySet.create keyPair, keyPair.publicKey), nonce, message

  Method.define encrypt, EncryptionKeyPair.isType, Message.isType,
    (keyPair, message) ->
      encrypt keyPair, await getNonce(), message

  Method.define encrypt,
    EncryptionKeyPair.isType, PublicKey.isType, Nonce.isType, Message.isType,
    (keyPair, publicKey, nonce, message) ->
      encrypt (SharedKeySet.create keyPair, publicKey), nonce, message

  Method.define encrypt,
    EncryptionKeyPair.isType, PublicKey.isType, Message.isType,
    (keyPair, publicKey, message) ->
      encrypt keyPair, publicKey, await getNonce(), message

  # Return the multimethod.
  encrypt

export default Encrypt

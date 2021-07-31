# Using Panda Confidential
Cryptography is hard. Confidential aims to make that easier. Let's look at some common scenarios to see how.

_Please see the [full API documentation][api-docs] for more detailed information._

# Contents
- [Getting Started](#getting-started)
- [Symmetric Encryption and Decryption](#symmetric-encrytion-and-decryption)
- [Authenticated Asymmetric Encryption and Decryption](#authenticated-asymmetric-encrytion-and-decryption)
- [Signing and Verifying Messages](#signing-and-verifying-messages)
- [Using Confidential With AWS KMS](#using-confidential-with-aws-kms)

## Getting Started
Install Panda-Confidential with npm, and use your favorite bundler to get it into the browser.

```shell
$ npm i -s panda-confidential
```

Import the library and instantiate a new instance.  

```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{encrypt, decrypt, key} = confidential()
```

Because Panda-Confidential is extensible, it uses instantiation to prevent any unexpected changes by third parties. Once you have an instance, you can destructure its properties and get going!

Panda-confidential wraps the TweetNaCl.js interface with pairs of functions:
1. `encrypt` and `decrypt`
2. `sign` and `verify`
3. `encode` and `decode`

These functions are [_generics_][generics], accepting multiple kinds of inputs to decide what action to take.  But, the details—like key length, robust randomness, algorithm, etc — are all handled by TweetNaCl.js.

Panda-Confidential establishes a key type system, and the above generics use those to determine your intention in a clear and error-free way.  That is, you can't use a key for an operation it's not designed for.

There are four types of keys:
- SymmetricKey
- PrivateKey
- PublicKey
- SharedKey

And two types of key pairs.
- EncryptionKeyPair
- SignatureKeyPair

_Please see the [full API documentation][api-docs] for more detailed information._

[generics]: https://en.wikipedia.org/wiki/Generic_programming
[api-docs]:https://github.com/pandastrike/panda-confidential/blob/master/API.md

## Symmetric Encryption and Decryption
Alice would like to encrypt her data at rest.  This calls for [symmetric encryption][symmetric-encryption], allowing Alice to encrypt and decrypt private data with the same key.

```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{key, encrypt, decrypt} = confidential()

do ->

  # Generate a symmetric key.
  aliceKey = await key.symmetric()

  # Alice encrypts her data.
  message = "Hello World!"
  ciphertext = await encrypt aliceKey, message

  # Some time later, Alice decrypts that ciphertext with the same key.
  result = decrypt aliceKey, ciphertext
  result == message   # true
```

To perform symmetric encryption, we need an instance of `SymmetricKey`, which we can create through its constructor `key.symmetric`. If we already have a key, we can create a SymmetricKey by passing it to the constructor. If we want a _new_ key, we can invoke the constructor without arguments to have Panda-Confidential generate an appropriate key.

We pass our SymmetricKey and the plaintext to `encrypt`. Under the hood, Panda-Confidential uses the [TweetNaCl.js `secret-box` function][tweetnacl-secretbox]. `encrypt` returns the Base64 encoded ciphertext.

`decrypt` is the inverse of `encrypt` and works just as simply. When we are ready to retrieve the original plaintext, we pass the same `SymmetricKey` to `decrypt`, along with the ciphertext to return the original plaintext.


## Authenticated Asymmetric Encryption and Decryption
Alice would like to securely send a message to Bob.  This calls for [asymmetric encryption][pke], allowing Alice to encrypt a message only Bob can decrypt. We also want _authentication_, to make sure Bob can confirm that the message really came from Alice.

```coffeescript
import assert from "@dashkite/assert"
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{keyPair, key, encrypt, decrypt} = confidential()

do ->
  # Come up with key-pairs for Alice and Bob.
  alice = await keyPair.encryption()
  bob = await keyPair.encryption()

  # Alice authenticates with her private key and encrypts with Bob's public key.
  # Combine them into a SharedKey instance.
  fromAliceToBob = key.shared Alice.privateKey, Bob.publicKey

  # Alice encrypts her data.
  message = "Hello World!"
  ciphertext = await encrypt fromAliceToBob, message


  # Some time later, Bob gets the ciphertext...

  # Bob verifies the authentication with his private key and Alice's public key
  toBobFromAlice = key.shared Alice.publicKey, Bob.privateKey
  
  # Each will independently be able to derive the same key
  assert.equal toBobFromAlice.encode(), fromAliceToBob.encode()

  # Bob decrypts the ciphertext he recieved.
  assert.equal message, decrypt toBobFromAlice, ciphertext
```

For asymmetric encryption, we need to key pairs for both parties. Each key pair has a public key (`PublicKey`) and a private key (`PrivateKey`). If we already have a key-pair, we can create a `PublicKey` and a `PrivateKey` by passing the key to the constructors `key.public` and `key.private`, respectively. If we want a _new_ key-pair, we can invoke the constructor `keyPair.encryption` without arguments.  This provides a key-pair suitable for encryption, (but _not_ for [signing](#signing-and-verifying-messages)).

#### Authentication Comes Standard
TweetNaCl.js enforces the best-practice of combining encryption with authentication through the use of the `SharedKey`. Alice uses her `PrivateKey` and Bob's `PublicKey`. Meanwhile, Bob uses his `PrivateKey` and Alice's `PublicKey`. The `key.shared` constructor yields the same, shared secret for both. Bob can be confident the message is from Alice because the `SharedKey` can only have been constructed using Alice or Bob's private keys.

We pass the `SharedKey` and the message to `encrypt`.  Under the hood, Panda-Confidential is uses the [TweetNaCl.js `box` function][tweetnacl-box], returning Base64 encoded ciphertext.

`decrypt` is the inverse `encrypt` and works just as simply. Bob creates the `SharedKey` and passes it and the ciphertext to `decrypt`, returning the original message.


## Signing and Verifying Messages
Alice wishes to publish a message and allow others to verify that the message is authentic. We can do this with a [digitial signature][digitial-signature].

```coffeescript
import assert from "@dashkite/assert"
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{keyPair, sign, verify} = confidential()

do ->
  # Come up with signing key-pairs for Alice and Bob.
  Alice = await keyPair.signature()
  Bob = await keyPair.signature()

  # Alice signs her message.
  message = "Hello World!"
  signed = sign Alice, message
  blob = signed.encode()  # You can output Base64 string for transport


  # Some time later, Bob looks at the signed message...

  # Bob would like to verify that Alice truly signed this message.
  assert.equal true, verify signed

  # Bob decides to also sign the message
  signed = sign Bob, signed

  # Some time later, Charlotte verfies the signatures from Alice and Bob.
  asset.equal true, verify signed
```

You'll need a signing key pair (a public and private key) to sign a message. [We use a different constructor for signing key pairs than for asymmetric encryption key pairs.](#why-signing-key-pairs-are-different) If we already have a key-pair, we can create a `PublicKey` and a `PrivateKey` by passing the key to the constructors `key.public` and `key.private`, respectively. If we want a _new_ key-pair, we can invoke the constructor `keyPair.signature` without arguments.  This provides a key-pair suitable for signing, but _not_ encryption.

To sign a message, we just need to pass signing public and private keys (or together as a key-pair) and the message to `sign`. Under the hood, Panda-Confidential is uses the [TweetNaCl.js `sign` function][tweetnacl-sign]. `sign` returns an instance of `SignedMessage`, containing both the original message, the signature(s) generated with the `PrivateKey`(s), and the `PublicKey`(s) needed to verify the signature(s). Multiple people can sign a single message, so just pass a `SignedMessage` instance to `sign` to add on signatures.

Use `verify` to check the signatures added to a message with `sign`.  Everything needed for verification is contained within an instance of SignedMessage, so just pass it to `verify`. `verify` returns the boolean result of the verification of _all_ signatures.

While `verify` confirms the self-consistency of the `SignedMessage`, it does not guarantee that the public keys within belong to the people claimed.  It is up to you to compare the public keys listed in a `SignedMessage` to the public record of their identity. It also does not encrypt the message.

### Why Signing Key Pairs Are Different

Signature key pairs are only as disposable as the signatures they're used to create, whereas key pairs for asymmetric encryption can (and probably should) have shorter lifespans. TweetNaCl.js enforces this best practice by making the two types of key pairs incompatible, and that is carried through into the Confidential API.

## Using Confidential With AWS KMS

We've extended Confidential for use with the AWS Key Management System API. Please check out our GitHub repository for [panda-confidential-kms][] to learn more.

[api-docs]:https://github.com/pandastrike/panda-confidential/blob/master/API.md
[symmetric-encryption]: https://en.wikipedia.org/wiki/Symmetric-key_algorithm
[pke]: https://en.wikipedia.org/wiki/Public-key_cryptography
[digitial-signature]: https://en.wikipedia.org/wiki/Digital_signature

[tweetnacl-secretbox]: https://github.com/dchest/tweetnacl-js#secret-key-authenticated-encryption-secretbox
[tweetnacl-box]:https://github.com/dchest/tweetnacl-js#public-key-authenticated-encryption-box
[tweetnacl-sign]:https://github.com/dchest/tweetnacl-js#signatures

[panda-confidential-kms]:https://github.com/pandastrike/panda-confidential-kms

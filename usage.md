# Using Panda-Confidential
Cryptography is hard.  But panda-confidential (and the stack it relies on) is so powerful, it can be jarring to see how simple it is to use.

Panda-confidential wraps the TweetNaCl.js interface with pairs of opposing functions:
1. `encrypt` and `decrypt`
2. `sign` and `verify`
3. `encode` and `decode`

These functions are [_generics_][generics], accepting multiple kinds of inputs to decide what action to take.  Panda-Confidential establishes a key type system the generics use to determine your intention in a clear and error-free way.  But, the details -- the kinds of things that are easy to get wrong in ways that are hard to detect: like key length, robust randomness, algorithm, etc -- are all handled by TweetNaCl.js.

[generics]: https://en.wikipedia.org/wiki/Generic_programming


What follows is a walkthrough of some common use-cases for panda-confidential. Please see the [full API documentation][api-docs] for more detailed information about any function or type you see below.

# Contents
- [Getting Started](#getting-started)
- [Symmetric Encryption and Decryption](#symmetric-encrytion-and-decryption)
- [Asymmetric Encryption and Decryption](#asymmetric-encrytion-and-decryption)
- [Signing and Verifying Messages](#signing-and-verifying-messages)

## Getting Started

Install panda-confidential with npm, and use your favorite bundler to get it into the browser.

```
npm install panda-confidential --save
```

When you import library into your code, grab the `confidential` submodule directly.  

```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{encrypt, decrypt, key} = confidential()
```
Also, because panda-confidential is extensible, is uses instantiation to prevent any unexpected changes by third parties.  Once you have an instance, you can destructure its properties and get going!

## Symmetric Encryption and Decryption
Here is our scenario: We want to build an app that lets a person write notes that are backed up in the cloud.  One of the requirements is that the data gets encrypted before it is sent to the datastore. Here's our first version.

### Encryption
```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{encode, randomBytes, key, encrypt} = confidential()

saveNote = (accountID, note) ->
  # Generate an unguessable id for this note.
  noteID = encode "base64", await randomBytes 16

  # Fetch or generate symmetric encryption key for account.
  if personalKey = await getKeyFromAccount accountID
    key.Symmetric personalKey
  else
    personalKey = await key.Symmetric()
    await createAccount accountID, personalKey.dump()

  # Encrypt this person's note.
  encryptedNote = await encrypt personalKey, note

  # Ship the ciphertext to our datastore.
  await DB.save noteID, encryptedNote
```

Set aside the details for getting account information or storing the note ciphertext. In just a few lines of code, we are able to use [symmetric encryption][symmetric-encryption] to encrypt this person's private data.

We start by generating a random id for this note.  TweetNaCl.js provides a way to get [robust randomness regardless of platform][tweetnacl-randombytes].  Because `randomBytes` returns an Uint8Array, we need to `encode` it to be a Base64 string.

We need an instance of SymmetricKey to use symmetric encryption.  We access its constructor through `key.Symmetric`.  If we are able to retieve a key from this person's account, we simply pass in the value to the constructor.  If the person's account does not exist or does not have an encryption key, we invoke the constructor without arguments to have panda-confidential generate an appropriate key.

We encrypt by simply passing the SymmetricKey and the text of the note to `encrypt`.  Under the hood, panda-confidential is uses the [TweetNaCl.js implementation of symmetric encryption][tweetnacl-secretbox], but you don't need to sweat the details.  The result of `encrypt` is a Base64 encoded string ciphertext that we can store in a database.

### Decryption
We also need a method to retrieve encrypted data from the datastore.

```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{key, decrypt} = confidential()

getNote = (accountID, noteID) ->
  # Fetch symmetric encryption key for account.
  if personalKey = key.Symmetric await getKeyFromAccount accountID

  # Fetch the ciphertext from our datastore.
  encryptedNote = await DB.get noteID

  # Return this person's decrypted note.
  await decrypt personalKey, encryptedNote
```

`decrypt` opposes `encrypt` and works just as simply.

We need an instance of SymmetricKey to use symmetric encryption.  We again access its constructor through `key.Symmetric` and pass in the key value we fetch from this person's account.

We pass both the SymmetricKey and the encrypted note to `decrypt` and get back the original note.

## Asymmetric Encryption and Decryption
We add a new requirement to our app.  Now we need to let people share notes, and do so securely.

### Encryption
```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{keyPair, key, encrypt} = confidential()

shareNote = (senderAccountID, recipientAccountID, noteID) ->
  # Fetch the stored note the sender wants to share.
  note = getNote senderAccountID, noteID

  # Fetch or generate an encryption key-pair for account.
  if senderPrivateKey = await getPrivateKeyFromAccount senderAccountID
    senderPrivateKey = key.Private senderPrivateKey
  else
    senderKeyPair = await key.Encryption()
    await createAccount senderAccountID, senderKeyPair.dump()
    {privateKey:senderPrivateKey} = senderKeyPair

  # Fetch the recipient's _public_ key
  recipientPublicKey = await getPublicKeyFromAccount recipientAccountID
  recipientPublicKey = key.Public recipientPublicKey

  # Encrypt the note so only the recipient may decrypt.
  KEY = key.Shared senderPrivateKey, recipientPublicKey
  encryptedNote = await encrypt KEY, note

  # Send the ciphertext to the recipient.
  await sendEncryptedNote recipientAccountID, encryptedNote
```

Set aside the details for getting account information or sending the note between people.  To keep this discussion clear, consider two people using the app: Alice and Bob.

In these few lines of code, we perform [asymmetric cryptography][pke] to allow Alice to encrypt her note so that only Bob may decrypt it.  Alice also authenticates her note, so Bob can be sure that Alice is the one that did the encryption.

Asymmetric cryptography uses key-pairs, one public and one private, for each person involved.  If Alice's account does not exist or have a key-pair, we may construct one using `keyPair.Encryption()`.

To accomplish the dual goals of asymmetric encryption _and_ authentication in a clear way, TweetNaCl.js requires a special key.  Using the private key from Alice and the public key from Bob, it forms a new, shared key.  On Bob's end, he can use Alice's _public_ key and his _private_ key to generate the _same_ shared key.  Since only the shared key can decrypt the note, and only Alice's private key can make the shared key on her end, Bob can be confident that Alice encrypted the note.

Panda-Confidential has three additional key types to support that procedure: PublicKey, PrivateKey, and SharedKey.

In our code, we gather the private key from Alice (as an instance of PrivateKey) and a public key from Bob (as an instance of PublicKey).  Then we use the constructor `key.Shared` to generate a SharedKey to use with `encrypt`.

We encrypt by simply passing the SharedKey and the text of the note to `encrypt`.  Under the hood, panda-confidential is uses the [TweetNaCl.js implementation of asymmetric encryption][tweetnacl-box], returning Base64 encoded string ciphertext that we can safely send over the network.

### Decryption
```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{key, decrypt} = confidential()

handleNote = (senderAccountID, recipientAccountID, encryptedNote) ->
  # Fetch the sender's _public_ key
  senderPublicKey = await getPublicKeyFromAccount senderAccountID
  senderPublicKey = key.Public senderPublicKey

  # Fetch the recipient's _private_ key
  recipientPrivateKey = await getPrivateKeyFromAccount recipientAccountID
  recipientPrivateKey = key.Private recipientPrivateKey

  # Return the sender's decrypted note.
  KEY = key.Shared senderPublicKey, recipientPrivateKey
  await decrypt KEY, encryptedNote
```

`decrypt` opposes `encrypt` and works just as simply.

We again need an instance of SharedKey, but this time we are working on behalf of Bob, so we use Bob's _private_ key and Alice's _public_ key.

We pass both the SharedKey and the encrypted note to `decrypt` and get back the original note.  Bob is able to read the note Alice wrote and be sure she is the one who encrypted it.

## Signing and Verifying Messages
We add one more requirement to our app.  Now we need to let people publish a note and prove it is unaltered.  

### Signing
```coffeescript
import {confidential} from "panda-confidential"

# Instantiate Panda-Confidential
{encode, randomBytes, keyPair, key, encrypt} = confidential()

publishNote = (accountID, noteID) ->
  # Fetch the stored note the sender wants to publish.
  note = getNote accountID, noteID

  # Fetch or generate an signing key-pair for account.
  if AccountKeyPair = await getSigningPairFromAccount accountID
  else
    AccountKeyPair = await key.Signature()
    await createAccount senderAccountID, AccountKeyPair.dump()

  # Sign the note with the private key, include the public key for verification.
  signedNote = await sign AccountKeyPair, note

  # Publish
  await publish AccountID, signedNote
```

Set aside the details for getting account information or publishing.  To keep this discussion clear, consider two people using the app: Alice and Bob.

In these few lines of code, we create a [digitial signature][digitial-signature].  Signing with her private key allows Alice to claim authorship and prevents bad actors from presenting an altered version of the note with attribution to the original author.




[symmetric-encryption]: https://en.wikipedia.org/wiki/Symmetric-key_algorithm
[pke]: https://en.wikipedia.org/wiki/Public-key_cryptography
[digitial-signature]: https://en.wikipedia.org/wiki/Digital_signature


[tweetnacl-randombytes]:https://github.com/dchest/tweetnacl-js#random-bytes-generation
[tweetnacl-secretbox]: https://github.com/dchest/tweetnacl-js#secret-key-authenticated-encryption-secretbox
[tweetnacl-box]:https://github.com/dchest/tweetnacl-js#public-key-authenticated-encryption-box

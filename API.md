# Panda Confidential API

### Functions
- [randomBytes][randombytes]
  - [Overriding randomBytes](#overriding-randombytes)
- [encrypt][encrypt]
- [decrypt][decrypt]
- [sign][sign]
- [verify][verify]
- [encode][encode]
- [decode][decode]
- [hash][hash]
- [signedMessage][signedMessage]
- [isSignedMessage][isSignedMessage]
- [isData][isdata]
- [nacl][nacl]

#### key
- [key.symmetric][SymmetricKey]
- [key.private][PrivateKey]
- [key.public][PublicKey]
- [key.shared][SharedKey]
- [key.isSymmetric][isSymmetric]
- [key.isPrivate][isPrivate]
- [key.isPublic][isPublic]
- [key.isShared][isShared]
- [key.equal][equal]

#### keyPair
- [keyPair.encryption][EncryptionKeyPair]
- [keyPair.signature][SignatureKeyPair]
- [keyPair.isEncryption][isEncryption]
- [keyPair.isSignature][isSignature]

#### Other

### [Classes][classes]
- [Key][classKey]
- [SymmetricKey][classSymmetricKey]
- [PrivateKey][classPrivateKey]
- [PublicKey][classPrivateKey]
- [SharedKey][classSharedKey]
- [KeyPair][classKeyPair]
- [EncryptionKeyPair][classEncryptionKeyPair]
- [SignatureKeyPair][classSignatureKeyPair]
- [SignedMessage][classSignedMessage]

# Functions
## randomBytes

_**randomBytes** length &rarr; bytes_

- _length_ `<integer>`: Length of the output in bytes.
- __Returns__ _bytes_ `<Uint8Array>`: array of _length_ pseudo-random bytes.

**Warning:** Throws when unable to locate a suitable source of entropy.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{randomBytes} = confidential()

randomBytes 32
.then (bytes) ->
  # ...
```

### Overriding `randomBytes`

You may override `randomBytes` by simply reassigning the `randomBytes` property of an instance of the Confidential API.

**Warning:** A robust source of entropy is necessary for encryption. Use this feature with caution.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
import {randomBytes} from "my-library"
c = {key} = confidential()

# Replcae with custom function
c.randomBytes = randomBytes
# my-library randomBytes used in key generation
key.symmetric().then (myKey) ->
  # ...
```

## encrypt
_**encrypt** key, plaintext [, encoding] &rarr; ciphertext-with-nonce_

- _key_ [`<SymmetricKey>`][classSymmetricKey] | [`<SharedKey>`][classSharedKey]: Key to be used in the encryption operation.

- _plaintext_ `<string>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: Data to be encrypted.

- _encoding_: Encoding of the plaintext string. May be any value accepted by [`decode`][decode]. Defaults to `utf8` for strings and is ignored for instances of [`Uint8Array`][Uint8Array] or `Buffer`.

- Returns _ciphertext-with-nonce_: URL-safe Base64 JSON encoded object, suitable for decryption with [`decrypt`][decrypt].

When given a [symmetric key][classSymmetricKey], [`encrypt`][encrypt] uses [symmetric encryption][tweetnacl-secretbox]. When given a [shared key][classSharedKey], [`encrypt`][encrypt] uses [authenticated, asymmetric encryption][tweetnacl-box]. In either case, [`encrypt`][encrypt] generates a random nonce.

**Warning:** The key pairs for signing [do not work for encryption](./usage.md#why-signing-key-pairs-are-different).

### Return Value For `encrypt`

The return value for `encrypt` is encoded as URL-safe Base64 JSON. The encoded object has [`Uint8Array`][Uint8Array] properties `ciphertext` and `nonce`. The `ciphertext` property contains the ciphertext corresponding to the plain text, and the `nonce` property contains a [24 byte][tweetnacl-nonce-length] random nonce.

Since the nonce is included in the result, you do not need to add one. If you wish to use a different nonce, [`decode`][decode] the result, set the `nonce` property, and re-encode it. Confidential supports URL-safe Base64 JSON via the `base64url-json` encoding.

---

##### Example: Symmetric Encryption

```coffeescript
import {confidential} from "panda-confidential"
{encrypt} = confidential()
import {keyLookup} from "my-library"

do ->
  alice = keyLookup "Alice/private"
  ciphertext = await encrypt alice, "Hello, World!"
```


**Warning:** Private keys should only be accessible to their owners.

##### Example: Asymmetric Encryption

```coffeescript
import {confidential} from "panda-confidential"
{key, encrypt} = confidential()
import {keyLookup} from "my-library"

do ->
  alice = keyLookup "Alice/private"
  bob = keyLookup "Bob/public"
  fromAliceToBob = key.shared alice, bob
  ciphertext = await encrypt fromAliceToBob, "Hello, World!"
```

**Warning:** Private keys should only be accessible to their owners.

## decrypt

_**decrypt** key, ciphertext-with-nonce [, encoding] &rarr; plaintext_

- _key_ [`<SymmetricKey>`][classSymmetricKey] | [`<SharedKey>`][classSharedKey]: Key to be used in decryption operation.

- _ciphertext-with-nonce_ `<string>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: URL-safe Base64 JSON encoding an object with properties `ciphertext` and `nonce`. See also: [_The Return Value For `encrypt`_](#the-return-value-for-encrypt).

- _encoding_: Encoding of the plaintext string. May be any value accepted by [`encode`][encode]. Defaults to `utf8`.

- Returns _plaintext_: decrypted ciphertext.

When given a [symmetric key][classSymmetricKey], [`decrypt`][decrypt] uses [symmetric decryption][tweetnacl-secretbox-open]. When given a [shared key][classSharedKey], [`decrypt`][decrypt] uses [authenticated, asymmetric decryption][tweetnacl-box-open-after].

##### Example: Symmetric Decryption

```coffeescript
import {confidential} from "panda-confidential"
{decrypt} = confidential()
import {keyLookup, receiveMessage} from "my-library"

do ->
  alice = keyLookup "Alice/private"
  ciphertext = receiveMessage "Alice"
  plaintext = await decrypt alice, ciphertext
```

##### Example: Asymmetric Decryption

```coffeescript
import {confidential} from "panda-confidential"
{key, decrypt} = confidential()
import {keyLookup, receiveMessage} from "my-library"

do ->
  alice = lookupPublicKey "Alice/public"
  bob = lookupPrivateKey "Bob/private"
  toAliceFromBob = key.shared alice, bob
  ciphertext = receiveMessage "Alice"
  plaintext = await decrypt toAliceFromBob, ciphertext
```

## sign

_**sign** key-pair, message [, encoding] &rarr; signed-message_

_**sign** private-key, public-key, message [, encoding] &rarr; signed-message_

- _key-pair_ [`<SignatureKeyPair>`][classSignatureKeyPair]: The public and private keys with which to sign the Message.

- _private-key_ [`<PrivateKey>`][classPrivateKey]: The private key of the person wishing to sign the message.

- _public-key_ [`<PublicKey>`][classPublicKey]: The public key of the person wishing to sign the message.

- _message_ `<string>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer] | [`<SignedMessage>`][classSignedMessage]: Message to be signed.

- _encoding_ `utf8` | `base64`: Specifies the encoding for _message_. Defaults to `utf8` for strings and is ignored for instances of [`Uint8Array`][Uint8Array] or `Buffer`.

- Returns _signed-message_: An instance of [SignedMessage][classSignedMessage] containing the _message_, its encoding, a list of the public keys of the signatories, and a list of the signatures.

[Signs the given message][tweetnacl-sign] with the given private-signing-key. You may provide a signing key pair, or provide the private and public keys as separate arguments.

**Warning:** The key pairs for signing do not work for encryption.

##### Example: Single Signature

```coffeescript
import {confidential} from "panda-confidential"
{sign} = confidential()

import {keyPairLookup} from "my-library"

do ->
  alice = keyPairLookup "alice/Sign"
  signed = sign alice, "Hello, World!"

  # uses the saved encoding to restore the original message
  message = encode signed.content

  # encode the signed message object itself
  send "Bob", encode "base64url-json", signed
```

Multiple people can sign a message, so `sign` also operates on previously signed messages. The output is the same SignedMessage instance, with an additional signature and matching public key in its lists.

##### Example: Multiple Signatures

```coffeescript
import assert from "assert"
import {confidential} from "panda-confidential"
{sign, signedMessage} = confidential()
import {receiveMessage, keyPairLookup} from "my-library"

do ->
  # convert base64 encoded string to SignedMessage
  message = signedMessage receiveMessage()

  # add Bob's signature
  bob = keyPairLookup "Bob/Sign"
  message = sign bob, message

  assert.equal message.signatures.length, 2
  assert.equal message.publicKeys.length, 2
```

## verify
_**verify** SignedMessage &rarr; Result_

- _SignedMessage_ [`<SignedMessage>`][classSignedMessage]: Signed message to be verified.
- __Returns__ _Result_: The boolean result of the verification process. If the signatures checkout, `true`. Otherwise, `false`.

[Verifies the signatures][tweetnacl-verify] against the original message and the attached public keys. Everything needed to verify message integrity exists within the SignedMessage instance, but it is up to you to verify the public keys are correct.

See [key.equal][equal] for information on key comparison.

**Warning:** The key pairs for signing do not work for encryption.

##### Example

```coffeescript
import {confidential} from "panda-confidential"
{verify, signedMessage} = confidential()
import {receiveMessage} from "my-library"

do ->
  # convert base64 encoded string to SignedMessage
  message = signedMessage receiveMessage()

  if verify message
    # Return verified message.
    message.encodeMessage()
  else
    throw new Error "Unable to verify message signatures."
```

## encode
_**encode** Encoding, Data &rarr; Result_

- _Encoding_ `utf8` | `base64` | `base64url` | `json` | `base64-json` | `base64url-json`: The desired encoding of the Result.
- _Data_ [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer] | `<String>` | `<Object>`: The Data to be encoded.
- __Returns__ _Result_: *Data* encoded with *Encoding*.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{encode} = confidential()

do ->
  assert.equal "Hello, World!",
    encode "utf8", Buffer.from "Hello, World!"

  assert.equal "SGVsbG8sIFdvcmxkIQ==",
    encode "base64", Buffer.from "Hello, World!"
```
## decode
_**decode** Encoding, String &rarr; Result_

- _Encoding_ `utf8` | `base64` | `binary`: The encoding of the input Data.
- _String_ `<String>`: The data to be decoded.
- __Returns__ _Result_: *Data* decoded from *Encoding*.

##### Example

```coffeescript
import {confidential} from "panda-confidential"
{decode, key} = confidential()

do ->
  assert.equal "Hello, World!",
    encode "utf8",
      decode "base64", "SGVsbG8sIFdvcmxkIQ=="
```

## hash
_**hash** Data [, Encoding] &rarr; Hash_

- _Data_ `<String>` | `<Object>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: The data to be hashed. String values are first decoded according to the given encoding. Objects are first encoded as JSON and then decoded into a byte array.
- _Encoding:_ (Optional) The encoding of the string Data input. Defaults to `utf8` . This value is ignored if Data is an Uint8Array, Buffer, or Object.
- __Returns__ _Hash_: A Base64URL encoded string of the SHA-512 hash result.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{hash} = confidential()

do ->
  assert.equal "N015SpXNz9izWZMYX++bo2jxYN\
				ja9DLQi6nx7R5avmzGkpHg+i/g\
				AGpSVw7xjBne9OYXwzzlLvCm5fv\
				jGMsDhw==",
    hash "Hello, World!"
```

## signedMessage
_**signedMessage** Message &rarr; SignedMessage_

- _Message_ `<String>` | `<Object>`: The content of the message.
- __Returns__ _SignedMessage_: This returns an instance of [SignedMessage][classSignedMessage]

This function wraps the constructor for the [SignedMessage][classSignedMessage] class. This is primarily useful for constructing a `SignedMessage` from signed message encoded as URL-safe Base64 JSON.

See [`sign`](#sign) for an example.

## isSignedMessage
_**isSignedMessage** Message &rarr; Boolean_

- _Message_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the object you input, returning `true` if the input is an instance of [SignedMessage][classSignedMessage] and `false` for anything else.

## isData
_**isData** Data &rarr; Boolean_

- _Data_ : The input for this type check.
- __Returns__ _Boolean_: `true` if the input is an instance of [Buffer][Buffer] _or_ [Uint8Array][Uint8Array], and `false` otherwise.

## nacl
This is the TweetNaCl.js package imported by panda-confidential. Unlike [`randomBytes`][], reassigning this value does not alter the behavior of the Confidential API.

## Key Type System

Confidential defines JavaScript types to specialize the behavior of its API for different kinds of keys and key pairs. These classes, and corresponding creation functions, are properties of the Key object.

## Key

### Key.symmetric

_**key.symmetric** [Key] &rarr; SymmetricKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: (Optional) A key value literal for this key. May be a Base64 encoded string or a byte array.
- __Returns__ _SymmetricKey_: instance of a Symmetric Key.

When you invoke this function without passing any arguments, panda-confidential will generate a key for you suitable for symmetric encryption. Though the default TweetNaCl.js implementation of randomBytes is synchronous, panda-confidential wraps it with a promise to allow extension via an asynchronous means.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a symmetric key from a key literal.
  key1 = key.symmetric "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="

  # Or generate a key from randomBytes
  key2 = await key.symmetric()
```


### key.private
_**key.private** Key &rarr; PrivateKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: A key value literal for this key. May be a Base64 encoded string or a binary array.
- __Returns__ _PrivateKey_: This returns an instance of [PrivateKey][classPrivateKey]

This is one half of a key pair. The key literal argument is required. See [`keyPair.Encryption`][EncryptionKeyPair] or [`keyPair.Signature`][SignatureKeyPair] for information about generating this kind of key from `randomBytes`.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a Private key from a key literal.
  key1 = key.private "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="
```


### key.public
_**key.public** Key &rarr; PublicKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: A key value literal for this key. May be a Base64 encoded string or a binary array.
- __Returns__ _PublicKey_: This returns an instance of [PublicKey][classPublicKey]

This is one half of a key pair. The key literal argument is required. See [`keyPair.Encryption`][EncryptionKeyPair] or [`keyPair.Signature`][SignatureKeyPair] for information about generating this kind of key from `randomBytes`.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a Public key from a key literal.
  key1 = key.public "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="
```


### key.shared
_**key.shared** Key1, Key2 &rarr; SharedKey_

_**key.shared** Key &rarr; SharedKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: A key value literal for this key. May be a Base64 encoded string or a binary array.
- _Key1_ [`<PrivateKey>`][classPrivateKey] | [`<PublicKey>`][classPublicKey]: A public or private key instance used in the formation of the shared key. If this one is private, the other must be a public key. Or vice versa.
- _Key2_ [`<PublicKey>`][classPublicKey] | [`<PrivateKey>`][classPrivateKey]: A public or private key instance used in the formation of the shared key. If this one is private, the other must be a public key. Or vice versa.
- __Returns__ _SharedKey_: This returns an instance of [SharedKey][classSharedKey]

This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box]. It is a special key formed by using one person's private key and another's public key, yielding a shared secret.

To use this method you may either:
1. Pass in a key literal, like the other keys
2. Pass in a private key from person A and a public key from person B to [algorithmically generate a shared secret][tweetnacl-box-before]

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, keyPair} = confidential()

do ->
  # Generate encryption key pairs for persons A and B.
  A = await keyPair.encryption()
  B = await keyPair.encryption()
  shared = key.shared A.privateKey, B.publicKey
```


### key.isSymmetric
_**key.isSymmetric** Key &rarr; Boolean_

- _Key_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [SymmetricKey][classSymmetricKey] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a symmetric key.
  myKey = await key.symmetric()

  # Type check
  key.isSymmetric myKey     # true
  key.isSymmetric "foobar"  # false
```


### key.isPrivate
_**key.isPrivate** Key &rarr; Boolean_

- _Key_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [PrivateKey][classPrivateKey] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, keyPair} = confidential()

do ->
  # Generate an encryption key-pair.
  {privateKey} = await keyPair.encryption()

  # Type check
  key.isPrivate privateKey    # true
  key.isPrivate "foobar"      # false
```



### key.isPublic
_**key.isPublic** Key &rarr; Boolean_

- _Key_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [PublicKey][classPublicKey] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, keyPair} = confidential()

do ->
  # Generate an encryption key-pair.
  {publicKey} = await keyPair.encryption()

  # Type check
  key.isPublic publicKey    # true
  key.isPublic "foobar"     # false
```

### key.isShared
_**key.isShared** Key &rarr; Boolean_

- _Key_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [SharedKey][classSharedKey] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, keyPair} = confidential()

do ->
  # Generate encryption key pairs for persons A and B.
  A = await keyPair.encryption()
  B = await keyPair.encryption()

  # Use that to make a shared key.
  shared = key.shared A.privateKey, B.publicKey

  # Type check
  key.isShared shared   # true
  key.isShared "foobar"     # false
```


### key.equal
_**key.equal** Key1, Key2 &rarr; Boolean_

- _Key1_ [`<SymmetricKey>`][classSymmetricKey] | [`<PrivateKey>`][classPrivateKey] | [`<PublicKey>`][classPublicKey] | [`<SharedKey>`][classSharedKey] | `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: The first key for this comparison
- _Key2_ [`<SymmetricKey>`][classSymmetricKey] | [`<PrivateKey>`][classPrivateKey] | [`<PublicKey>`][classPublicKey] | [`<SharedKey>`][classSharedKey] | `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: The second key for this comparison
- __Returns__ _Boolean_: The boolean result of this comparison.

Check if two keys (or any values) are the same.

This wraps the TweetNaCl.js implementation of a [constant time comparison for large values][tweetnacl-equal]. `equal` is a generic that allows you to pass in strings, raw data, or any key class -- in any combination. Returns `true` if the values are equal and `false` otherwise.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, verify} = confidential()

do ->
  # Receive signed message from person A.
  msg = acceptIncomingSignedMessageFromA()
  publicKey = msg.publicKeys[0]

  # Lookup the public key for person A.
  referenceKey = lookupPublicKeyForA()

  if key.equal(publicKey, referenceKey)
    # We're safe to verify and then use the message
    ....
  else
    # Uh oh.
    throw new Error "Unable to confirm public key identity"
```

## keyPair
panda-confidential uses a key type system to allow the generics -- `encrypt`, `decrypt`, `sign`, and `verify` -- to select the appropriate action. This type system is implemented in [key and key-pair classes](#classes).

Key-pairs are sets of related keys used for public key cryptography and are generated together. The two main types of key-pairs are for encryption and signing, and they are incompatible with each other. The following functions wrap TweetNaCl.js generation methods while making it clear how the keys should be used.

### keyPair.encryption
_**keyPair.encryption** &rarr; EncryptionKeyPair_

- __Returns__ _EncryptionKeyPair_: This returns an instance of [EncryptionKeyPair][classEncryptionKeyPair]

This function generates a key-pair suitable for asymmetric encryption. It uses the panda-confidential instance of [randomBytes][randombytes] to generate the values.

___The private keys you generate for encryption are _not_ suitable for signing.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair, key, encrypt} = confidential()

do ->
  # Generate a key-pair suitable for encryption for person A.
  {privateKey, publicKey} = await keyPair.encryption()

  # Lookup the public key for person B.
  B_public = lookupPublicKey()

  # Now you may encrypt a message for person B.
  myKey = key.shared privateKey, B_public
  message = "Hello World!"
  ciphertext = encrypt mykey, message
```


### keyPair.signature
_**keyPair.signature** &rarr; SignatureKeyPair_

- __Returns__ _SignatureKeyPair_: This returns an instance of [SignatureKeyPair][classSignatureKeyPair]

This function generates a key-pair suitable for signing. It uses the panda-confidential instance of [randomBytes][randombytes] to generate the values.

___The private keys you generate for signing are _not_ suitable for encryption.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair, sign} = confidential()

do ->
  # Generate a key-pair suitable for signing for person A.
  A = {privateKey, publicKey} = await keyPair.encryption()

  # Now you may sign a message for person B.
  message = "Hello World!"
  sign A, message
```


### keyPair.isEncryption
_**keyPair.isEncryption** Pair &rarr; Boolean_

- _Pair_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the key-pair you input, returning `true` if the input is an instance of [EncryptionKeyPair][classEncryptionKeyPair] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair} = confidential()

do ->
  # Generate an encryption key-pair.
  pair = await keyPair.encryption()

  # Type check
  keyPair.isEncryption pair         # true
  keyPair.isEncryption "foobar"     # false
```


### keyPair.isSignature
_**keyPair.isSignature** Pair &rarr; Boolean_

- _Pair_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the key-pair you input, returning `true` if the input is an instance of [SignatureKeyPair][classSignatureKeyPair] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair} = confidential()

do ->
  # Generate a signature key-pair.
  pair = await keyPair.signature()

  # Type check
  keyPair.isSignature pair         # true
  keyPair.isSignature "foobar"     # false
```




# Classes
Classes in panda-confidential are lightweight wrappers for values. They provide a type-system to support the generics (`encrypt`, `decrypt`, `sign`, and `verify`) and a couple of convenience methods. Their constructors ready values for use with the underlying TweetNaCl.js invocations ([`Uint8Array`][Uint8Array]), but you can easily access the value by `encode`ing it into a form that's easier for transport or placing into a datastore.

## Key
### Properties
  - `key` - key's value stored as an Uint8Array of bytes, ready for use within TweetNaCl.js.

### Methods
- `encode`
  - _encode &rarr; Value_

   outputs the value of `key` as a Base64 encoded string.

### Description
Base class for all keys in panda-confidential. It stores a decoded key ready for use in TweetNaCl.js functions, and can output a Base64 encoded string for transport.

This class is not used directly within panda-confidential, but its descendants all share its interface.

## SymmetricKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js symmetric encryption interface][tweetnacl-secretbox]. This is the key type required by [`encrypt`][encrypt] to perform symmetric encryption.

## PrivateKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box], along with [PublicKey][classPublicKey]

## PublicKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box], along with [PrivateKey][classPrivateKey]

## SharedKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box]. It is a special key formed by using one person's private key and another's public key, yielding a shared secret. This is the key required by [`encrypt`][encrypt] to perform asymmetric encryption.

## KeyPair
### Properties
  - `privateKey` - The private key of this key pair. This is an instance of [PrivateKey][classPrivateKey].
  - `publicKey` - The public key of this key pair. This is an instance of [PublicKey][classPublicKey].

### Methods
- `encode`
  - _encode &rarr; Value_

   outputs all the properties of this instance as a Base64 encoded stringified object.

### Description
Base class for all key-pairs in panda-confidential. It stores pair of [PrivateKey][classPrivateKey] and [PublicKey][classPublicKey] classes. Recall they are decoded values ready for use in TweetNaCl.js functions, and can be output a Base64 encoded string for transport.

This class is not used directly within panda-confidential, but its descendants all share its interface.

## EncryptionKeyPair
_extends [KeyPair][classKeyPair]_

This key pair is used by panda-confidential for public key encryption. You may generate a pair by invoking [`keyPair.encryption()`][EncryptionKeyPair].

___The key pair you generate for encryption is _not_ suitable for signing.___

## SignatureKeyPair
_extends [KeyPair][classKeyPair]_

This key pair is used by panda-confidential for message signing. You may generate a pair by invoking [`keyPair.signature()`][SignatureKeyPair].

___The key pair you generate for signing is _not_ suitable for encryption.___

## SignedMessage
### Properties
  - `message` - The message that has been signed, stored as an Uint8Array of bytes, ready for use within TweetNaCl.js.
  - `encoding` - The encoding of the original message. When this value is `binary`, encoding the message will return an Uint8Array.
  - `signatures` - A list of signatures generated by signing the `message` with a private key. These are stored as Uint8Arrays, ready for use within TweetNaCl.js.
  - `publicKeys` - A list of the public keys used to validate the matching signatures in the `signatures` list. These are stored as Uint8Arrays, ready for use within TweetNaCl.js.

### Methods
- `encode`
  - _encode &rarr; Value_

   outputs all the properties of this instance as a Base64 encoded stringified object.

- `encodeMessage`
  - _encodeMessage &rarr; Value_

  outputs the message as a string with the encoding matching the value of the `encoding` property. If `encoding` is `binary`, this method returns the message as an Uint8Array.

### Description
Signed messages are self-contained entities that have everything you need to check their integrity. When passed to [`verify`][verify], it matches all the public keys to the signatures and uses TweetNaCl.js to validate the signatures.

While a signed message can be verified to be internally self-consistent, it is up to you to verify the public keys belong to whoever claims to have sent the message.


[randombytes]: #randombytes
[encrypt]: #encrypt
[decrypt]: #decrypt
[sign]: #sign
[verify]: #verify
[encode]: #encode
[decode]: #decode
[isData]: #isdata
[hash]: #hash
[nacl]: #nacl

[SymmetricKey]: #keysymmetric
[PrivateKey]: #keyprivate
[PublicKey]: #keypublic
[SharedKey]: #keyshared
[EncryptionKeyPair]: #keypairencryption
[SignatureKeyPair]: #keypairsignature
[isSymmetric]: #keyissymmetric
[isPrivate]: #keyisprivate
[isPublic]: #keyisprivate
[isShared]: #keyisshared
[isEncryption]: #keypairisencryption
[isSignature]: #keypairissignature
[equal]: #keyequal

[signedMessage]: #signedmessage
[isSignedMessage]: #issignedmessage

[classes]: #classes-1
[classKey]: #key-2
[classSymmetricKey]: #symmetrickey
[classPrivateKey]: #privatekey
[classPublicKey]: #publickey
[classSharedKey]: #sharedkey
[classKeyPair]: #keypair-2
[classEncryptionKeyPair]: #encryptionkeypair
[classSignatureKeyPair]: #signaturekeypair
[classSignedMessage]: #signedmessage-1


[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
[Buffer]:https://nodejs.org/api/buffer.html
[universal]: https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb


[tweetnacl-random]: https://github.com/dchest/tweetnacl-js#random-bytes-generation
[tweetnacl-box]:https://github.com/dchest/tweetnacl-js#public-key-authenticated-encryption-box
[tweetnacl-secretbox]: https://github.com/dchest/tweetnacl-js#naclsecretboxmessage-nonce-key
[tweetnacl-box-before]:https://github.com/dchest/tweetnacl-js#naclboxbeforetheirpublickey-mysecretkey
[tweetnacl-box-after]: https://github.com/dchest/tweetnacl-js#naclboxaftermessage-nonce-sharedkey
[tweetnacl-secretbox-open]: https://github.com/dchest/tweetnacl-js#naclsecretboxopenbox-nonce-key
[tweetnacl-box-open-after]: https://github.com/dchest/tweetnacl-js#naclboxopenafterbox-nonce-sharedkey
[tweetnacl-sign]: https://github.com/dchest/tweetnacl-js#naclsigndetachedmessage-secretkey
[tweetnacl-verify]: https://github.com/dchest/tweetnacl-js#naclsigndetachedverifymessage-signature-publickey
[tweetnacl-utils]: https://github.com/dchest/tweetnacl-util-js#documentation
[tweetnacl-equal]:https://github.com/dchest/tweetnacl-js#naclverifyx-y
[tweetnacl-hash]:https://github.com/dchest/tweetnacl-js#hashing
[tweetnacl-nonce-length]: https://github.com/dchest/tweetnacl-js#naclsecretboxnoncelength--24

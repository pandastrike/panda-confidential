# Panda Confidential API


# Properties

## nacl

The TweetNaCl.js module imported by Confidential. Useful for bypassing the Confidential API and accessing TweetNaCl directly. Changing this property will not affect the behavior of an instance of the API.

## key


## keyPair

# Functions
_**confidential** [ randomBytes ]  &rarr;  api_

- _randomBytes_: `function`. Provide a custom implementation for [`randomBytes`][randombytes]. **Warning:** A robust source of entropy is necessary for encryption. Use this feature with caution.

- Returning _api_: `object`. An instance of the Confidential API.



_**randomBytes** length  &rarr;  bytes_

- _length_: `integer`. Length of the output in bytes.

- Returning _bytes_: [`Uint8Array`][uint8array] | [`Buffer`][buffer]. Array of _length_ pseudo-random bytes.



**Warning:** Throws when unable to locate a suitable source of entropy.

##### Example

```coffeescript
import {confidential} from "panda-confidential"
{randomBytes} = confidential()

randomBytes 32
.then (bytes) ->
# ...
```

_**encrypt** key, [ nonce ,] plaintext  &rarr;  envelope_

- _key_: [`key.Symmetric`][key-symmetric] | `key.Asymmetric`. Key to be used in the encryption operation.

- _nonce_: [`Uint8Array`][uint8array] | [`Buffer`][buffer]. A value combined with the plaintext before encryption. A `nonceLength` random nonce is generated if not supplied.

- _plaintext_: `string` | [`Uint8Array`][uint8array] | [`Buffer`][buffer].

- Returning _envelope_: [`Envelope`][envelope]. Object with properties `ciphertext` and `nonce`. Suitable for use with `decrypt`.



When given a [symmetric key][key-symmetric], [`encrypt`][encrypt] uses [symmetric encryption][tweetnacl-secretbox]. When given a [shared key][key-shared], [`encrypt`][encrypt] uses authenticated, [asymmetric encryption][tweetnacl-box].

**Warning:** Key pairs for signing [do not work for encryption](./usage.md#why-signing-key-pairs-are-different).

##### Example: Symmetric Encryption

```coffeescript
import {confidential} from "panda-confidential"
{encrypt} = confidential()
import {keyLookup, write} from "my-library"

do ->
  alice = keyLookup "Alice/private"
  envelope = await encrypt alice, "Hello, World!"
  # serialize as needed with convert
  write "greeting", convert to: "safe-base64", envelope
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
  envelope = await encrypt fromAliceToBob, "Hello, World!"
  send "Bob", convert to: "safe-base64", envelope
```

**Warning:** Private keys should only be accessible to their owners.

_**decrypt** key, envelope  &rarr;  plaintext_

- _key_: [`key.Symmetric`][key-symmetric] | `key.Asymmetric`. Key to be used in the encryption operation.

- _envelope_: [`Envelope`][envelope]. Object with properties `ciphertext` and nonce. As returned by [`encrypt`][encrypt].

- Returning _plaintext_: [`Uint8Array`][uint8array]. The decrypted ciphertext.



When given a [symmetric key][key-symmetric], [`decrypt`][decrypt] uses [symmetric decryption][tweetnacl-secretbox-open]. When given a [shared key][key-shared], [`decrypt`][decrypt] uses authenticated, [asymmetric decryption][tweetnacl-box-open-after].

##### Example: Symmetric Decryption

```coffeescript
import {confidential} from "panda-confidential"
{decrypt} = confidential()
import {keyLookup, read} from "my-library"

do ->
  alice = keyLookup "Alice/private"
  serialized = read "greeting"
  envelope = convert from: "safe-base64", to: "object", serialized
  plaintext = await decrypt alice, envelope
```

##### Example: Asymmetric Decryption

```coffeescript
import {confidential} from "panda-confidential"
{key, decrypt} = confidential()
import {keyLookup, receive} from "my-library"

do ->
  alice = keyLookup "Alice/public"
  bob = keyLookup "Bob/private"
  toBobFromAlice = key.shared alice, bob
  serialized = receive "Bob"
  envelope = convert from: "safe-base64", to: "object", serialized
  plaintext = await decrypt toBobFromAlice, envelope
```



## sign

_**sign** public-key, private-key, data  &rarr;  declaration_

_**sign** key-pair, data  &rarr;  declaration_

_**sign** private-key, public-key, data  &rarr;  declaration_

- _key-pair_: [`keyPair.Signature`][class-keypair-signature]. The public and private keys with which to sign _data_.

- _public-key_: [`key.Public`][class-key-public]. The public key of the person wishing to sign _data_.

- _private-key_: [`key.Private`][class-key-private]. The private key of the person wishing to sign _data_.

- _data_: [`Uint8Array`][uint8array] | [`Buffer`][buffer] | `Declaration`. Data to be signed.

- Returning _declaration_: `Declaration`. Object with properties `data`, `signatures`, and `signatories`. Suitable for use with `verify`.


Sign _data_ with _private-key_ or the private key of _key-pair_.

**Warning:** Key pairs for signing do not work for encryption.

##### Example: Single Signature

```coffeescript
import {confidential} from "panda-confidential"
{sign} = confidential()

import {send, keyPairLookup} from "my-library"

do ->
  alice = keyPairLookup "Alice/signature"
  greeting = sign alice, "Hello, World!"

  # encode the signed data object itself
  send "Bob", convert to: "safe-base64", declaration
```

##### Example: Multiple Signatures

`sign` can take a  instance to allow multiple signatures. The `signatures` property contains a list of signatures. The `signatories` property contains a list of the corresponding public keys.

```coffeescript
import assert from "assert"
import {confidential} from "panda-confidential"
{sign, declaration} = confidential()
import {receive, keyPairLookup} from "my-library"

do ->
  # convert JSON to declaration
  greeting = declaration convert from: "json", receive "Bob"

  # add Bob's signature
  bob = keyPairLookup "Bob/signature"
  greeting = sign bob, greeting

  assert.equal greeting.signatures.length, 2
  assert.equal greeting.signatories.length, 2
```

## verify

_**verify** declaration &rarr; is-valid_

- _declaration_ [`<Declaration>`][classDeclaration]: Declaration to be verified.
- Returns _is-valid_: `<boolean>`. `true` if the signatures are valid, `false` otherwise.

[Verifies the signatures][tweetnacl-verify] against the original data and the attached public keys.

**Warning:** Everything needed to verify the signatures exists within the [`Declaration`][classDeclaration] instance, but it is up to you to verify the authenticity of the public keys. See also: [key.equal][equal] for information on key comparison.

**Warning:** Signing key pairs do not work for encryption.

##### Example

```coffeescript
import {confidential} from "panda-confidential"
{verify, declaration} = confidential()
import {receive, process} from "my-library"

do ->
  # convert JSON to declaration
  greeting = declaration convert from: "json", receive "Alice"


  if verify greeting
    # do something with the verified data.
    process convert to: "utf8", greeting.data
  else
    throw new Error "Unable to verify data signatures."
```

## convert

_**convert** conversion, from &rarr; to_

- _conversion_: `<object>.` Describes the conversion to be applied to _from_.

- _from_: The value to be converted.

- Returns _to_: The result of the conversion.

### Conversion Description

Confidential offers a variety of conversions, specified using an object with `from` and `to` properties. When one of the properties can be inferred from the argument (ex: a byte array), it's not necessary to specify it. Attempting an unsupported conversion will throw.

##### Example

```coffeescript
import {confidential} from "panda-confidential"
{convert} = confidential()

do ->
  assert.equal "Hello, World!",
    convert from: "base64", to: "utf8", "SGVsbG8sIFdvcmxkIQ=="

  # from property can be inferred from the argument
  assert.equal "Hello, World!",
    convert to: "utf8", Buffer.from "Hello, World!"

```

- Supported formats or encodings include: `utf8`, `base64`, and `json`.

- The `safe-base64` specifies a URL-safe Base64 encoding.

- Conversions to the `bytes` format return a [`Uint8Array`][Uint8Array].

- The `bytes` format is inferred (and thus optional) as the `from` specifier for [`Uint8Array`][Uint8Array] and Node.js `Buffer` objects.

## hash
_**hash** data &rarr; hash_

- _data_: `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]. The data to be hashed.
- Returns _hash_: [`<Uint8Array>`][Uint8Array]. A byte array containing [the SHA-512 hash][tweetnacl-hash] of _data_.

##### Example

```coffeescript
import {confidential} from "panda-confidential"
{hash} = confidential()

do ->
  assert.equal "N015SpXNz9izWZMYX++bo2jxYN\
				ja9DLQi6nx7R5avmzGkpHg+i/g\
				AGpSVw7xjBne9OYXwzzlLvCm5fv\
				jGMsDhw==",
    convert to: "base64", hash "Hello, World!"
```

## declaration

_**declaration** description &rarr; declaration_

- _description_: `<object>`. An object with `data`, `signatures`, and `signatories` properties.
- Returns _declaration_: [`<Declaration>`][classDeclaration].

Convenience function for constructing [`Declaration`][classDeclaration] instances.

## isDeclaration

_**isDeclaration** value &rarr; is-declaration_

- _value_ : A value to be tested.
- Returns _is-declaration_:`<boolean>`. `true` if _value_ is an instance of [`Declaration`][classDeclaration], `false` otherwise.





## isBytes

_**isBytes** value &rarr; is-bytes_

- _value_ : The input for this type check.
- Returns _is-bytes_: `<boolean>`. `true` if the input is an instance of [Buffer][Buffer] _or_ [Uint8Array][Uint8Array], `false` otherwise.

### key.symmetric

_**key.symmetric** &rarr; promise_

- Returns _promise_: `<promise>` &map; [`<key.Symmetric>`][classKeySymmetric].

_**key.symmetric** key &rarr; symmetric-key_

- _key_:  [`<Uint8Array>`][Uint8Array] | [`<Buffer>.`][Buffer].
- Returns a _symmetric-key_: [`<key.Symmetric>`][classSymmetricKey].

Wraps _key_ in an instance of [`<key.Symmetric>`][classSymmetricKey], generating the key if none is given.

```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a symmetric key from a key literal.
  key1 = key.symmetric convert from: "base64",
    "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="

  # Or generate a key from randomBytes
  key2 = await key.symmetric()
```

### key.isSymmetric
_**key.isSymmetric** value &rarr; is-symmetric_

- _value_ : The input for this type check.
- Returns _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [`key.Symmetric`][class-key-Symmetric] and `false` for anything else.

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

### key.shared
_**key.shared** private-key, public-key &rarr; shared-key_

_**key.shared** public-key, private-key &rarr; shared-key_

- _private-key_: [`<PrivateKey>`][classPrivateKey].
- _public-key_: [`<PublicKey>`][classPublicKey].
- Returns _shared-key_: [`<SharedKey>`][classSharedKey]. [Algorithmically generates a shared secret][tweetnacl-box-before].

_**key.shared** key-data &rarr; shared-key_

- _key-data_: [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer].
- Returns _shared-key_: [`<SharedKey>`][classSharedKey]. Wraps _key-data_.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, encrypt} = confidential()
import {keyLookup} from "my-library"

do ->
  alice = keyLookup "Alice/private"
  bob = keyLookup "Bob/public"
  fromAliceToBob = key.shared alice, bob
  envelope = await encrypt fromAliceToBob, "Hello, World!"
  send "Bob", convert to: "safe-base64", envelope
```

### key.isShared
_**key.isShared** value &rarr; is-Shared_

- _Key_ : The input for this type check.
- Returns _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [`key.Shared`][class-key-Shared] and `false` for anything else.

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

### key.public

_**key.public** key &rarr; public-key_

- _key_:  [`<Uint8Array>`][Uint8Array] | [`<Buffer>.`][Buffer].
- Returns a _public-key_: [`<key.Public>`][classKeyPublic].

Wraps _key_ in an instance of [`<key.Public>`][classKeyPublic].

See [`keyPair.Encryption`][EncryptionKeyPair] or [`keyPair.Signature`][SignatureKeyPair] to generate a public key as part of a key pair.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a Public key from a key literal.
  key1 = key.public convert from: "base64",
    "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="
```

### key.isPublic
_**key.isPublic** value &rarr; is-Public_

- _Key_ : The input for this type check.
- Returns _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [`key.Public`][class-key-Public] and `false` for anything else.

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

### key.private

_**key.private** key &rarr; private-key_

- _key_:  [`<Uint8Array>`][Uint8Array] | [`<Buffer>.`][Buffer].
- Returns a _private-key_: [`<key.Private>`][classKeyPrivate].

Wraps _key_ in an instance of [`<key.Private>`][classPrivateKey].

See [`keyPair.Encryption`][EncryptionKeyPair] or [`keyPair.Signature`][SignatureKeyPair] to generate a private key as part of a key pair.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a Private key from a key literal.
  key1 = key.private convert from: "base64",
    "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="
```

### key.isPrivate
_**key.isPrivate** value &rarr; is-Private_

- _Key_ : The input for this type check.
- Returns _Boolean_: The boolean result of this type check.

This examines the type of the key you input, returning `true` if the input is an instance of [`key.Private`][class-key-Private] and `false` for anything else.

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



# Types

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

## SharedKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box]. It is a special key formed by using one person's private key and another's public key, yielding a shared secret. This is the key required by [`encrypt`][encrypt] to perform asymmetric encryption.

## PublicKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box], along with [`key.Private`][class-key-Private]

## PrivateKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box], along with [`key.Public`][class-key-Public]

## KeyPair
### Properties
  - `privateKey` - The private key of this key pair. This is an instance of [`key.Private`][class-key-Private].
  - `publicKey` - The public key of this key pair. This is an instance of [`key.Public`][class-key-Public].

### Methods
- `encode`
  - _encode &rarr; Value_

   outputs all the properties of this instance as a Base64 encoded stringified object.

### Description
Base class for all key-pairs in panda-confidential. It stores pair of [`key.Private`][class-key-Private] and [PublicKey][classPublicKey] classes. Recall they are decoded values ready for use in TweetNaCl.js functions, and can be output a Base64 encoded string for transport.

This class is not used directly within panda-confidential, but its descendants all share its interface.

## EncryptionKeyPair
_extends [KeyPair][classKeyPair]_

This key pair is used by panda-confidential for public key encryption. You may generate a pair by invoking [`keyPair.encryption()`][EncryptionKeyPair].

___The key pair you generate for encryption is _not_ suitable for signing.___

## SignatureKeyPair
_extends [KeyPair][classKeyPair]_

This key pair is used by panda-confidential for data signing. You may generate a pair by invoking [`keyPair.signature()`][SignatureKeyPair].

___The key pair you generate for signing is _not_ suitable for encryption.___




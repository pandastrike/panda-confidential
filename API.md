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
- [key.Symmetric][SymmetricKey]
- [key.Private][PrivateKey]
- [key.Public][PublicKey]
- [key.Shared][SharedKey]
- [key.isSymmetric][isSymmetric]
- [key.isPrivate][isPrivate]
- [key.isPublic][isPublic]
- [key.isShared][isShared]
- [key.equal][equal]

#### keyPair
- [keyPair.Encryption][EncryptionKeyPair]
- [keyPair.Signature][SignatureKeyPair]
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
_**randomBytes** Length &rarr; ByteArray_

- _Length_ `<Number>`:  Length of the output in bytes.
- __Returns__ _ByteArray_: random data -- This is an Uint8Array of length `Length`, filled with pseudo-random values.

Generate an Uint8Array of the given length filled with pseudo-random data.  By default, this is the [implementation from TweetNaCl.js][tweetnacl-random], designed to seek out robust sources of random number generation in browser and Node.js platforms.  TweetNaCl.js will throw if it is unable to locate a suitable source on your platform.  

This method is exposed for your needs _and_ is used internally by various functions in panda-confidential to generate random values:

- [encrypt][encrypt]
- [key.Symmetric][SymmetricKey]
- [keyPair.Encryption][EncryptionKeyPair]
- [keyPair.Signature][SignatureKeyPair]

That includes key, key-pair, and encryption nonce generation.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{randomBytes} = confidential()

do ->
  randomValue = await randomBytes 32
```

### Overriding randomBytes
You may override `randomBytes` by simply reassigning its value after you have created your instance of panda-confidential.  That change will also apply to the methods listed above.

___WARNING: Using non-robust sources of randomness will compromise the effectiveness of your encryption.  Use this feature with caution.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
import {myRandomGenerator} from "my-other-library"
c = confidential()

# Applies your random generator to panda-confidential functions
c.randomBytes = myRandomGenerator
{key, randomBytes} = c

do ->
  randomValue = await randomBytes 32
  myKey = await key.Symmetric()  # random values come from your generator.
```

## encrypt
_**encrypt** Key, Plaintext [, Encoding] &rarr; Ciphertext_

- _Key_ [`<SymmetricKey>`][classSymmetricKey] | [`<SharedKey>`][classSharedKey]:  Key to be used in the encryption operation.
- _Plaintext_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: Data to be encrypted.
- _Encoding_ `utf8` | `base64`  (Optional): Specifies the encoding of the plaintext string.  This value defaults to `utf8` and is ignored when the plaintext is an Uint8Array or Node.js buffer.
- __Returns__ _Ciphertext_: encrypted plaintext -- This is packaged as a base64 encoded stringified object with the fields `ciphertext` and `nonce`.  `ciphertext` is a base64 encoded string of the encrypted data and `nonce` is a base64 encoded one-time use random value used in the encryption operation.  Both fields are required for decryption.

Encrypts the given data with the given key.  

When a [symmetric key][classSymmetricKey] is used, `encrypt` uses [symmetric encryption][tweetnacl-secretbox] with a random nonce [it generates][randombytes].

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{encrypt} = confidential()

do ->
  # Somehow get the symmetric key for your setup.  See key.Symmetric() for generating keys suitable for symmetric encryption.
  myKey = lookupSymmetricKey()

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  ciphertext = await encrypt myKey, message
```


When a [shared key][classSharedKey] is used, `encrypt` uses [asymmetric encryption][tweetnacl-box-after] with a random nonce [it generates][randombytes].

___The private keys you generate for signing are _not_ suitable for encryption.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, encrypt} = confidential()

do ->
  # Somehow get person A's private key and person B's public key. See keyPair.Encryption() for generating key pairs suitable for public key encryption.
  A_private = lookupPrivateKey "A"
  B_public = lookupPublicKey "B"
  message = "Hello World!"

  # Person A encrypts the message for person B by making a shared key out of their _private_ key and B's _public_ key.
  sharedKey = key.Shared A_private, B_public
  ciphertext = await encrypt sharedKey, message
```


## decrypt
_**decrypt** Key, Blob [, Encoding] &rarr; Plaintext_

- _Key_ [`<SymmetricKey>`][classSymmetricKey] | [`<SharedKey>`][classSharedKey]  Key to be used in decryption operation.
- _Blob_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer] Data to be decrypted.  Expected to be the output generated by [encrypt][encrypt].
- _Encoding_ `utf8` | `base64` | `binary`  (Optional) Specifies the encoding of the output plaintext string.  This value defaults to `utf8`.  The value `binary` causes `decrypt` to return the plaintext as an Uint8Array.
- __Returns__ _Plaintext_: decoded ciphertext -- This is a string with the specified encoding, which defaults to `utf8`.  Selecting the encoding `binary` causes `decrypt` to return the plaintext as an Uint8Array.

Decrypts the given data with the given key.  

When a [symmetric key][classSymmetricKey] is used, `decrypt` uses a [symmetric decryption operation][tweetnacl-secretbox-open].

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{decrypt} = confidential()

do ->
  # Somehow get the symmetric key for your setup.  See key.Symmetric() for generating keys suitable for symmetric encryption.
  myKey = lookupSymmetricKey()

  # Somehow fetch the ciphertext from the symmetric encryption operation.
  ciphertext = fetchCiphertextFromDB()

  # Person A symmetrically decrypts their data.
  plaintext = await decrypt myKey, ciphertext
```

When a [shared key][classSharedKey] is used, `decrypt` uses an [asymmetric decryption operation][tweetnacl-box-open-after].

___The private keys you generate for signing are _not_ suitable for encryption.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, decrypt} = confidential()

do ->
  # Somehow get person A's public key and person B's private key. See keyPair.Encryption() for generating key pairs suitable for public key encryption.
  A_public = lookupPublicKey "A"
  B_private = lookupPrivateKey "B"

  # Somehow get a message from person A.
  ciphertext = fetchCiphertext()

  # Person B decrypts the message from person A by making a shared key out of A's _public_ key and their _private_ key.
  sharedKey = key.Shared A_public, B_private
  message = await decrypt sharedKey, ciphertext
```

## sign
_**sign** KeyPair, Message [, Encoding] &rarr; SignedMessage_

_**sign** PrivateKey, PublicKey, Message [, Encoding] &rarr; SignedMessage_

- _KeyPair_ [`<SignatureKeyPair>`][classSignatureKeyPair]:  The private and public keys of a single person wishing to sign the Message.  If you supply this, you do not need to provide the keys separately.
- _PrivateKey_ [`<PrivateKey>`][classPrivateKey]:  The private key of the person wishing to sign the message.  If you do not provide the private-public key pair directly, you must supply them individually here.
- _PublicKey_ [`<PublicKey>`][classPublicKey]:  The public key of the person wishing to sign the message.  If you do not provide the private-public key pair directly, you must supply them individually here.
- _Message_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer] | [`<SignedMessage>`][classSignedMessage]: Message to be signed.
- _Encoding_ `utf8` | `base64`  (Optional): Specifies the encoding of the Message string.  This value defaults to `utf8` and is ignored when the Message is an Uint8Array, Node.js buffer, or SignedMessage.
- __Returns__ _SignedMessage_: This returns an instance of [SignedMessage][classSignedMessage] containing the Message, its original encoding, a list of the public keys of the signatories, and a list of the signatures.

Signs the given message with the given private-signing-key using [TweetNaCl.js signing implementation][tweetnacl-sign].  You may provide a signing key-pair, or provide the private and public keys as separate arguments.  

___The private keys you generate for encryption are _not_ suitable for signing.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{sign} = confidential()

do ->
  # Somehow get the signing key-pair for person A.  See keypair.Signature() for generating keys suitable for signing.
  A_KeyPair = lookupKeyPair()

  # Person A signs a message.
  message = "Hello World!"
  signedMsg = sign A_KeyPair, message

  # The SignedMessage class holds instantiated data in binary, but you may retrieve the message or convert the whole data to a base64 blob at any time.
  msg = signedMsg.dumpMessage()  # utf8 encoded `message` field
  blob = signedMsg.dump()        # base64 encoded stringified object
```

Multiple people can sign a message, so `sign` also operates on previously signed messages.  The output is the same SignedMessage instance, with an additional signature and matching public key in its lists.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{sign, signedMessage} = confidential()

do ->
  # Somehow get the signing key-pair for person B.  See keypair.Signature() for generating keys suitable for signing.
  B_KeyPair = lookupKeyPair()

  # Get the previously signed message.  If you converted it to a base64 string blob for transport, you can re-instantiate it.
  blob = fetchSignedMessageBlob()
  signedMsg = signedMessage blob  # Now we have a SignedMessage instance.
  final = sign B_KeyPair, signedMsg

  # The result has the same message and encoding fields, but now has an additional set of signature + public key.
  final.signatures.length == 2  # true
  final.publicKeys.length == 2  # true
```

## verify
_**verify** SignedMessage &rarr; Result_

- _SignedMessage_ [`<SignedMessage>`][classSignedMessage]: Signed message to be verified.
- __Returns__ _Result_: The boolean result of the verification process.  If the signatures checkout, `true`. Otherwise, `false`.

Verifies the signatures against the original message and the attached public keys.  Verification occurs via [TweetNaCl.js signing implementation][tweetnacl-verify].  Everything needed to verify message integrity exists within the SignedMessage instance, but it is up to you to verify the public keys are correct.

> See [key.equal()][equal] for information on key comparison.

___The private keys you generate for encryption are _not_ suitable for signing.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{verify, signedMessage} = confidential()

do ->
  # Get the signed message.  If you converted it to a base64 string blob for transport, you can re-instantiate it.
  blob = fetchSignedMessageBlob()
  signedMsg = signedMessage blob  # Now we have a SignedMessage instance.
  isValid = verify signedMsg

  if isValid
    # Return verified message.
    signedMsg.dumpMessage()
  else
    # Uh oh.
    throw new Error "Unable to verify message signatures."
```

## encode
_**encode** Encoding, Data &rarr; Result_

- _Encoding_ `utf8` | `base64` | `binary`: The desired encoding of the Result.
- _Data_ [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer] | `<String>` | `<Object>`: The Data to be encoded.  This is usually binary data, but `encode` can process other types.
- __Returns__ _Result_: The encoded Result of the input Data, usually a string.

Encodes an input into a desired output.  This generic is designed to be flexible enough to handle many input types and is used extensively to construct the `encrypt`-`decrypt` and `sign`-`verify` generics, as well as the key and key-pair class constructors.  It is exposed to allow extensions to panda-confidential access to its expressive power.  

The underlying `utf8` and `base64` encoding is handled by the [TweetNaCl-Utils-JS][tweetnacl-utils] helpers, written in [Universal JavasScript][universal].

When an Uint8Array or Node.js Buffer is input:
- `utf8`: `encode` outputs a UTF8 encoded string.
- `base64`: `encode` outputs a Base64 encoded string.
- `binary`: `encode` is a no-op.

When a string is input:
- `utf8`: `encode` decodes the string -- assuming Base64 encoding -- and outputs a UTF8 encoded string.
- `base64`: `encode` decodes the string -- assuming UTF8 encoding -- and outputs a Base64 encoded string.

When an object is input:
- `encode` outputs a base64 encoded, stringified version of the object.  In this case, you are not required to specify a encoding format.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{encode} = confidential()

do ->
  data =
    new Uint8Array [ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33 ]

  string = encode "utf8", data
  string == "Hello World!"  # true

  blob = encode message: "Hello World!"
  blob == "eyJtZXNzYWdlIjoiSGVsbG8gV29ybGQhIn0="        # true
  encode("utf8", blob) == '{"message":"Hello World!"}'  # true
```
## decode
_**decode** Encoding, Data &rarr; Result_

- _Encoding_ `utf8` | `base64` | `binary`: The encoding of the input Data.
- _Data_ `<String>` | `<Object>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: The data to be decoded. This is usually a string, but `decode` can process other types.
- __Returns__ _Result_: The decoded Result of the input data, usually binary data.

Decodes an input into a desired output.  This generic is designed to be flexible enough to handle many input types and is used extensively to construct the `encrypt`-`decrypt` and `sign`-`verify` generics, as well as the key and key-pair class constructors.  It is exposed to allow extensions to panda-confidential access to its expressive power.  

The underlying `utf8` and `base64` decoding is handled by the [TweetNaCl-Utils-JS][tweetnacl-utils] helpers, written in [Universal JavasScript][universal].

When an Uint8Array or Node.js Buffer is input:
- `decode` is a no-op, regardless of the encoding specified.

When a string is input:
- `utf8`: `decode` decodes the string -- assuming UTF8 encoding -- and outputs an Uint8Array of the resulting data.
- `base64`: `decode` decodes the string -- assuming Base64 encoding -- and outputs an Uint8Array of the resulting data.
- `binary`: `deocde` is a no-op.

When an object is input:
- `decode` first stringifies the object and then utf8 decodes it to output an Uint8Array of the resulting data.  In this case, you are not required to specify a decoding format.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{decode, key} = confidential()

do ->
  string = "Hello World!"
  data =
    new Uint8Array [ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33 ]

  key.equal decode("utf8", string), data    # true

  data = decode "utf8", '{"message":"Hello World!"}'
  data2 = decode message: "Hello World!"
  key.equal data, data2    # true
```

## hash
_**hash** Data [, Encoding] &rarr; Hash_

- _Data_ `<String>` | `<Object>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: The data to be hashed.
- _Encoding_ `utf8` | `base64`: (Optional) The encoding of the string Data input. Defaults to `utf8`  This value is ignored if Data is an Uint8Array or Node.js Buffer.
- __Returns__ _Hash_: A Base64 encoded string of the SHA-512 hash result.

This wraps the [SHA-512 Hashing implementation in TweetNaCl.js][tweetnacl-hash].  This generic is capable of accepting a variety of input types:

- When you input a string, `hash` decodes according to the Encoding you provide - defaulting to `utf8` - and performs the SHA-512 hash operation.
- When you input an object, `hash` stringifies the object using `utf8` encoding hashing.
- When you input an Uint8Array or Node.js Buffer, `hash` hases directly.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{hash} = confidential()

do ->
  hash("Hello World!") == "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA=="

  hash(message: "Hello World!") == "U1Dk3GihntqlckS9TPTdoMRzEa/zorUq4jHYkjCFUhl52R/ppuT/hFiDs/jT7KM9JJ56woDkxIVqOC6tBg+hiA=="
```

## signedMessage
_**key.signedMessage** Message &rarr; SignedMessage_

- _Key_ `<String>` | `<Object>`: A signed message literal that needs to be formally instanciated.
- __Returns__ _SignedMessage_: This returns an instance of [SignedMessage][classSignedMessage]

This function wraps the constructor for the [SignedMessage][classSignedMessage] class.  It accepts either an object literal or a Base64 encoded stringified object literal, like the one output by `SignedMessage::dump()`.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{sign, verify, signedMessage, keyPair} = confidential()

do ->
  # Normally get person A's keys from a datastore, but we generate them here.
  A = await keyPair.Signature()

  # Receive a signed message from person B.
  blob = getSignedMessageBlob()

  # Verify the message integrity.
  if verify blob
    # Convert the Base64 blob into a instantiated SignedMessage class.  
    msg = signedMessage blob

    # Sign with person A's keys
    msg = sign A, msg

    # Return a stringified blob for transport.
    msg.dump()
  else
    # uh oh
    throw new Error "Unable to verify message signature"
```


## isSignedMessage
_**isSignedMessage** Message &rarr; Boolean_

- _Message_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of the object you input, returning `true` if the input is an instance of [SignedMessage][classSignedMessage] and `false` for anything else.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair, signedMessage, isSignedMessage, sign} = confidential()

do ->
  # Generate an signature key-pair.
  pair = await keyPair.Signature()

  # Generate a signed message.
  msg = "Hello World!"
  msg = sign pair, msg

  isSignedMessage msg         # true
  isSignedMessage "foobar"    # false
```

## isData
_**isData** Data &rarr; Boolean_

- _Data_ : The input for this type check.
- __Returns__ _Boolean_: The boolean result of this type check.

This examines the type of input, returning `true` if the input is an instance of [Buffer][Buffer] _or_ [Uint8Array][Uint8Array], and `false` for anything else.

This type check is used throughout panda-confidential to avoid checking for both Buffer and Uint8Array when either are acceptable.  It is exposed in this API to afford the same convenience to those who wish to use it extending panda-confidential.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{isData} = confidential()

do ->
  data =
    new Uint8Array [ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33 ]

  isData data             # true
  isData "Hello World!"   # false

  # Only applies in Node.js
  data = Buffer.from "Hello World!"

  isData data             # true
  isData "Hello World!"   # false
```

## nacl
This is the TweetNaCl.js package imported by panda-confidential.  It is exposed in this API as a matter of convenience to those who would extend panda-confidential.  However, reassigning this value ___DOES NOT___ override the underlying TweetNaCl.js methods used by the generics (`encrypt`, `decrypt`, `sign`, and `verify`).

## Key Type System
panda-confidential uses a key type system to allow the generics -- `encrypt`, `decrypt`, `sign`, and `verify` -- to select the appropriate action.  This type system is implemented in [key and key-pair classes](#classes), but the following functions are exposed to allow you to access their constructors more effectively.

## key


### key.Symmetric
_**key.Symmetric** [Key] &rarr; SymmetricKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: (Optional) A key value literal for this key.  May be a Base64 encoded string or a binary array.
- __Returns__ _SymmetricKey_: This returns an instance of [SymmetricKey][classSymmetricKey]

When you invoke this function without passing any arguments, panda-confidential will generate a key for you suitable for symmetric encryption.  Though the default TweetNaCl.js implementation of randomBytes is synchronous, panda-confidential wraps it with a promise to allow extension via an asynchronous means.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a symmetric key from a key literal.
  key1 = key.Symmetric "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="

  # Or generate a key from randomBytes
  key2 = await key.Symmetric()
```


### key.Private
_**key.Private** Key &rarr; PrivateKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: A key value literal for this key.  May be a Base64 encoded string or a binary array.
- __Returns__ _PrivateKey_: This returns an instance of [PrivateKey][classPrivateKey]

This is one half of a key pair.  The key literal argument is required.  See [`keyPair.Encryption`][EncryptionKeyPair] or [`keyPair.Signature`][SignatureKeyPair] for information about generating this kind of key from `randomBytes`.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a Private key from a key literal.
  key1 = key.Private "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="
```


### key.Public
_**key.Public** Key &rarr; PublicKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: A key value literal for this key.  May be a Base64 encoded string or a binary array.
- __Returns__ _PublicKey_: This returns an instance of [PublicKey][classPublicKey]

This is one half of a key pair.  The key literal argument is required.  See [`keyPair.Encryption`][EncryptionKeyPair] or [`keyPair.Signature`][SignatureKeyPair] for information about generating this kind of key from `randomBytes`.

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key} = confidential()

do ->
  # Generate a Public key from a key literal.
  key1 = key.Public "WM4YL5yo+6yKAFaIZGp3QPbcjW9ICEGXlxR/Odnr2+k="
```


### key.Shared
_**key.Shared** Key1, Key2 &rarr; SharedKey_

_**key.Shared** Key &rarr; SharedKey_

- _Key_ `<String>` | [`<Uint8Array>`][Uint8Array] | [`<Buffer>`][Buffer]: A key value literal for this key.  May be a Base64 encoded string or a binary array.
- _Key1_ [`<PrivateKey>`][classPrivateKey] | [`<PublicKey>`][classPublicKey]: A public or private key instance used in the formation of the shared key.  If this one is private, the other must be a public key.  Or vice versa.
- _Key2_ [`<PublicKey>`][classPublicKey] | [`<PrivateKey>`][classPrivateKey]: A public or private key instance used in the formation of the shared key.  If this one is private, the other must be a public key.  Or vice versa.
- __Returns__ _SharedKey_: This returns an instance of [SharedKey][classSharedKey]

This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box].  It is a special key formed by using one person's private key and another's public key, yielding a shared secret.

To use this method you may either:
1. Pass in a key literal, like the other keys
2. Pass in a private key from person A and a public key from person B to [algorithmically generate a shared secret][tweetnacl-box-before]

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{key, keyPair} = confidential()

do ->
  # Generate encryption key pairs for persons A and B.
  A = await keyPair.Encryption()
  B = await keyPair.Encryption()
  shared = key.Shared A.privateKey, B.publicKey
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
  myKey = await key.Symmetric()

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
  {privateKey} = await keyPair.Encryption()

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
  {publicKey} = await keyPair.Encryption()

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
  A = await keyPair.Encryption()
  B = await keyPair.Encryption()

  # Use that to make a shared key.
  shared = key.Shared A.privateKey, B.publicKey

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

This wraps the TweetNaCl.js implementation of a [constant time comparison for large values][tweetnacl-equal].   `equal` is a generic that allows you to pass in strings, raw data, or any key class -- in any combination.  Returns `true` if the values are equal and `false` otherwise.

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
panda-confidential uses a key type system to allow the generics -- `encrypt`, `decrypt`, `sign`, and `verify` -- to select the appropriate action.  This type system is implemented in [key and key-pair classes](#classes).

Key-pairs are sets of related keys used for public key cryptography and are generated together.  The two main types of key-pairs are for encryption and signing, and they are incompatible with each other. The following functions wrap TweetNaCl.js generation methods while making it clear how the keys should be used.

### keyPair.Encryption
_**keyPair.Encryption** &rarr; EncryptionKeyPair_

- __Returns__ _EncryptionKeyPair_: This returns an instance of [EncryptionKeyPair][classEncryptionKeyPair]

This function generates a key-pair suitable for asymmetric encryption.  It uses the panda-confidential instance of [randomBytes][randombytes] to generate the values.

___The private keys you generate for encryption are _not_ suitable for signing.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair, key, encrypt} = confidential()

do ->
  # Generate a key-pair suitable for encryption for person A.
  {privateKey, publicKey} = await keyPair.Encryption()

  # Lookup the public key for person B.
  B_public = lookupPublicKey()

  # Now you may encrypt a message for person B.
  myKey = key.Shared privateKey, B_public
  message = "Hello World!"
  ciphertext = encrypt mykey, message
```


### keyPair.Signature
_**keyPair.Signature** &rarr; SignatureKeyPair_

- __Returns__ _SignatureKeyPair_: This returns an instance of [SignatureKeyPair][classSignatureKeyPair]

This function generates a key-pair suitable for signing.  It uses the panda-confidential instance of [randomBytes][randombytes] to generate the values.

___The private keys you generate for signing are _not_ suitable for encryption.___

##### Example
```coffeescript
import {confidential} from "panda-confidential"
{keyPair, sign} = confidential()

do ->
  # Generate a key-pair suitable for signing for person A.
  A = {privateKey, publicKey} = await keyPair.Encryption()

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
  pair = await keyPair.Encryption()

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
  pair = await keyPair.Signature()

  # Type check
  keyPair.isSignature pair         # true
  keyPair.isSignature "foobar"     # false
```




# Classes
Classes in panda-confidential are lightweight wrappers for values.  They provide a type-system to support the generics (`encrypt`, `decrypt`, `sign`, and `verify`) and a couple of convenience methods.  Their constructors ready values for use with the underlying TweetNaCl.js invocations (`Uint8Array`), but you can easily access the value by `dump`ing it into a form that's easier for transport or placing into a datastore.

## Key
### Properties
  - `key` - key's value stored as an Uint8Array of bytes, ready for use within TweetNaCl.js.

### Methods
- `dump`
  - _dump &rarr; Value_

   outputs the value of `key` as a Base64 encoded string.

### Description
Base class for all keys in panda-confidential.  It stores a decoded key ready for use in TweetNaCl.js functions, and can output a Base64 encoded string for transport.  

This class is not used directly within panda-confidential, but its descendants all share its interface.

## SymmetricKey
_extends [Key][classKey]_

### Description
This key type is used in [TweetNaCl.js symmetric encryption interface][tweetnacl-secretbox].  This is the key type required by [`encrypt`][encrypt] to perform symmetric encryption.

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
This key type is used in [TweetNaCl.js public key encryption interface][tweetnacl-box].  It is a special key formed by using one person's private key and another's public key, yielding a shared secret.  This is the key required by [`encrypt`][encrypt] to perform asymmetric encryption.

## KeyPair
### Properties
  - `privateKey` - The private key of this key pair.  This is an instance of [PrivateKey][classPrivateKey].
  - `publicKey` - The public key of this key pair.  This is an instance of [PublicKey][classPublicKey].

### Methods
- `dump`
  - _dump &rarr; Value_

   outputs all the properties of this instance as a Base64 encoded stringified object.

### Description
Base class for all key-pairs in panda-confidential.  It stores pair of [PrivateKey][classPrivateKey] and [PublicKey][classPublicKey] classes.  Recall they are decoded values ready for use in TweetNaCl.js functions, and can be output a Base64 encoded string for transport.  

This class is not used directly within panda-confidential, but its descendants all share its interface.

## EncryptionKeyPair
_extends [KeyPair][classKeyPair]_

This key pair is used by panda-confidential for public key encryption.  You may generate a pair by invoking [`keyPair.Encryption()`][EncryptionKeyPair].

___The key pair you generate for encryption is _not_ suitable for signing.___

## SignatureKeyPair
_extends [KeyPair][classKeyPair]_

This key pair is used by panda-confidential for message signing.  You may generate a pair by invoking [`keyPair.Signature()`][SignatureKeyPair].

___The key pair you generate for signing is _not_ suitable for encryption.___

## SignedMessage
### Properties
  - `message` - The message that has been signed, stored as an Uint8Array of bytes, ready for use within TweetNaCl.js.
  - `encoding` - The encoding of the original message.  When this value is `binary`, dumping the message will return an Uint8Array.
  - `signatures` - A list of signatures generated by signing the `message` with a private key.  These are stored as Uint8Arrays, ready for use within TweetNaCl.js.
  - `publicKeys` - A list of the public keys used to validate the matching signatures in the `signatures` list. These are stored as Uint8Arrays, ready for use within TweetNaCl.js.

### Methods
- `dump`
  - _dump &rarr; Value_

   outputs all the properties of this instance as a Base64 encoded stringified object.

- `dumpMessage`
  - _dumpMessage &rarr; Value_

  outputs the message as a string with the encoding matching the value of the `encoding` property.  If `encoding` is `binary`, this method returns the message as an Uint8Array.

### Description
Signed messages are self-contained entities that have everything you need to check their integrity.  When passed to [`verify`][verify], it matches all the public keys to the signatures and uses TweetNaCl.js to validate the signatures.

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

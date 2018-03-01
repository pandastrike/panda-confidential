# panda-confidential
Simple, extensible interface for the tweetnacl-js cryptography library

## Motivation
Cryptography is hard. Even subtle bugs in implementation can render your efforts insecure.  That inspired the creation of TweetNaCl and its JavaScript port, [TweetNaCl.js][tweetnacl]. TweetNaCl.js is an opinionated bundle of [universal JavaScript][universal] that distills cryptography best practices and is auditable. That's good because the code is short and introduces minimal abstraction. However, that lack of abstraction can make the API unwieldy.

Panda Confidential aims to make Tweet NaCl easier to use and extend without giving up auditability.

[tweetnacl]: https://github.com/dchest/tweetnacl-js#documentation
[universal]: https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb


## Usage
Because panda-confidential is extensible, we use instantiation to prevent unexpected changes by third parties.

```coffeescript
import {confidential} from "panda-confidential"

do ->
  # Instantiate Panda-Confidential
  {encrypt, decrypt, key} = confidential()
```

Panda-confidential wraps the TweetNaCl.js interface with three pairs of opposing functions:
1. `encrypt` and `decrypt`
2. `sign` and `verify`
3. `encode` and `decode`

These functions are [_generics_][generics] and will accept multiple kinds of inputs that decides the action taken.  To keep functionality clear and error-free, panda-confidential establishes a key type system the generics use to determine intention.

For example, let's perform a symmetric encryption with a secret key.

```coffeescript
  # Generate symmetric key of correct length that should be saved.
  myKey = await key.Symmetric()

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  ciphertext = await encrypt myKey, message
```

The details -- key length, ensuring a robust source of randomness, encryption algorithm, etc -- are all handled by TweetNaCl.js.  `encrypt` and the key type system just provides a super simple interface for that power.

Use `decrypt` to retrieve the data just as simply.
```coffeescript
  # Later, Person A decrypts that ciphertext.
  output = await decrypt myKey, ciphertext
```

Please see the [full API documentation][api-docs] for more detailed information about key types and function pairs.

[generics]: https://en.wikipedia.org/wiki/Generic_programming

## Installation

For the browser, bundle using your favorite bundler:

```
npm install panda-confidential --save
```

## Features
Confidential provides generic functions for:
- encrypting and decrypting
- signing and verifying
- encoding and decoding strings

These functions all make use of TweetNaCl.js, but the accept a variety of inputs to accomplish the desired operation.  Confidential has a system of key-types and keypair-types to make the operations clear and error free.

[Full API Documentation][api-docs]

[api-docs]:https://github.com/pandastrike/panda-confidential/blob/master/API.md

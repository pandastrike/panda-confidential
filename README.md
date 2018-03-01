# panda-confidential
Simple, extensible interface for the tweetnacl-js cryptography library

## Motivation
Cryptography is hard. Even subtle bugs in implementation can render your efforts insecure.  That inspired the creation of TweetNaCl and its JavaScript port, [TweetNaCl.js][tweetnacl]. TweetNaCl.js is an opinionated bundle of [universal JavaScript][universal] that distills cryptography best practices and is auditable. This is good because that makes the code short and introduces minimal abstraction. However, that lack of abstraction can make the API unwieldy.

Panda Confidential aims to make Tweet NaCl easier to use and extend without giving up auditability.

[tweetnacl]: https://github.com/dchest/tweetnacl-js#documentation
[universal]: https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb


## Usage
```coffeescript
import {confidential} from "panda-confidential"

do ->
  # Instantiate Panda-Confidential
  {encrypt, decrypt, key} = confidential()

  # Generate symmetric key of correct length that should be saved.
  myKey = await key.Private()

  # Person A symmetrically encrypts their data.
  message = "Hello World!"
  cipher = await encrypt myKey, message

  # Later, Person A decrypts that ciphertext.
  output = await decrypt myKey, cipher
```

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

[Full API Documentation][https://github.com/pandastrike/panda-confidential/blob/master/API.md]

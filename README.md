# panda-confidential
Simple, extensible interface for the tweetnacl-js cryptography library

## Motivation
Cryptography is hard. Even subtle bugs in implementation can render your efforts insecure.  That inspired the creation of TweetNaCl and its JavaScript port, [TweetNaCl.js][tweetnacl]. TweetNaCl.js is an opinionated bundle of [universal JavaScript][universal] that distills cryptography best practices and is auditable (that is, [making it easier for other security professionals to review it][cure53]). That's good because the code is short and introduces minimal abstraction. However, that lack of abstraction can make the API hard to use.

Panda Confidential aims to make Tweet NaCl easier to use—and extend—with minimal reduction in auditability.

[tweetnacl]: https://github.com/dchest/tweetnacl-js#documentation
[universal]: https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb
[cure53]:https://cure53.de/tweetnacl.pdf


## Usage
Because panda-confidential is extensible, you must instantiate a new instance before using it. This helps prevent unexpected changes by third parties.

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

These functions are [_generics_][generics] and infer intent based on their arguments. For example, if you invoke `encrypt` with a symmetric key, you get symmetric encryption. 

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
npm i -s panda-confidential
```

[Full API Documentation][api-docs]

[api-docs]:https://github.com/pandastrike/panda-confidential/blob/master/API.md

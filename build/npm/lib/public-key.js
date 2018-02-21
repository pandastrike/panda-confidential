"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// This submodule uses the TweetNaCl-js public key encryption API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements x25519-xsalsa20-poly1305.
var box;

box = function ({ KMS }) {
  var extractBlob, generateKeyPair, generateKeyPairFromSecret, nonceLength, prepareKey, prepareNonce, preparePlaintext, publicKey, publicLength, randomKey, secretLength, sharedPublicKey;
  // Access to the KMS API via sundog.
  ({ randomKey } = KMS);
  //# Constants
  //###############################
  // Length in bytes
  publicLength = 32;
  secretLength = 32;
  nonceLength = 24;
  //# Helpers
  //#################################
  // Generate nonce from KMS's robust source of randomness.
  prepareNonce = (() => {
    var _ref = _asyncToGenerator(function* () {
      return yield randomKey(nonceLength, "buffer");
    });

    return function prepareNonce() {
      return _ref.apply(this, arguments);
    };
  })();
  // Ensure a given key is in the right form for NaCl-js
  prepareKey = function (key) {
    if (typeof key === "string") {
      return Buffer.from(key, "base64");
    } else {
      return key;
    }
  };
  // Ensure the plaintext is in the right form for NaCl-js
  preparePlaintext = function (msg, encoding) {
    if (encoding === "buffer") {
      return msg;
    } else {
      return Buffer.from(message, encoding);
    }
  };
  // Extract data from the blob for decryption.
  extractBlob = function (blob) {
    var ciphertext, nonce;
    ({ ciphertext, nonce } = JSON.parse(Buffer.from(blob, "base64").toString()));
    return {
      ciphertext: Buffer.from(ciphertext.data),
      nonce: Buffer.from(nonce.data)
    };
  };
  //# Mutual Functions
  generateKeyPairFromSecret = function (secret, encoding = "base64") {
    var pair;
    if (encoding !== "buffer") {
      secret = Buffer.from(secret, encoding);
    }
    pair = _tweetnacl2.default.box.keyPair.fromSecretKey(secret);
    return {
      publicKey: Buffer.from(pair.publicKey).toString("base64"),
      secretKey: Buffer.from(pair.secretKey).toString("base64")
    };
  };
  generateKeyPair = (() => {
    var _ref2 = _asyncToGenerator(function* () {
      var secretKey;
      secretKey = yield randomKey(secretLength, "buffer");
      return generateKeyPairFromSecret(secretKey, "buffer");
    });

    return function generateKeyPair() {
      return _ref2.apply(this, arguments);
    };
  })();
  //# Exposed Sub-Modules
  //###############################
  publicKey = function () {
    var decrypt, encrypt;
    encrypt = (() => {
      var _ref3 = _asyncToGenerator(function* (theirPublicKey, mySecretKey, message, encoding = "utf8") {
        var ciphertext, nonce;
        // Prepare for encryption.
        nonce = yield prepareNonce();
        theirPublicKey = prepareKey(theirPublicKey);
        mySecretKey = prepareKey(mySecretKey);
        message = preparePlaintext(message, encoding);
        // Encrypt.
        ciphertext = Buffer.from(_tweetnacl2.default.box(message, nonce, theirPublicKey, mySecretKey));
        // Return a blob of base64 to the outer layer.
        return Buffer.from(JSON.stringify({ ciphertext, nonce })).toString("base64");
      });

      return function encrypt(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    })();
    decrypt = function (theirPublicKey, mySecretKey, blob, encoding = "utf8") {
      var ciphertext, nonce;
      // Prepare for decryption
      ({ ciphertext, nonce } = extractBlob(blob));
      theirPublicKey = prepareKey(theirPublicKey);
      mySecretKey = prepareKey(mySecretKey);
      // Return the decrypted the message.
      if (encoding === "buffer") {
        return Buffer.from(_tweetnacl2.default.box.open(ciphertext, nonce, theirPublicKey, mySecretKey));
      } else {
        return Buffer.from(_tweetnacl2.default.box.open(ciphertext, nonce, theirPublicKey, mySecretKey)).toString(encoding);
      }
    };
    return { generateKeyPair, generateKeyPairFromSecret, encrypt, decrypt };
  }();
  sharedPublicKey = function () {
    var decrypt, encrypt, generateKey;
    generateKey = function (theirPublicKey, mySecretKey) {
      return Buffer.from(_tweetnacl2.default.box.before(theirPublicKey, mySecretKey)).toString("base64");
    };
    encrypt = (() => {
      var _ref4 = _asyncToGenerator(function* (sharedKey, messager, encoding = "utf8") {
        var ciphertext, message, nonce;
        // Prepare for encryption.
        nonce = yield prepareNonce();
        sharedKey = prepareKey(sharedKey);
        message = preparePlaintext(message, encoding);
        // Encrypt.
        ciphertext = Buffer.from(_tweetnacl2.default.box.after(message, nonce, sharedKey));
        // Return a blob of base64 to the outer layer.
        return Buffer.from(JSON.stringify({ ciphertext, nonce })).toString("base64");
      });

      return function encrypt(_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    })();
    decrypt = function (sharedKey, blob, encoding = "utf8") {
      var ciphertext, nonce;
      // Prepare for decryption
      ({ ciphertext, nonce } = extractBlob(blob));
      sharedKey = prepareKey(sharedKey);
      // Return the decrypted the message.
      if (encoding === "buffer") {
        return Buffer.from(_tweetnacl2.default.box.open.after(ciphertext, nonce, sharedKey));
      } else {
        return Buffer.from(_tweetnacl2.default.box.open.after(ciphertext, nonce, sharedKey)).toString(encoding);
      }
    };
    return { generateKeyPair, generateKeyPairFromSecret, generateSharedKey, encrypt, decrypt };
  }();
  return { publicKey, sharedPublicKey };
};

exports.default = box;
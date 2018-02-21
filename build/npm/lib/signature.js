"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// This submodule uses the TweetNaCl-js signature API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements  ed25519.
var signature;

signature = function ({ KMS }) {
  var generate, generateKeyPair, generateKeyPairFromSecret, open, prepareKey, preparePlaintext, publicLength, randomKey, secretLength, seedLength, sign, verify;
  // Access to the KMS API via sundog.
  ({ randomKey } = KMS);
  //# Constants
  //###############################
  // Length in bytes
  publicLength = 32;
  secretLength = 64;
  seedLength = 32;
  //# Helpers
  //#################################
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
  //# Exposed Functions
  //###############################
  generateKeyPairFromSecret = function (secret, encoding = "base64") {
    var pair;
    if (encoding !== "buffer") {
      secret = Buffer.from(secret, encoding);
    }
    pair = _tweetnacl2.default.sign.keyPair.fromSecretKey(secret);
    return {
      publicKey: Buffer.from(pair.publicKey).toString("base64"),
      secretKey: Buffer.from(pair.secretKey).toString("base64")
    };
  };
  generateKeyPair = (() => {
    var _ref = _asyncToGenerator(function* () {
      var secretKey;
      secretKey = yield randomKey(secretLength, "buffer");
      return generateKeyPairFromSecret(secretKey, "buffer");
    });

    return function generateKeyPair() {
      return _ref.apply(this, arguments);
    };
  })();
  sign = function (key, message, encoding = "utf8") {
    key = prepareKey(key);
    message = preparePlaintext(message, encoding);
    return Buffer.from(_tweetnacl2.default.sign(message, key)).toString("base64");
  };
  open = function (key, message, encoding = "utf8") {
    key = prepareKey(key);
    message = Buffer.from(message, "base64");
    // Return the message without signature
    if (encoding === "buffer") {
      return Buffer.from(_tweetnacl2.default.sign.open(message, key));
    } else {
      return Buffer.from(_tweetnacl2.default.sign.open(message, key)).toString(encoding);
    }
  };
  // Returns signature only.
  generate = function (key, message, encoding = "utf8") {
    key = prepareKey(key);
    message = preparePlaintext(message, encoding);
    return Buffer.from(_tweetnacl2.default.sign.detached(message, key)).toString("base64");
  };
  // Verifies detached signature with a document.
  verify = function (key, sig, message, encoding = "utf8") {
    key = prepareKey(key);
    sig = Buffer.from(sig, "base64");
    message = preparePlaintext(message, encoding);
    return _tweetnacl2.default.sign.detached.verify(message, sig, key);
  };
  return { generateKeyPairFromSecret, generateKeyPair, sign, open, generate, verify };
};

exports.default = signature;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _utils = require("./utils");

var _keys = require("./keys");

var _keyPairs = require("./key-pairs");

var _signedMessage = require("./signed-message");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sign;

// Define a multimethod.
sign = _fairmontMultimethods.Method.create();

// Signing a plain message.
_fairmontMultimethods.Method.define(sign, _keys.isPrivateKey, _keys.isPublicKey, _utils.isData, _fairmontHelpers.isString, function ({
  key: privateKey
}, {
  key: publicKey
}, message, encoding) {
  return (0, _signedMessage.signedMessage)({
    message: message,
    encoding: encoding,
    publicKeys: [publicKey],
    signatures: [_tweetnacl2.default.sign.detached(message, privateKey)]
  });
});

_fairmontMultimethods.Method.define(sign, _keys.isPrivateKey, _keys.isPublicKey, _utils.isData, function (privateKey, publicKey, message) {
  return sign(privateKey, publicKey, message, "buffer");
});

_fairmontMultimethods.Method.define(sign, _keys.isPrivateKey, _keys.isPublicKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (privateKey, publicKey, message, encoding) {
  return sign(privateKey, publicKey, (0, _utils.decode)(encoding, message), encoding);
});

_fairmontMultimethods.Method.define(sign, _keys.isPrivateKey, _keys.isPublicKey, _fairmontHelpers.isString, function (privateKey, publicKey, message) {
  return sign(privateKey, publicKey, (0, _utils.decode)("utf8", message), "utf8");
});

// Signing a plain message with whole Key Pair.
_fairmontMultimethods.Method.define(sign, _keyPairs.isSignatureKeyPair, _utils.isData, function ({ privateKey, publicKey }, message) {
  return sign(privateKey, publicKey, message, "buffer");
});

_fairmontMultimethods.Method.define(sign, _keyPairs.isSignatureKeyPair, _fairmontHelpers.isString, _fairmontHelpers.isString, function ({ privateKey, publicKey }, message, encoding) {
  return sign(privateKey, publicKey, (0, _utils.decode)(encoding, message), encoding);
});

_fairmontMultimethods.Method.define(sign, _keyPairs.isSignatureKeyPair, _fairmontHelpers.isString, function ({ privateKey, publicKey }, message) {
  return sign(privateKey, publicKey, (0, _utils.decode)("utf8", message), "utf8");
});

// Signing SignedMessage class (previously signed message).
_fairmontMultimethods.Method.define(sign, _keys.isPrivateKey, _keys.isPublicKey, _signedMessage.isSignedMessage, function ({
  key: privateKey
}, {
  key: publicKey
}, sig) {
  sig.publicKeys.push(publicKey);
  sig.signatures.push(_tweetnacl2.default.sign.detached(sig.message, privateKey));
  return sig;
});

_fairmontMultimethods.Method.define(sign, _keyPairs.isSignatureKeyPair, _signedMessage.isSignedMessage, function ({ privateKey, publicKey }, sig) {
  return sign(privateKey, publicKey, sig);
});

exports.default = sign;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _types = require("../types");

var _engine = require("./engine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIGN;

SIGN = function () {
  var Sign;
  // Define a multimethod.
  Sign = _fairmontMultimethods.Method.create();
  // Signing a plain message.
  _fairmontMultimethods.Method.define(Sign, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isString, function (privateKey, publicKey, message) {
    return (0, _engine.sign)(privateKey, publicKey, message, "utf8");
  });
  _fairmontMultimethods.Method.define(Sign, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isBuffer, function (privateKey, publicKey, message) {
    return (0, _engine.sign)(privateKey, publicKey, message, "buffer");
  });
  _fairmontMultimethods.Method.define(Sign, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (privateKey, publicKey, message, encoding) {
    return (0, _engine.sign)(privateKey, publicKey, message, encoding);
  });
  // Signing a plain message with whole Key Pair.
  _fairmontMultimethods.Method.define(Sign, _types.isKeyPair, _fairmontHelpers.isString, function ({ privateKey, publicKey }, message) {
    return (0, _engine.sign)(privateKey, publicKey, message, "utf8");
  });
  _fairmontMultimethods.Method.define(Sign, _types.isKeyPair, _fairmontHelpers.isBuffer, function ({ privateKey, publicKey }, message) {
    return (0, _engine.sign)(privateKey, publicKey, message, "buffer");
  });
  _fairmontMultimethods.Method.define(Sign, _types.isKeyPair, _fairmontHelpers.isString, _fairmontHelpers.isString, function ({ privateKey, publicKey }, message, encoding) {
    return (0, _engine.sign)(privateKey, publicKey, message, encoding);
  });
  // Signing SignedMessage class (previously signed message).
  _fairmontMultimethods.Method.define(Sign, _types.isPrivateKey, _types.isPublicKey, _types.isSignedMessage, function (privateKey, publicKey, signedMessage) {
    return (0, _engine.addSignature)(privateKey, publicKey, signedMessage);
  });
  _fairmontMultimethods.Method.define(Sign, _types.isKeyPair, _types.isSignedMessage, function ({ privateKey, publicKey }, message, encoding) {
    return (0, _engine.addSignature)(privateKey, publicKey, signedMessage);
  });
  // Return the multimethod.
  return Sign;
};

exports.default = SIGN;
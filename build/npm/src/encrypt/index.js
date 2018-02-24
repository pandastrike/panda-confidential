"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _keys = require("../keys");

var _types = require("../types");

var _symmetric = require("./symmetric");

var _symmetric2 = _interopRequireDefault(_symmetric);

var _asymmetric = require("./asymmetric");

var _asymmetric2 = _interopRequireDefault(_asymmetric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Encrypt;

Encrypt = function ({ KMS }) {
  var asymmetric, encrypt, symmetric;
  symmetric = (0, _symmetric2.default)(KMS);
  asymmetric = (0, _asymmetric2.default)(KMS);
  // Define a multimethod.
  encrypt = _fairmontMultimethods.Method.create();
  // Symmetric Encryption
  _fairmontMultimethods.Method.define(encrypt, _types.isKMSKey, _fairmontHelpers.isString, function (key, plaintext) {
    return symmetric(key, plaintext, "utf8");
  });
  _fairmontMultimethods.Method.define(encrypt, _types.isKMSKey, _fairmontHelpers.isBuffer, function (key, plaintext) {
    return symmetric(key, plaintext, "buffer");
  });
  _fairmontMultimethods.Method.define(encrypt, _types.isKMSKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, plaintext, encoding) {
    return symmetric(key, plaintext, encoding);
  });
  // Asymmetric Encryption via shared key.
  _fairmontMultimethods.Method.define(encrypt, _types.isSharedKey, _fairmontHelpers.isString, function (key, plaintext) {
    return asymmetric(key, plaintext, "utf8");
  });
  _fairmontMultimethods.Method.define(encrypt, _types.isSharedKey, _fairmontHelpers.isBuffer, function (key, plaintext) {
    return asymmetric(key, plaintext, "buffer");
  });
  _fairmontMultimethods.Method.define(encrypt, _types.isSharedKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, plaintext, encoding) {
    return asymmetric(key, plaintext, encoding);
  });
  // Asymmetric Encryption via separate private / public keys.
  _fairmontMultimethods.Method.define(encrypt, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isString, function (privateKey, publicKey, plaintext) {
    var key;
    key = new _keys.SharedKey(privateKey, publicKey);
    return asymmetric(key, plaintext, "utf8");
  });
  _fairmontMultimethods.Method.define(encrypt, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isBuffer, function (privateKey, publicKey, plaintext) {
    var key;
    key = new _keys.SharedKey(privateKey, publicKey);
    return asymmetric(key, plaintext, "buffer");
  });
  _fairmontMultimethods.Method.define(encrypt, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (privateKey, publicKey, plaintext, encoding) {
    var key;
    key = new _keys.SharedKey(privateKey, publicKey);
    return asymmetric(key, plaintext, encoding);
  });
  // Return the multimethod.
  return encrypt;
};

exports.default = Encrypt;
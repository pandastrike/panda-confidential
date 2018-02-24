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

var Decrypt;

Decrypt = function ({ KMS }) {
  var asymmetric, decrypt, symmetric;
  symmetric = (0, _symmetric2.default)(KMS);
  asymmetric = (0, _asymmetric2.default)();
  // Define a multimethod.
  decrypt = _fairmontMultimethods.Method.create();
  // Symmetric Decryption
  _fairmontMultimethods.Method.define(decrypt, _types.isKMSKey, _fairmontHelpers.isString, function (key, ciphertext) {
    return symmetric(key, ciphertext, "utf8");
  });
  _fairmontMultimethods.Method.define(decrypt, _types.isKMSKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, ciphertext, encoding) {
    return symmetric(key, ciphertext, encoding);
  });
  // Asymmetric Decryption via shared key.
  _fairmontMultimethods.Method.define(decrypt, _types.isSharedKey, _fairmontHelpers.isString, function (key, ciphertext) {
    return asymmetric(key, ciphertext, "utf8");
  });
  _fairmontMultimethods.Method.define(decrypt, _types.isSharedKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, ciphertext, encoding) {
    return asymmetric(key, ciphertext, encoding);
  });
  // Asymmetric Decryption via separate private / public keys.
  _fairmontMultimethods.Method.define(decrypt, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isString, function (privateKey, publicKey, ciphertext) {
    var key;
    key = new _keys.SharedKey(privateKey, publicKey);
    return asymmetric(key, ciphertext, "utf8");
  });
  _fairmontMultimethods.Method.define(decrypt, _types.isPrivateKey, _types.isPublicKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (privateKey, publicKey, ciphertext, encoding) {
    var key;
    key = new _keys.SharedKey(privateKey, publicKey);
    return asymmetric(key, ciphertext, encoding);
  });
  // Return the multimethod.
  return decrypt;
};

exports.default = Decrypt;
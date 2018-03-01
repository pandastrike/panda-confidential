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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decrypt;

// Define a multimethod for export.
decrypt = _fairmontMultimethods.Method.create();

// Symmetric Decryption
_fairmontMultimethods.Method.define(decrypt, _keys.isSymmetricKey, _utils.isData, _fairmontHelpers.isString, function ({ key }, blob, encoding) {
  var ciphertext, nonce;
  ({ ciphertext, nonce } = JSON.parse((0, _utils.encode)("utf8", blob)));
  ciphertext = (0, _utils.decode)("base64", ciphertext);
  nonce = (0, _utils.decode)("base64", nonce);
  return (0, _utils.encode)(encoding, _tweetnacl2.default.secretbox.open(ciphertext, nonce, key));
});

_fairmontMultimethods.Method.define(decrypt, _keys.isSymmetricKey, _utils.isData, function (key, blob) {
  return decrypt(key, blob, "utf8");
});

_fairmontMultimethods.Method.define(decrypt, _keys.isSymmetricKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, blob, encoding) {
  return decrypt(key, (0, _utils.decode)("base64", blob), encoding);
});

_fairmontMultimethods.Method.define(decrypt, _keys.isSymmetricKey, _fairmontHelpers.isString, function (key, blob) {
  return decrypt(key, (0, _utils.decode)("base64", blob), "utf8");
});

// Asymmetric Decryption via shared key.
_fairmontMultimethods.Method.define(decrypt, _keys.isSharedKey, _utils.isData, _fairmontHelpers.isString, function ({ key }, blob, encoding) {
  var ciphertext, nonce;
  ({ ciphertext, nonce } = JSON.parse((0, _utils.encode)("utf8", blob)));
  ciphertext = (0, _utils.decode)("base64", ciphertext);
  nonce = (0, _utils.decode)("base64", nonce);
  return (0, _utils.encode)(encoding, _tweetnacl2.default.box.open.after(ciphertext, nonce, key));
});

_fairmontMultimethods.Method.define(decrypt, _keys.isSharedKey, _utils.isData, function (key, blob) {
  return decrypt(key, blob, "utf8");
});

_fairmontMultimethods.Method.define(decrypt, _keys.isSharedKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, blob, encoding) {
  return decrypt(key, (0, _utils.decode)("base64", blob), encoding);
});

_fairmontMultimethods.Method.define(decrypt, _keys.isSharedKey, _fairmontHelpers.isString, function (key, blob) {
  return decrypt(key, (0, _utils.decode)("base64", blob), "utf8");
});

exports.default = decrypt;
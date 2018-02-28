"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSharedKey = exports.sharedKey = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _key = require("./key");

var _privateKey = require("./private-key");

var _publicKey = require("./public-key");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
var SharedKey, get, isSharedKey;

SharedKey = class SharedKey extends _key.Key {};

exports.isSharedKey = isSharedKey = (0, _fairmontHelpers.isType)(SharedKey);

// Create a key parsing multimethod.  Default to decoding a key literal...
exports.sharedKey = get = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(get, _utils.isData, function (input) {
  return new SharedKey(input);
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, function (input) {
  return get((0, _utils.decode)("base64", input));
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, _fairmontHelpers.isString, function (input, encoding) {
  return get((0, _utils.decode)(encoding, input));
});

// ... but the most common usecase is to accept two explicit key classes.
_fairmontMultimethods.Method.define(get, _privateKey.isPrivateKey, _publicKey.isPublicKey, function (privateKey, publicKey) {
  return get(_tweetnacl2.default.box.before(publicKey.key, privateKey.key));
});

_fairmontMultimethods.Method.define(get, _publicKey.isPublicKey, _privateKey.isPrivateKey, function (publicKey, privateKey) {
  return get(_tweetnacl2.default.box.before(publicKey.key, privateKey.key));
});

exports.sharedKey = get;
exports.isSharedKey = isSharedKey;
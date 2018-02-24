"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _key = require("./key");

var _key2 = _interopRequireDefault(_key);

var _keyUtils = require("./key-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
var SharedKey, generateShared, getKey;

generateShared = function (privateKey, publicKey) {
  privateKey = (0, _keyUtils.decodeKey)(privateKey);
  publicKey = (0, _keyUtils.decodeKey)(publicKey);
  return (0, _keyUtils.encode)("base64", _tweetnacl2.default.box.before(publicKey, privateKey));
};

// Create a key parsing multimethod.
getKey = _fairmontMultimethods.Method.create();

// The most common usecase is to accept two explicit keys.
_fairmontMultimethods.Method.define(getKey, _keyUtils.isPrivateKey, _keyUtils.isPublicKey, function (privateKey, publicKey) {
  return generateShared(privateKey, publicKey);
});

_fairmontMultimethods.Method.define(getKey, _keyUtils.isPublicKey, _keyUtils.isPrivateKey, function (publicKey, privateKey) {
  return generateShared(privateKey, publicKey);
});

// Also support a directly input key from somewhere.
_fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isBuffer, function (key) {
  return (0, _keyUtils.encode)("base64", key);
});

_fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isString, function (key) {
  return key;
});

_fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, encoding) {
  return (0, _keyUtils.encode)("base64", Buffer.from(key, encoding));
});

SharedKey = class SharedKey extends _key2.default {
  constructor(input1, input2) {
    super();
    if (input2) {
      this.key = getKey(input1, input2);
    } else {
      this.key = getKey(input1);
    }
  }

};

exports.default = SharedKey;
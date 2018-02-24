"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SharedKey = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethod = require("fairmont-multimethod");

var _key = require("./key");

var _keyUtils = require("./key-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SharedKey = exports.SharedKey = class SharedKey extends _key.Key {
  constructor(input1, input2) {
    var generateShared, getKey;
    super();
    this.key = void 0;
    generateShared = function (privateKey, publicKey) {
      privateKey = decodeKey(privateKey);
      publicKey = decodeKey(publicKey);
      return this.key = (0, _keyUtils.encode)("base64", _tweetnacl2.default.box.before(publicKey, privateKey));
    };
    // Create a key parsing multimethod.
    getKey = _fairmontMultimethod.Method.create();
    // The most common usecase is to accept two explicit keys.
    _fairmontMultimethod.Method.define(getKey, _keyUtils.isPrivateKey, _keyUtils.isPublicKey, function (privateKey, publicKey) {
      return generateShared(privateKey, publicKey);
    });
    _fairmontMultimethod.Method.define(getKey, _keyUtils.isPublicKey, _keyUtils.isPrivateKey, function (publicKey, privateKey) {
      return generateShared(privateKey, publicKey);
    });
    // Also support a directly input key from somewhere.
    _fairmontMultimethod.Method.define(getKey, _fairmontHelpers.isBuffer, function (key) {
      return this.key = (0, _keyUtils.encode)("base64", key);
    });
    _fairmontMultimethod.Method.define(getKey, _fairmontHelpers.isString, function (key) {
      return this.key = key;
    });
    _fairmontMultimethod.Method.define(getKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, encoding) {
      return this.key = (0, _keyUtils.encode)("base64", Buffer.from(key, encoding));
    });
    if (input2) {
      getKey(input1, input2);
    } else {
      getKey(input1);
    }
  }

}; // This is a derived key formed from one person's private key and another's public key to form a shared secret key used in PKE encryption.
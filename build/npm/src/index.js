"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confidential = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _keys = require("./keys");

var _keyPairs = require("./key-pairs");

var _signedMessage = require("./signed-message");

var _encrypt = require("./encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

var _decrypt = require("./decrypt");

var _decrypt2 = _interopRequireDefault(_decrypt);

var _sign = require("./sign");

var _sign2 = _interopRequireDefault(_sign);

var _verify = require("./verify");

var _verify2 = _interopRequireDefault(_verify);

var _hash = require("./hash");

var _hash2 = _interopRequireDefault(_hash);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confidential;

exports.confidential = confidential = function () {
  var c;
  c = {
    randomBytes: _tweetnacl2.default.randomBytes
  };
  c.key = {
    Private: (0, _keys.privateKey)(c.randomBytes),
    Public: _keys.publicKey,
    Shared: _keys.sharedKey,
    isPrivateKey: _keys.isPrivateKey,
    isPublicKey: _keys.isPublicKey,
    isSharedKey: _keys.isSharedKey
  };
  c.keyPair = {
    Encryption: (0, _keyPairs.encryptionKeyPair)(c.randomBytes, c.key),
    Signature: (0, _keyPairs.signatureKeyPair)(c.randomBytes, c.key),
    isEncryptionKeyPair: _keyPairs.isEncryptionKeyPair,
    isSignatureKeyPair: _keyPairs.isSignatureKeyPair
  };
  c.signedMessage = _signedMessage.signedMessage;
  c.isSignedMessage = _signedMessage.isSignedMessage;
  c.encrypt = (0, _encrypt2.default)(c.randomBytes);
  c.decrypt = _decrypt2.default;
  c.sign = _sign2.default;
  c.verify = _verify2.default;
  c.hash = _hash2.default;
  c.utils = { encode: _utils.encode, decode: _utils.decode, isData: _utils.isData };
  c.nacl = _tweetnacl2.default;
  return c;
};

exports.confidential = confidential;
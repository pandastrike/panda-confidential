"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEncryptionKeyPair = exports.encryptionKeyPair = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _keyPair = require("./key-pair");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var EncryptionKeyPair, encryptionKeyPair, isEncryptionKeyPair;

EncryptionKeyPair = class EncryptionKeyPair extends _keyPair.KeyPair {};

exports.isEncryptionKeyPair = isEncryptionKeyPair = (0, _fairmontHelpers.isType)(EncryptionKeyPair);

exports.encryptionKeyPair = encryptionKeyPair = function (randomBytes, {
  Private: privateKey,
  Public: publicKey
}) {
  return _asyncToGenerator(function* () {
    // Generate a random input to generate a pair. Length comes from TweetNaCl.
    var input, pair;
    input = yield randomBytes(_tweetnacl2.default.box.secretKeyLength);
    pair = _tweetnacl2.default.box.keyPair.fromSecretKey(input);
    return new EncryptionKeyPair({
      privateKey: yield privateKey(pair.secretKey),
      publicKey: publicKey(pair.publicKey)
    });
  });
};

exports.encryptionKeyPair = encryptionKeyPair;
exports.isEncryptionKeyPair = isEncryptionKeyPair;
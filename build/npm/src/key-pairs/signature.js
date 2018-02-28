"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSignatureKeyPair = exports.signatureKeyPair = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _keyPair = require("./key-pair");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SignatureKeyPair, isSignatureKeyPair, signatureKeyPair;

SignatureKeyPair = class SignatureKeyPair extends _keyPair.KeyPair {};

exports.isSignatureKeyPair = isSignatureKeyPair = (0, _fairmontHelpers.isType)(SignatureKeyPair);

exports.signatureKeyPair = signatureKeyPair = function (randomBytes, {
  Private: privateKey,
  Public: publicKey
}) {
  return _asyncToGenerator(function* () {
    // Generate a random input to generate a pair. Length comes from TweetNaCl.
    var input, pair;
    input = yield randomBytes(_tweetnacl2.default.sign.seedLength);
    pair = _tweetnacl2.default.sign.keyPair.fromSeed(input);
    return new SignatureKeyPair({
      privateKey: yield privateKey(pair.secretKey),
      publicKey: publicKey(pair.publicKey)
    });
  });
};

exports.signatureKeyPair = signatureKeyPair;
exports.isSignatureKeyPair = isSignatureKeyPair;
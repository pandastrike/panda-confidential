"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEncryptionKeyPair = exports.encryptionKeyPair = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _keyPair = require("./key-pair");

var _keys = require("../keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var EncryptionKeyPair, encryptionKeyPair, isEncryptionKeyPair;

EncryptionKeyPair = class EncryptionKeyPair extends _keyPair.KeyPair {};

exports.isEncryptionKeyPair = isEncryptionKeyPair = (0, _fairmontHelpers.isType)(EncryptionKeyPair);

exports.encryptionKeyPair = encryptionKeyPair = function (randomBytes) {
  var getPair;
  // Generate a random input to generate a pair. Length comes from TweetNaCl.
  getPair = _fairmontMultimethods.Method.create({
    default: (() => {
      var _ref = _asyncToGenerator(function* () {
        var input, pair;
        input = yield randomBytes(_tweetnacl2.default.box.secretKeyLength);
        pair = _tweetnacl2.default.box.keyPair.fromSecretKey(input);
        return new EncryptionKeyPair({
          privateKey: (0, _keys.privateKey)(pair.secretKey),
          publicKey: (0, _keys.publicKey)(pair.publicKey)
        });
      });

      return function _default() {
        return _ref.apply(this, arguments);
      };
    })()
  });
  _fairmontMultimethods.Method.define(getPair, _fairmontHelpers.isObject, function (o) {
    return new EncryptionKeyPair(o);
  });
  return getPair;
};

exports.encryptionKeyPair = encryptionKeyPair;
exports.isEncryptionKeyPair = isEncryptionKeyPair;
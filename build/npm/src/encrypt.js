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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Encrypt;

Encrypt = function (randomBytes) {
  var encrypt;
  // Define a multimethod to export.
  encrypt = _fairmontMultimethods.Method.create();
  // Symmetric Encryption
  _fairmontMultimethods.Method.define(encrypt, _keys.isPrivateKey, _utils.isData, (() => {
    var _ref = _asyncToGenerator(function* ({ key }, plaintext) {
      var ciphertext, nonce;
      nonce = yield randomBytes(_tweetnacl2.default.secretbox.nonceLength);
      ciphertext = _tweetnacl2.default.secretbox(plaintext, nonce, key);
      return (0, _utils.encode)({
        ciphertext: (0, _utils.encode)("base64", ciphertext),
        nonce: (0, _utils.encode)("base64", nonce)
      });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());
  _fairmontMultimethods.Method.define(encrypt, _keys.isPrivateKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, plaintext, encoding) {
    return encrypt(key, (0, _utils.decode)(encoding, plaintext));
  });
  _fairmontMultimethods.Method.define(encrypt, _keys.isPrivateKey, _fairmontHelpers.isString, function (key, plaintext) {
    return encrypt(key, (0, _utils.decode)("utf8", plaintext));
  });
  // Asymmetric Encryption via shared key.
  _fairmontMultimethods.Method.define(encrypt, _keys.isSharedKey, _utils.isData, (() => {
    var _ref2 = _asyncToGenerator(function* ({ key }, plaintext) {
      var ciphertext, nonce;
      nonce = yield randomBytes(_tweetnacl2.default.box.nonceLength);
      ciphertext = _tweetnacl2.default.box.after(plaintext, nonce, key);
      return (0, _utils.encode)({
        ciphertext: (0, _utils.encode)("base64", ciphertext),
        nonce: (0, _utils.encode)("base64", nonce)
      });
    });

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })());
  _fairmontMultimethods.Method.define(encrypt, _keys.isSharedKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, plaintext, encoding) {
    return encrypt(key, (0, _utils.decode)(encoding, plaintext));
  });
  _fairmontMultimethods.Method.define(encrypt, _keys.isSharedKey, _fairmontHelpers.isString, function (key, plaintext) {
    return encrypt(key, (0, _utils.decode)("utf8", plaintext));
  });
  // Return the multimethod.
  return encrypt;
};

exports.default = Encrypt;
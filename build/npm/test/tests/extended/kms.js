"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _kmsKey = require("./kms-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var kms;

// Extend Confidential with KMS via sundog.
kms = function (confidential, SDK) {
  var decode, encode, isData, kmsDecrypt, kmsEncrypt, nacl, randomBytes, randomKey;
  ({
    AWS: {
      KMS: {
        randomKey,
        encrypt: kmsEncrypt,
        decrypt: kmsDecrypt
      }
    }
  } = (0, _sundog2.default)(SDK));
  confidential.randomBytes = (() => {
    var _ref = _asyncToGenerator(function* (length) {
      return yield randomKey(length, "buffer");
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
  ({
    utils: { encode, decode, isData },
    randomBytes,
    nacl
  } = confidential);
  // Extension to Symmetric Encryption that encrypts the key with KMS.
  _fairmontMultimethods.Method.define(confidential.encrypt, _kmsKey.isKMSKeyID, isData, (() => {
    var _ref2 = _asyncToGenerator(function* ({ id }, plaintext) {
      var ciphertext, key, length, lockedKey, nonce, r;
      length = nacl.secretbox.nonceLength + nacl.secretbox.keyLength;
      r = yield randomBytes(length);
      key = r.slice(0, nacl.secretbox.keyLength);
      nonce = r.slice(nacl.secretbox.keyLength);
      ciphertext = nacl.secretbox(plaintext, nonce, key);
      lockedKey = yield kmsEncrypt(id, key, "buffer");
      return encode({
        lockedKey: lockedKey, // Already base64
        ciphertext: encode("base64", ciphertext),
        nonce: encode("base64", nonce)
      });
    });

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  })());
  _fairmontMultimethods.Method.define(confidential.encrypt, _kmsKey.isKMSKeyID, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, plaintext, encoding) {
    return confidential.encrypt(key, decode(encoding, plaintext));
  });
  _fairmontMultimethods.Method.define(confidential.encrypt, _kmsKey.isKMSKeyID, _fairmontHelpers.isString, function (key, plaintext) {
    return confidential.encrypt(key, decode("utf8", plaintext));
  });
  // Extension to Symmetric Decryption that encrypts the key with KMS.
  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, isData, _fairmontHelpers.isString, (() => {
    var _ref3 = _asyncToGenerator(function* ({ id }, blob, encoding) {
      var ciphertext, key, lockedKey, nonce;
      ({ ciphertext, nonce, lockedKey } = JSON.parse(encode("utf8", blob)));
      ciphertext = decode("base64", ciphertext);
      nonce = decode("base64", nonce);
      key = yield kmsDecrypt(lockedKey, "buffer");
      return encode(encoding, nacl.secretbox.open(ciphertext, nonce, key));
    });

    return function (_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  })());
  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, isData, function (key, blob) {
    return confidential.decrypt(key, blob, "utf8");
  });
  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, blob, encoding) {
    return confidential.decrypt(key, decode("base64", blob), encoding);
  });
  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, _fairmontHelpers.isString, function (key, blob) {
    return confidential.decrypt(key, decode("base64", blob), "utf8");
  });
  return confidential;
};

exports.default = kms;
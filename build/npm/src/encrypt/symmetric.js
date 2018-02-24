"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _utils = require("../utils");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SymmetricEncrypt, keyLength, nonceLength;

({ nonceLength, keyLength } = _constants.encryption.symmetric);

SymmetricEncrypt = function ({
  randomKey,
  encrypt: kmsEncrypt
}) {
  return (() => {
    var _ref = _asyncToGenerator(function* ({
      key: kmsKey
    }, message, encoding) {
      var ciphertext, key, lockedKey, nonce, random;
      // Get key + nonce from KMS's robust source of entropy.
      random = yield randomKey(keyLength + nonceLength, "buffer");
      key = random.slice(0, keyLength);
      nonce = random.slice(keyLength);
      message = (0, _utils.decodePlaintext)(message, encoding);
      // Encrypt the message. Convert from UInt8Array to Buffer.
      ciphertext = (0, _utils.encode)("buffer", _tweetnacl2.default.secretbox(message, nonce, key));
      // Lock the key
      lockedKey = yield kmsEncrypt(kmsKey, key, "buffer");
      // Return a blob of base64 to the outer layer.
      return (0, _utils.encode)("base64", JSON.stringify({ ciphertext, nonce, lockedKey }));
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })();
};

exports.default = SymmetricEncrypt;
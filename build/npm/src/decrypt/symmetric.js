"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SymmetricDecrypt;

SymmetricDecrypt = function ({
  decrypt: kmsDecrypt
}) {
  return (() => {
    var _ref = _asyncToGenerator(function* ({
      key: kmsKey
    }, blob, encoding) {
      var ciphertext, key, lockedKey, nonce;
      // Extract data from the blob for decryption.
      ({ ciphertext, nonce, lockedKey } = (0, _utils.decodeCiphertext)(blob));
      // Unlock the key.
      key = yield kmsDecrypt(lockedKey, "buffer");
      // Return the decrypted the message.
      return (0, _utils.encode)(encoding, _tweetnacl2.default.secretbox.open(ciphertext, nonce, key));
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })();
};

exports.default = SymmetricDecrypt;
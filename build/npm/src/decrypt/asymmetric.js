"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsymmetricDecrypt;

AsymmetricDecrypt = function () {
  return function (sharedKey, blob, encoding) {
    var ciphertext, nonce;
    // Extract data from the blob for decryption.
    ({ ciphertext, nonce } = (0, _utils.decodeCiphertext)(blob));
    sharedKey = (0, _utils.decodeKey)(sharedKey);
    // Return the decrypted the message.
    return (0, _utils.encode)(encoding, _tweetnacl2.default.box.open.after(ciphertext, nonce, sharedKey));
  };
};

exports.default = AsymmetricDecrypt;
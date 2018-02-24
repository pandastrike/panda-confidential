"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _verify, verify;

_verify = function (message, key, sig) {
  key = (0, _utils.decodeKey)(key);
  sig = (0, _utils.decodePlaintext)(sig, "base64");
  return _tweetnacl2.default.sign.detached.verify(message, sig, key);
};

exports.verify = verify = function ({ message, encoding, publicKeys, signatures }) {
  var i, j, ref;
  if (publicKeys.length !== signatures.length) {
    return false;
  }
  // Run through list of signatures and public keys and verify.
  message = (0, _utils.decodePlaintext)(message, "base64");
  for (i = j = 0, ref = publicKeys.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (!_verify(message, publicKeys[i], signatures[i])) {
      return false;
    }
  }
  // Verification completed successfully.  Return originally encoded message.
  return (0, _utils.encode)(encoding, message);
};

exports.verify = verify;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSignature = exports.sign = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addSignature, sign;

exports.sign = sign = function (privateKey, publicKey, message, encoding) {
  var key;
  key = (0, _utils.decodeKey)(privateKey);
  message = (0, _utils.decodePlaintext)(message, encoding);
  // Return a blob of base64 to the outer layer.
  return (0, _utils.encode)("base64", JSON.stringify({
    message: (0, _utils.encode)("base64", message),
    encoding: encoding,
    publicKeys: [publicKey.key],
    signatures: [(0, _utils.encode)("base64", _tweetnacl2.default.sign.detached(message, key))]
  }));
};

exports.addSignature = addSignature = function (privateKey, publicKey, signedMessage) {
  var key, message;
  key = (0, _utils.decodeKey)(privateKey);
  message = (0, _utils.decodePlaintext)(signedMessage.message, "base64");
  signedMessage.publicKeys.push(publicKey.key);
  signedMessage.signatures.push((0, _utils.encode)("base64", _tweetnacl2.default.sign.detached(message, key)));
  // Return a blob of base64 to the outer layer.
  return (0, _utils.encode)("base64", JSON.stringify(signedMessage));
};

exports.sign = sign;
exports.addSignature = addSignature;
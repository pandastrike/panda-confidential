"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _signedMessage = require("./signed-message");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verify;

// Define a multimethod.
verify = _fairmontMultimethods.Method.create();

// Verify the signature(s) on a message.
_fairmontMultimethods.Method.define(verify, _signedMessage.isSignedMessage, function ({ message, encoding, publicKeys, signatures }) {
  var i, j, ref;
  if (publicKeys.length !== signatures.length) {
    return false;
  }
  for (i = j = 0, ref = publicKeys.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (!_tweetnacl2.default.sign.detached.verify(message, signatures[i], publicKeys[i])) {
      return false;
    }
  }
  return true;
});

_fairmontMultimethods.Method.define(verify, _fairmontHelpers.isString, function (message) {
  return verify((0, _signedMessage.signedMessage)(message));
});

_fairmontMultimethods.Method.define(verify, _utils.isData, function (message) {
  return verify((0, _signedMessage.signedMessage)(message));
});

exports.default = verify;
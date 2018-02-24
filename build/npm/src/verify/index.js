"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontMultimethods = require("fairmont-multimethods");

var _types = require("../types");

var _engine = require("./engine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERIFY;

VERIFY = function () {
  var Verify;
  // Define a multimethod.
  Verify = _fairmontMultimethods.Method.create();
  // Verify the signature(s) on a message and return the message.
  _fairmontMultimethods.Method.define(Verify, _types.isSignedMessage, function (signedMessage) {
    return (0, _engine.verify)(signedMessage);
  });
  // Return the multimethod.
  return Verify;
};

exports.default = VERIFY;
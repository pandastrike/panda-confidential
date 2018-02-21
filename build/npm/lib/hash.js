"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This submodule uses the TweetNaCl-js hash API, along with
var hash;

hash = function () {
  var md5, preparePlaintext, sha512;
  //# Helpers
  //#################################
  // Ensure the plaintext is in the right form for NaCl-js
  preparePlaintext = function (msg, encoding) {
    if (encoding === "buffer") {
      return msg;
    } else {
      return Buffer.from(message, encoding);
    }
  };
  //# Exposed Functions
  //###############################
  // encoding is ignored by Node if msg is a buffer.
  md5 = function (msg, encoding = "utf8") {
    return _crypto2.default.createHash('md5').update(msg, encoding).digest("hex");
  };
  sha512 = function (msg, encoding = "utf8") {
    msg = preparePlaintext(msg, encoding);
    return Bufffer.from(_tweetnacl2.default.hash(msg)).toString("hex");
  };
  return { md5, sha512 };
};

exports.default = hash;
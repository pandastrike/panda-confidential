"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This submodule uses the TweetNaCl-js hash API, along with
var utility;

utility = function () {
  var prepareKey, verify;
  //# Helpers
  //#################################
  // Ensure a given key is in the right form for NaCl-js
  prepareKey = function (key) {
    if (typeof key === "string") {
      return Buffer.from(key, "base64");
    } else {
      return key;
    }
  };
  //# Exposed Functions
  //###############################
  verify = function (keyA, keyB) {
    keyA = prepareKey(keyA);
    keyB = prepareKey(keyB);
    return _tweetnacl2.default.verify(x, y);
  };
  return { verify };
};

exports.default = utility;
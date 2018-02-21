"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This submodule uses the TweetNaCl-js scalar multiplication API -- according to https://github.com/dchest/tweetnacl-js/blob/master/README.md implements x25519.
var scalar;

scalar = function () {
  var multiply;
  multiply = function (n, p) {
    if (p) {
      return _tweetnacl2.default.scalarMult(n, p);
    } else {
      return _tweetnacl2.default.scalarMult.base(n);
    }
  };
  return { multiply };
};

exports.default = scalar;
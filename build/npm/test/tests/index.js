"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _amen = require("amen");

var _symmetricEncryption = require("./symmetric-encryption");

var _symmetricEncryption2 = _interopRequireDefault(_symmetricEncryption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Tests;

// import publicKey from "./public-key"
// import sharedPublicKey from "./shared-public-key"
// import scalar from "./scalar"
// import signature from "./signature"
Tests = (() => {
  var _ref = _asyncToGenerator(function* (SDK) {
    return (0, _amen.print)((yield (0, _amen.test)("Panda Confidential", [(0, _amen.test)({
      description: "Symmetric Encryption",
      wait: false
    }, (0, _symmetricEncryption2.default)(SDK))])));
  });

  return function Tests(_x) {
    return _ref.apply(this, arguments);
  };
})();

// test
//   description: "Public Key Encryption"
//   wait: false,
//   publicKey SDK

// test
//   description: "Shared Public Key Encryption"
//   wait: false,
//   sharedPublicKey SDK

// test
//   description: "Digital Signature"
//   wait: false,
//   signature SDK
exports.default = Tests;
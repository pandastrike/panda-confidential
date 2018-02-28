"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _amen = require("amen");

var _symmetricEncryption = require("./symmetric-encryption");

var _symmetricEncryption2 = _interopRequireDefault(_symmetricEncryption);

var _asymmetricEncryption = require("./asymmetric-encryption");

var _asymmetricEncryption2 = _interopRequireDefault(_asymmetricEncryption);

var _signature = require("./signature");

var _signature2 = _interopRequireDefault(_signature);

var _hash = require("./hash");

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Test;

Test = (() => {
  var _ref = _asyncToGenerator(function* () {
    return yield (0, _amen.print)((yield (0, _amen.test)("Panda Confidential", [(0, _amen.test)({
      description: "Symmetric Encryption",
      wait: false
    }, _symmetricEncryption2.default), (0, _amen.test)({
      description: "Public Key Encryption",
      wait: false
    }, _asymmetricEncryption2.default), (0, _amen.test)({
      description: "Digital Signature",
      wait: false
    }, _signature2.default), (0, _amen.test)({
      description: "SHA-512 Hash",
      wait: false
    }, _hash2.default)])));
  });

  return function Test() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = Test;
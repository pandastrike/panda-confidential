"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _secretKey = require("./secret-key");

var _secretKey2 = _interopRequireDefault(_secretKey);

var _publicKey = require("./public-key");

var _publicKey2 = _interopRequireDefault(_publicKey);

var _scalar = require("./scalar");

var _scalar2 = _interopRequireDefault(_scalar);

var _signature = require("./signature");

var _signature2 = _interopRequireDefault(_signature);

var _hash = require("./hash");

var _hash2 = _interopRequireDefault(_hash);

var _utility = require("./utility");

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confidential;

Confidential = function (SDK) {
  var AWS, publicKey, sharedPublicKey;
  ({ AWS } = (0, _sundog2.default)(SDK));
  ({ publicKey, sharedPublicKey } = (0, _publicKey2.default)(AWS));
  return Object.defineProperties({}, {
    secretKey: {
      enumerable: true,
      get: function () {
        return (0, _secretKey2.default)(AWS);
      }
    },
    publicKey: {
      enumerable: true,
      get: function () {
        return publicKey;
      }
    },
    sharedPublicKey: {
      enumerable: true,
      get: function () {
        return sharedPublicKey;
      }
    },
    scalar: {
      enumerable: true,
      get: function () {
        return (0, _scalar2.default)();
      }
    },
    signature: {
      enumerable: true,
      get: function () {
        return (0, _signature2.default)(AWS);
      }
    },
    hash: {
      enumerable: true,
      get: function () {
        return (0, _hash2.default)();
      }
    },
    random: {
      enumerable: true,
      get: function () {
        return AWS.KMS.randomKey;
      }
    },
    utility: {
      enumerable: true,
      get: function () {
        return (0, _utility2.default)();
      }
    }
  });
};

exports.default = Confidential;
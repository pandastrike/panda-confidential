"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

var _keys = require("./keys");

var _encrypt = require("./encrypt");

var _encrypt2 = _interopRequireDefault(_encrypt);

var _decrypt = require("./decrypt");

var _decrypt2 = _interopRequireDefault(_decrypt);

var _sign = require("./sign");

var _sign2 = _interopRequireDefault(_sign);

var _verify = require("./verify");

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confidential;

Confidential = function (SDK) {
  var AWS;
  ({ AWS } = (0, _sundog2.default)(SDK));
  return Object.defineProperties({}, {
    KeyPair: {
      enumerable: true,
      get: function () {
        return (0, _keys.KeyPair)(AWS);
      }
    },
    KMSKey: {
      enumerable: true,
      get: function () {
        return _keys.KMSKey;
      }
    },
    PrivateKey: {
      enumerable: true,
      get: function () {
        return _keys.PrivateKey;
      }
    },
    PublicKey: {
      enumerable: true,
      get: function () {
        return _keys.PublicKey;
      }
    },
    SharedKey: {
      enumerable: true,
      get: function () {
        return _keys.SharedKey;
      }
    },
    SignedMessage: {
      enumerable: true,
      get: function () {
        return _keys.SignedMessage;
      }
    },
    encrypt: {
      enumerable: true,
      get: function () {
        return (0, _encrypt2.default)(AWS);
      }
    },
    decrypt: {
      enumerable: true,
      get: function () {
        return (0, _decrypt2.default)(AWS);
      }
    },
    sign: {
      enumerable: true,
      get: function () {
        return (0, _sign2.default)();
      }
    },
    verify: {
      enumerable: true,
      get: function () {
        return (0, _verify2.default)();
      }
    }
  });
};

exports.default = Confidential;
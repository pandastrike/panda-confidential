"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _keyUtils = require("./key-utils");

var _privateKey = require("./private-key");

var _privateKey2 = _interopRequireDefault(_privateKey);

var _publicKey = require("./public-key");

var _publicKey2 = _interopRequireDefault(_publicKey);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Allows developers to generate key pairs on demand from KMS's source of randomness for the two types of key pairs in TweetNaCl:
// (1) Public-Key Authenticated Encryption via x25519-xsalsa20-poly1305
// (2) Signing via ed25519
var pair;

pair = function ({
  KMS: { randomKey }
}) {
  var KeyPair, generatePair, getInput, getRandom;
  getRandom = (() => {
    var _ref = _asyncToGenerator(function* (length) {
      return yield randomKey(length, "buffer");
    });

    return function getRandom(_x) {
      return _ref.apply(this, arguments);
    };
  })();
  getInput = (() => {
    var _ref2 = _asyncToGenerator(function* (length, input, encoding) {
      var get;
      if (!input) {
        return yield getRandom(length);
      }
      get = _fairmontMultimethods.Method.create();
      _fairmontMultimethods.Method.define(get, _fairmontHelpers.isBuffer, function (b) {
        return b;
      });
      _fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, function (s) {
        return Buffer.from(s, "base64");
      });
      _fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, _fairmontHelpers.isString, function (s, e) {
        return Buffer.from(s, e);
      });
      _fairmontMultimethods.Method.define(get, _keyUtils.isKey, function ({ key }) {
        return Buffer.from(key, "base64");
      });
      if (encoding) {
        return get(input, encoding);
      } else {
        return get(input);
      }
    });

    return function getInput(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })();
  // Accept a TweetNaCl method and use it with an input to generate a pair.
  generatePair = function (f, input) {
    pair = f(input);
    return {
      privateKey: new _privateKey2.default((0, _keyUtils.encode)("base64", pair.secretKey)),
      publicKey: new _publicKey2.default((0, _keyUtils.encode)("base64", pair.publicKey))
    };
  };
  return KeyPair = class KeyPair {
    constructor() {}

    static generate(type, input, encoding) {
      var _this = this;

      return _asyncToGenerator(function* () {
        var keyInput, length;
        return ({ privateKey: _this.privateKey, publicKey: _this.publicKey } = yield _asyncToGenerator(function* () {
          switch (type) {
            case "encrypt":
              length = _constants.encryption.asymmetric.privateKeyLength;
              keyInput = yield getInput(length, input, encoding);
              return generatePair(_tweetnacl2.default.box.keyPair.fromSecretKey, keyInput);
            case "sign":
              length = _constants.signing.seedLength;
              keyInput = yield getInput(length, input, encoding);
              return generatePair(_tweetnacl2.default.sign.keyPair.fromSeed, keyInput);
            default:
              throw new Error(`Unsupported key pair type, ${type}`);
          }
        })());
      })();
    }

  };
};

exports.default = pair;
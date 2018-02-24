"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyPair = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethod = require("fairmont-multimethod");

var _keyUtils = require("./key-utils");

var _privateKey = require("./private-key");

var _publicKey = require("./public-key");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Allows developers to generate key pairs on demand from KMS's source of randomness for the two types of key pairs in TweetNaCl:
// (1) Public-Key Authenticated Encryption via x25519-xsalsa20-poly1305
// (2) Signing via ed25519


var KeyPair = exports.KeyPair = class KeyPair {
  constructor() {}

  static _generate({
    KMS: { randomKey }
  }) {
    return this.generate = (() => {
      var _ref = _asyncToGenerator(function* (type, input, encoding) {
        var generatePair, getInput, getRandom, keyInput;
        getRandom = (() => {
          var _ref2 = _asyncToGenerator(function* (length) {
            return yield randomKey(length, "buffer");
          });

          return function getRandom(_x4) {
            return _ref2.apply(this, arguments);
          };
        })();
        getInput = (() => {
          var _ref3 = _asyncToGenerator(function* (length) {
            var get;
            if (!input) {
              return yield getRandom(length);
            }
            get = _fairmontMultimethod.Method.create();
            _fairmontMultimethod.Method.define(get, _fairmontHelpers.isBuffer, function (b) {
              return b;
            });
            _fairmontMultimethod.Method.define(get, _fairmontHelpers.isString, function (s) {
              return Buffer.from(s, "base64");
            });
            _fairmontMultimethod.Method.define(get, _fairmontHelpers.isString, _fairmontHelpers.isString, function (s, e) {
              return Buffer.from(s, e);
            });
            _fairmontMultimethod.Method.define(get, _keyUtils.isKey, function ({ key }) {
              return Buffer.from(key, "base64");
            });
            if (encoding) {
              return get(input, encoding);
            } else {
              return get(input);
            }
          });

          return function getInput(_x5) {
            return _ref3.apply(this, arguments);
          };
        })();
        // Accept a TweetNaCl method and use it with an input to generate a pair.
        generatePair = function (f, input) {
          var pair;
          pair = f(input);
          this.privateKey = new _privateKey.PrivateKey((0, _keyUtils.encode)("base64", pair.secretKey));
          return this.publicKey = new _publicKey.PublicKey((0, _keyUtils.encode)("base64", pair.publicKey));
        };
        switch (type) {
          case "encrypt":
            keyInput = yield getInput(_constants.encryption.asymmetric.privateKeyLength);
            return generatePair(_tweetnacl2.default.box.keyPair.fromSecretKey, keyInput);
          case "sign":
            keyInput = yield getInput(_constants.signing.privateKeyLength);
            return generatePair(_tweetnacl2.default.sign.keyPair.fromSeed, keyInput);
          default:
            throw new Error(`Unsupported key pair type, ${type}`);
        }
      });

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    })();
  }

};
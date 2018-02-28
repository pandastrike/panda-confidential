"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPrivateKey = exports.privateKey = undefined;

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _key = require("./key");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PrivateKey, isPrivateKey, privateKey;

PrivateKey = class PrivateKey extends _key.Key {};

exports.isPrivateKey = isPrivateKey = (0, _fairmontHelpers.isType)(PrivateKey);

exports.privateKey = privateKey = function (randomBytes) {
  var get;
  get = _fairmontMultimethods.Method.create({
    default: (() => {
      var _ref = _asyncToGenerator(function* () {
        // Assumes the developer wants key compatible with symmetric encryption.
        return new PrivateKey((yield randomBytes(_tweetnacl2.default.secretbox.keyLength)));
      });

      return function _default() {
        return _ref.apply(this, arguments);
      };
    })()
  });
  _fairmontMultimethods.Method.define(get, _utils.isData, function (input) {
    return new PrivateKey(input);
  });
  _fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, function (input) {
    return get((0, _utils.decode)("base64", input));
  });
  _fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, _fairmontHelpers.isString, function (input, encoding) {
    return get((0, _utils.decode)(encoding, input));
  });
  return get;
};

exports.privateKey = privateKey;
exports.isPrivateKey = isPrivateKey;
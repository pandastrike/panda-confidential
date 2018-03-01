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

var PrivateKey, get, isPrivateKey;

PrivateKey = class PrivateKey extends _key.Key {};

exports.isPrivateKey = isPrivateKey = (0, _fairmontHelpers.isType)(PrivateKey);

exports.privateKey = get = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(get, _utils.isData, function (input) {
  return new PrivateKey(input);
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, function (input) {
  return get((0, _utils.decode)("base64", input));
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, _fairmontHelpers.isString, function (input, encoding) {
  return get((0, _utils.decode)(encoding, input));
});

exports.privateKey = get;
exports.isPrivateKey = isPrivateKey;
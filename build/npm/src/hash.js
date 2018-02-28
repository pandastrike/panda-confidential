"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash;

// Return the SHA-512 hash of a message.
hash = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(hash, _utils.isData, function (message) {
  return (0, _utils.encode)("base64", _tweetnacl2.default.hash(message));
});

_fairmontMultimethods.Method.define(hash, _fairmontHelpers.isString, _fairmontHelpers.isString, function (message, encoding) {
  return hash((0, _utils.decode)(encoding, message));
});

_fairmontMultimethods.Method.define(hash, _fairmontHelpers.isString, function (message) {
  return hash((0, _utils.decode)("utf8", message));
});

_fairmontMultimethods.Method.define(hash, _fairmontHelpers.isObject, function (object) {
  return hash(JSON.stringify(object));
});

exports.default = hash;
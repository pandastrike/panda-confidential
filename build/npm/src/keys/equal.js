"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweetnacl = require("tweetnacl");

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _utils = require("../utils");

var _key = require("./key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var equal;

// Wrap tweetnacl's constant time comparison method for large values.
equal = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(equal, _utils.isData, _utils.isData, function (x, y) {
  return _tweetnacl2.default.verify(x, y);
});

_fairmontMultimethods.Method.define(equal, _utils.isData, _fairmontHelpers.isString, function (x, y) {
  return equal(x, (0, _utils.decode)("base64", y));
});

_fairmontMultimethods.Method.define(equal, _fairmontHelpers.isString, _utils.isData, function (x, y) {
  return equal((0, _utils.decode)("base64", x), y);
});

_fairmontMultimethods.Method.define(equal, _fairmontHelpers.isString, _fairmontHelpers.isString, function (x, y) {
  return equal((0, _utils.decode)("base64", x), (0, _utils.decode)("base64", y));
});

_fairmontMultimethods.Method.define(equal, _key.isKey, _utils.isData, function ({
  key: x
}, y) {
  return equal(x, y);
});

_fairmontMultimethods.Method.define(equal, _utils.isData, _key.isKey, function (x, {
  key: y
}) {
  return equal(x, y);
});

_fairmontMultimethods.Method.define(equal, _key.isKey, _fairmontHelpers.isString, function ({
  key: x
}, y) {
  return equal(x, y);
});

_fairmontMultimethods.Method.define(equal, _fairmontHelpers.isString, _key.isKey, function (x, {
  key: y
}) {
  return equal(x, y);
});

_fairmontMultimethods.Method.define(equal, _key.isKey, _key.isKey, function ({
  key: x
}, {
  key: y
}) {
  return equal(x, y);
});

exports.default = equal;
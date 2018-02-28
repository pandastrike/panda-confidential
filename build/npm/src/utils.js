"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isData = exports.decode = exports.encode = undefined;

var _tweetnaclUtil = require("tweetnacl-util");

var _tweetnaclUtil2 = _interopRequireDefault(_tweetnaclUtil);

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decode, decodeBase64, decodeUTF8, encode, encodeBase64, encodeUTF8, isAny, isBase64, isData, isEqual, isUTF8, isUint8Array;

({ decodeBase64, decodeUTF8, encodeBase64, encodeUTF8 } = _tweetnaclUtil2.default);

isEqual = function (x) {
  return function (y) {
    return x === y;
  };
};

isUTF8 = isEqual("utf8");

isBase64 = isEqual("base64");

isUint8Array = (0, _fairmontHelpers.isType)(Uint8Array);

exports.isData = isData = function (x) {
  return (0, _fairmontHelpers.isBuffer)(x) || isUint8Array(x);
};

isAny = function (x) {
  return true;
};

exports.decode = decode = _fairmontMultimethods.Method.create({
  default: function (...args) {
    throw new Error(`Unable to decode string ${args}`);
  }
});

_fairmontMultimethods.Method.define(decode, isUTF8, _fairmontHelpers.isString, function (_, string) {
  return decodeUTF8(string);
});

_fairmontMultimethods.Method.define(decode, isBase64, _fairmontHelpers.isString, function (_, string) {
  return decodeBase64(string);
});

_fairmontMultimethods.Method.define(decode, isAny, isData, function (_, array) {
  return array;
});

exports.encode = encode = _fairmontMultimethods.Method.create({
  default: function (...args) {
    throw new Error(`Unable to encode data ${args}`);
  }
});

_fairmontMultimethods.Method.define(encode, isData, function (array) {
  return encodeUTF8(array);
});

_fairmontMultimethods.Method.define(encode, isUTF8, isData, function (_, array) {
  return encodeUTF8(array);
});

_fairmontMultimethods.Method.define(encode, isBase64, isData, function (_, array) {
  return encodeBase64(array);
});

_fairmontMultimethods.Method.define(encode, isUTF8, _fairmontHelpers.isString, function (_, string) {
  return encode("utf8", decode("base64", string));
});

_fairmontMultimethods.Method.define(encode, isBase64, _fairmontHelpers.isString, function (_, string) {
  return encode("base64", decode("utf8", string));
});

_fairmontMultimethods.Method.define(encode, _fairmontHelpers.isObject, function (object) {
  return encode("base64", JSON.stringify(object));
});

_fairmontMultimethods.Method.define(encode, isEqual("buffer", isData, function (_, array) {
  return array; // no op
}));

exports.encode = encode;
exports.decode = decode;
exports.isData = isData;
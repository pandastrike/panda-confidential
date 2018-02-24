"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var Key, encode, getKey;

// String encode a piece of data or convert into a Buffer.
encode = function (encoding, data) {
  if (encoding === "buffer") {
    return Buffer.from(data); // Just output a buffer
  } else {
    return Buffer.from(data).toString(encoding);
  }
};

getKey = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isBuffer, function (key) {
  return encode("base64", key);
});

_fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isString, function (key) {
  return key;
});

_fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, encoding) {
  return encode("base64", Buffer.from(key, encoding));
});

Key = class Key {
  constructor(input, encoding) {
    if (encoding) {
      this.key = getKey(input, encoding);
    } else {
      this.key = getKey(input);
    }
  }

};

exports.default = Key;
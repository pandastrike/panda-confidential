"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Key = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _keyUtils = require("./key-utils");

var Key = exports.Key = class Key {
  constructor(input, encoding) {
    var getKey;
    this.key = void 0;
    getKey = _fairmontMultimethods.Method.create();
    _fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isBuffer, function (key) {
      return this.key = (0, _keyUtils.encode)("base64", key);
    });
    _fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isString, function (key) {
      return this.key = key;
    });
    _fairmontMultimethods.Method.define(getKey, _fairmontHelpers.isString, _fairmontHelpers.isString, function (key, encoding) {
      return this.key = (0, _keyUtils.encode)("base64", Buffer.from(key, encoding));
    });
    if (encoding) {
      getKey(key, encoding);
    } else {
      getKey(key);
    }
  }

};
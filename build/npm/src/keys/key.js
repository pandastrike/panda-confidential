"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKey = exports.Key = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _utils = require("../utils");

var Key, isKey;

exports.Key = Key = class Key {
  constructor(key) {
    this.key = key;
  }

  dump() {
    return (0, _utils.encode)("base64", this.key);
  }

};

exports.isKey = isKey = (0, _fairmontHelpers.isKind)(Key);

exports.Key = Key;
exports.isKey = isKey;
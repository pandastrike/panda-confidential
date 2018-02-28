"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPublicKey = exports.publicKey = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var _fairmontMultimethods = require("fairmont-multimethods");

var _key = require("./key");

var _utils = require("../utils");

var PublicKey, get, isPublicKey;

PublicKey = class PublicKey extends _key.Key {};

exports.isPublicKey = isPublicKey = (0, _fairmontHelpers.isType)(PublicKey);

exports.publicKey = get = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(get, _utils.isData, function (input) {
  return new PublicKey(input);
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, function (input) {
  return get((0, _utils.decode)("base64", input));
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, _fairmontHelpers.isString, function (input, encoding) {
  return get((0, _utils.decode)(encoding, input));
});

exports.publicKey = get;
exports.isPublicKey = isPublicKey;
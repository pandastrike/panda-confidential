"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeSignature = exports.decodeKey = exports.encode = exports.isPublicKey = exports.isPrivateKey = exports.isKey = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var _key = require("./key");

var _privateKey = require("./private-key");

var _publicKey = require("./public-key");

// These utility functions are only for the key classes to avoid circular dependencies with the rest of the Confidential interface.
var decodeKey, decodeSignature, encode, isKey, isPrivateKey, isPublicKey;

exports.isKey = isKey = (0, _fairmontHelpers.isKind)(_key.Key);

exports.isPrivateKey = isPrivateKey = (0, _fairmontHelpers.isType)(_privateKey.PrivateKey);

exports.isPublicKey = isPublicKey = (0, _fairmontHelpers.isType)(_publicKey.PublicKey);

exports.decodeKey = decodeKey = function (input) {
  if (isKey(input)) {
    return Buffer.from(input.key, "base64");
  } else {
    if ((0, _fairmontHelpers.isString)(input)) {
      return Buffer.from(input, "base64");
    } else if ((0, _fairmontHelpers.isBuffer)(input)) {
      return input;
    } else {
      throw new Error("Unable to decode key");
    }
  }
};

// String encode a piece of data or convert into a Buffer.
exports.encode = encode = function (encoding, data) {
  if (encoding === "buffer") {
    return Buffer.from(data); // Just output a buffer
  } else {
    return Buffer.from(data).toString(encoding);
  }
};

exports.decodeSignature = decodeSignature = function (blob, encoding = "base64") {
  if (encoding === "buffer") {
    return JSON.parse(blob.toString());
  } else {
    return JSON.parse(Buffer.from(blob, encoding).toString());
  }
};

exports.isKey = isKey;
exports.isPrivateKey = isPrivateKey;
exports.isPublicKey = isPublicKey;
exports.encode = encode;
exports.decodeKey = decodeKey;
exports.decodeSignature = decodeSignature;
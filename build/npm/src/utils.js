"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decodeSignature = exports.decodeKey = exports.decodePlaintext = exports.decodeCiphertext = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var _types = require("./types");

var decodeCiphertext, decodeKey, decodePlaintext, decodeSignature, encode;

exports.decodeCiphertext = decodeCiphertext = function (blob) {
  var out;
  out = JSON.parse(Buffer.from(blob, "base64").toString());
  if (out.ciphertext) {
    out.ciphertext = Buffer.from(ciphertext.data);
  }
  if (out.nonce) {
    out.nonce = Buffer.from(nonce.data);
  }
  return out;
};

exports.decodePlaintext = decodePlaintext = function (msg, encoding) {
  if (encoding === "buffer") {
    return msg;
  } else {
    return Buffer.from(msg, encoding);
  }
};

exports.decodeKey = decodeKey = function (input) {
  if ((0, _types.isKey)(input)) {
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

exports.decodeSignature = decodeSignature = function (blob, encoding = "base64") {
  if (encoding === "buffer") {
    return JSON.parse(blob.toString());
  } else {
    return JSON.parse(Buffer.from(blob, encoding).toString());
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

exports.decodeCiphertext = decodeCiphertext;
exports.decodePlaintext = decodePlaintext;
exports.decodeKey = decodeKey;
exports.decodeSignature = decodeSignature;
exports.encode = encode;
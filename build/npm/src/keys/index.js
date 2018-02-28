"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSharedKey = exports.isPrivateKey = exports.isPublicKey = exports.isKey = exports.sharedKey = exports.privateKey = exports.publicKey = exports.key = undefined;

var _key = require("./key");

var _publicKey = require("./public-key");

var _privateKey = require("./private-key");

var _sharedKey = require("./shared-key");

exports.key = _key.key;
exports.publicKey = _publicKey.publicKey;
exports.privateKey = _privateKey.privateKey;
exports.sharedKey = _sharedKey.sharedKey;
exports.isKey = _key.isKey;
exports.isPublicKey = _publicKey.isPublicKey;
exports.isPrivateKey = _privateKey.isPrivateKey;
exports.isSharedKey = _sharedKey.isSharedKey;
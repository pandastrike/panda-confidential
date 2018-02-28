"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSignatureKeyPair = exports.isEncryptionKeyPair = exports.signatureKeyPair = exports.encryptionKeyPair = undefined;

var _encryption = require("./encryption");

var _signature = require("./signature");

exports.encryptionKeyPair = _encryption.encryptionKeyPair;
exports.signatureKeyPair = _signature.signatureKeyPair;
exports.isEncryptionKeyPair = _encryption.isEncryptionKeyPair;
exports.isSignatureKeyPair = _signature.isSignatureKeyPair;
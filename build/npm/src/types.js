"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSignedMessage = exports.isKeyPair = exports.isSharedKey = exports.isPublicKey = exports.isPrivateKey = exports.isKMSKey = exports.isKey = undefined;

var _keys = require("./keys");

var _fairmontHelpers = require("fairmont-helpers");

var isKMSKey, isKey, isKeyPair, isPrivateKey, isPublicKey, isSharedKey, isSignedMessage;

exports.isKey = isKey = (0, _fairmontHelpers.isKind)(_keys.Key);

exports.isKMSKey = isKMSKey = (0, _fairmontHelpers.isType)(_keys.KMSKey);

exports.isPrivateKey = isPrivateKey = (0, _fairmontHelpers.isType)(_keys.PrivateKey);

exports.isPublicKey = isPublicKey = (0, _fairmontHelpers.isType)(_keys.PublicKey);

exports.isSharedKey = isSharedKey = (0, _fairmontHelpers.isType)(_keys.SharedKey);

exports.isKeyPair = isKeyPair = (0, _fairmontHelpers.isType)(_keys.KeyPair);

exports.isSignedMessage = isSignedMessage = (0, _fairmontHelpers.isType)(_keys.SignedMessage);

exports.isKey = isKey;
exports.isKMSKey = isKMSKey;
exports.isPrivateKey = isPrivateKey;
exports.isPublicKey = isPublicKey;
exports.isSharedKey = isSharedKey;
exports.isKeyPair = isKeyPair;
exports.isSignedMessage = isSignedMessage;
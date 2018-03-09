"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeyPair = exports.KeyPair = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var _utils = require("../utils");

var KeyPair, isKeyPair;

exports.KeyPair = KeyPair = class KeyPair {
  constructor({
    privateKey: privateKey,
    publicKey: publicKey
  }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  encode() {
    return (0, _utils.encode)({
      privateKey: this.privateKey.encode(),
      publicKey: this.publicKey.encode()
    });
  }

};

exports.isKeyPair = isKeyPair = (0, _fairmontHelpers.isKind)(KeyPair);

exports.KeyPair = KeyPair;
exports.isKeyPair = isKeyPair;
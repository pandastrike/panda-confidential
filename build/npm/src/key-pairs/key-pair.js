"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeyPair = exports.KeyPair = undefined;

var _fairmontHelpers = require("fairmont-helpers");

var KeyPair, isKeyPair;

exports.KeyPair = KeyPair = class KeyPair {
  constructor({
    privateKey: privateKey,
    publicKey: publicKey
  }) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  dump() {
    return JSON.stringify({
      privateKey: this.privateKey.dump(),
      publicKey: this.publicKey.dump()
    });
  }

};

exports.isKeyPair = isKeyPair = (0, _fairmontHelpers.isKind)(KeyPair);

exports.KeyPair = KeyPair;
exports.isKeyPair = isKeyPair;
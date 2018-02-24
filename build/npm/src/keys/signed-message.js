"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fairmontMultimethods = require("fairmont-multimethods");

var _fairmontHelpers = require("fairmont-helpers");

var _keyUtils = require("./key-utils");

// Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
var SignedMessage, getMsg;

getMsg = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(getMsg, _fairmontHelpers.isString, function (sig) {
  return (0, _keyUtils.decodeSignature)(sig);
});

_fairmontMultimethods.Method.define(getMsg, _fairmontHelpers.isBuffer, function (sig) {
  return (0, _keyUtils.decodeSignature)(sig, "buffer");
});

_fairmontMultimethods.Method.define(getMsg, _fairmontHelpers.isObject, function (sig) {
  return sig;
});

SignedMessage = class SignedMessage {
  constructor(input) {
    ({ message: this.message, encoding: this.encoding, publicKeys: this.publicKeys, signatures: this.signatures } = getMsg(input));
    this.validate();
  }

  validate() {
    if (!this.message || !this.encoding || !this.publicKeys || !this.signatures) {
      throw new Error("Must provide message, encoding, public key array, and signature array.");
    }
  }

  dump() {
    return (0, _keyUtils.encode)("base64", JSON.stringify({ message: this.message, encoding: this.encoding, publicKeys: this.publicKeys, signatures: this.signatures }));
  }

};

exports.default = SignedMessage;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignedMessage = undefined;

var _fairmontMultimethods = require("fairmont-multimethods");

var _fairmontHelpers = require("fairmont-helpers");

var _keyUtils = require("./key-utils");

var SignedMessage = exports.SignedMessage = class SignedMessage {
  constructor(input) {
    var getMsg;
    getMsg = _fairmontMultimethods.Method.create();
    _fairmontMultimethods.Method.define(getMsg, _fairmontHelpers.isString, function (sig) {
      return ({ message: this.message, encoding: this.encoding, publicKeys: this.publicKeys, signatures: this.signatures } = (0, _keyUtils.decodeSignature)(sig));
    });
    _fairmontMultimethods.Method.define(getMsg, _fairmontHelpers.isBuffer, function (sig) {
      return ({ message: this.message, encoding: this.encoding, publicKeys: this.publicKeys, signatures: this.signatures } = (0, _keyUtils.decodeSignature)(sig, "buffer"));
    });
    _fairmontMultimethods.Method.define(getMsg, _fairmontHelpers.isObject, function (sig) {
      return ({ message: this.message, encoding: this.encoding, publicKeys: this.publicKeys, signatures: this.signatures } = sig);
    });
    getMsg(input);
    this.validate();
  }

  validate() {
    if (!this.message || !this.encoding || !this.publicKeys || !this.signatures) {
      throw new Error("Must provide message, encoding, public key array, and signature array.");
    }
  }

}; // Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
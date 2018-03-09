"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSignedMessage = exports.signedMessage = undefined;

var _fairmontMultimethods = require("fairmont-multimethods");

var _fairmontHelpers = require("fairmont-helpers");

var _utils = require("./utils");

// Signed messages are in containing objects that also hold meta-data about the nature of (possibly multiple) signature(s) on a message.  This class accepts either an object literal or the base64 blob that's output from the "sign" method for transport.
var SignedMessage, get, isSignedMessage, signedMessage;

SignedMessage = class SignedMessage {
  constructor({
    message: message1,
    encoding: encoding1,
    publicKeys: publicKeys1,
    signatures: signatures1
  }) {
    this.message = message1;
    this.encoding = encoding1;
    this.publicKeys = publicKeys1;
    this.signatures = signatures1;
  }

  encode() {
    var key, sig;
    return (0, _utils.encode)({
      message: (0, _utils.encode)("base64", this.message),
      encoding: this.encoding,
      publicKeys: function () {
        var i, len, ref, results;
        ref = this.publicKeys;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          results.push((0, _utils.encode)("base64", key));
        }
        return results;
      }.call(this),
      signatures: function () {
        var i, len, ref, results;
        ref = this.signatures;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          sig = ref[i];
          results.push((0, _utils.encode)("base64", sig));
        }
        return results;
      }.call(this)
    });
  }

  encodeMessage() {
    return (0, _utils.encode)(this.encoding, this.message);
  }

};

exports.isSignedMessage = isSignedMessage = (0, _fairmontHelpers.isType)(SignedMessage);

get = _fairmontMultimethods.Method.create();

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isObject, function ({ message, encoding, publicKeys, signatures }) {
  var key, sig;
  if (!message || !encoding || !publicKeys || !signatures) {
    throw new Error("Needs message, encoding, public keys, and signatures.");
  }
  return {
    message: (0, _utils.decode)("base64", message),
    encoding: encoding,
    publicKeys: function () {
      var i, len, results;
      results = [];
      for (i = 0, len = publicKeys.length; i < len; i++) {
        key = publicKeys[i];
        results.push((0, _utils.decode)("base64", key));
      }
      return results;
    }(),
    signatures: function () {
      var i, len, results;
      results = [];
      for (i = 0, len = signatures.length; i < len; i++) {
        sig = signatures[i];
        results.push((0, _utils.decode)("base64", sig));
      }
      return results;
    }()
  };
});

_fairmontMultimethods.Method.define(get, _fairmontHelpers.isString, function (s) {
  return get(JSON.parse((0, _utils.encode)("utf8", s)));
});

_fairmontMultimethods.Method.define(get, _utils.isData, function (d) {
  return get(JSON.parse((0, _utils.encode)("utf8", d)));
});

exports.signedMessage = signedMessage = function (input) {
  return new SignedMessage(get(input));
};

exports.signedMessage = signedMessage;
exports.isSignedMessage = isSignedMessage;
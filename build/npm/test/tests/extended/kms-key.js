"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKMSKeyID = exports.kmsKeyID = undefined;

var _fairmontHelpers = require("fairmont-helpers");

// This identifies a KMS key by key ID, key Arn, or key alias.
var KMSKeyID, isKMSKeyID, kmsKeyID;

KMSKeyID = class KMSKeyID {
  constructor(id1) {
    this.id = id1;
  }

};

exports.kmsKeyID = kmsKeyID = function (id) {
  return new KMSKeyID(id);
};

exports.isKMSKeyID = isKMSKeyID = (0, _fairmontHelpers.isType)(KMSKeyID);

exports.kmsKeyID = kmsKeyID;
exports.isKMSKeyID = isKMSKeyID;
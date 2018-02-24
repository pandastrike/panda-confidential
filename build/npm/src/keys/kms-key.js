"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This is either a key ID, key Arn, or key alias to identify a key in KMS.
var KMSKey = exports.KMSKey = class KMSKey {
  constructor(key) {
    this.key = key;
  }

};
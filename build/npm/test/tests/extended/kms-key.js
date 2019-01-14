"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKMSKeyID = exports.kmsKeyID = void 0;

var _pandaParchment = require("panda-parchment");

// This identifies a KMS key by key ID, key Arn, or key alias.
var KMSKeyID, isKMSKeyID, kmsKeyID;
exports.kmsKeyID = kmsKeyID;
exports.isKMSKeyID = isKMSKeyID;
KMSKeyID = class KMSKeyID {
  constructor(id1) {
    this.id = id1;
  }

};

exports.kmsKeyID = kmsKeyID = function (id) {
  return new KMSKeyID(id);
};

exports.isKMSKeyID = isKMSKeyID = (0, _pandaParchment.isType)(KMSKeyID);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQva21zLWtleS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQURBO0FBQUEsSUFBQSxRQUFBLEVBQUEsVUFBQSxFQUFBLFFBQUE7OztBQUdNLFFBQUEsR0FBTixNQUFBLFFBQUEsQ0FBQTtBQUNFLEVBQUEsV0FBYSxDQUFBLEdBQUEsRUFBQTtBQUFDLFNBQUMsRUFBRCxHQUFDLEdBQUQ7QUFBRDs7QUFEZixDQUFNOztBQUdOLG1CQUFBLFFBQUEsR0FBVyxVQUFBLEVBQUEsRUFBQTtTQUFRLElBQUEsUUFBQSxDQUFBLEVBQUEsQztBQUFSLENBQVg7O0FBRUEscUJBQUEsVUFBQSxHQUFhLDRCQUFBLFFBQUEsQ0FBYiIsInNvdXJjZXNDb250ZW50IjpbIiMgVGhpcyBpZGVudGlmaWVzIGEgS01TIGtleSBieSBrZXkgSUQsIGtleSBBcm4sIG9yIGtleSBhbGlhcy5cbmltcG9ydCB7aXNUeXBlfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcblxuY2xhc3MgS01TS2V5SURcbiAgY29uc3RydWN0b3I6IChAaWQpIC0+XG5cbmttc0tleUlEID0gKGlkKSAtPiBuZXcgS01TS2V5SUQgaWRcblxuaXNLTVNLZXlJRCA9IGlzVHlwZSBLTVNLZXlJRFxuXG5leHBvcnQge2ttc0tleUlELCBpc0tNU0tleUlEfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/kms-key.coffee
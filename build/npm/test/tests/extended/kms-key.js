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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL2ttcy1rZXkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFEQTtBQUFBLElBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxRQUFBOzs7QUFHTSxRQUFBLEdBQU4sTUFBQSxRQUFBLENBQUE7QUFDRSxFQUFBLFdBQWEsQ0FBQSxHQUFBLEVBQUE7QUFBQyxTQUFDLEVBQUQsR0FBQyxHQUFEO0FBQUQ7O0FBRGYsQ0FBTTs7QUFHTixtQkFBQSxRQUFBLEdBQVcsVUFBQSxFQUFBLEVBQUE7U0FBUSxJQUFBLFFBQUEsQ0FBQSxFQUFBLEM7QUFBUixDQUFYOztBQUVBLHFCQUFBLFVBQUEsR0FBYSw0QkFBQSxRQUFBLENBQWIiLCJzb3VyY2VzQ29udGVudCI6WyIjIFRoaXMgaWRlbnRpZmllcyBhIEtNUyBrZXkgYnkga2V5IElELCBrZXkgQXJuLCBvciBrZXkgYWxpYXMuXG5pbXBvcnQge2lzVHlwZX0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5cbmNsYXNzIEtNU0tleUlEXG4gIGNvbnN0cnVjdG9yOiAoQGlkKSAtPlxuXG5rbXNLZXlJRCA9IChpZCkgLT4gbmV3IEtNU0tleUlEIGlkXG5cbmlzS01TS2V5SUQgPSBpc1R5cGUgS01TS2V5SURcblxuZXhwb3J0IHtrbXNLZXlJRCwgaXNLTVNLZXlJRH1cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/extended/kms-key.coffee
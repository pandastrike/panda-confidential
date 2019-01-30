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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9rbXMta2V5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBREE7QUFBQSxJQUFBLFFBQUEsRUFBQSxVQUFBLEVBQUEsUUFBQTs7O0FBR00sUUFBQSxHQUFOLE1BQUEsUUFBQSxDQUFBO0FBQ0UsRUFBQSxXQUFhLENBQUEsR0FBQSxFQUFBO0FBQUMsU0FBQyxFQUFELEdBQUMsR0FBRDtBQUFEOztBQURmLENBQU07O0FBR04sbUJBQUEsUUFBQSxHQUFXLFVBQUEsRUFBQSxFQUFBO1NBQVEsSUFBQSxRQUFBLENBQUEsRUFBQSxDO0FBQVIsQ0FBWDs7QUFFQSxxQkFBQSxVQUFBLEdBQWEsNEJBQUEsUUFBQSxDQUFiIiwic291cmNlc0NvbnRlbnQiOlsiIyBUaGlzIGlkZW50aWZpZXMgYSBLTVMga2V5IGJ5IGtleSBJRCwga2V5IEFybiwgb3Iga2V5IGFsaWFzLlxuaW1wb3J0IHtpc1R5cGV9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuXG5jbGFzcyBLTVNLZXlJRFxuICBjb25zdHJ1Y3RvcjogKEBpZCkgLT5cblxua21zS2V5SUQgPSAoaWQpIC0+IG5ldyBLTVNLZXlJRCBpZFxuXG5pc0tNU0tleUlEID0gaXNUeXBlIEtNU0tleUlEXG5cbmV4cG9ydCB7a21zS2V5SUQsIGlzS01TS2V5SUR9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/kms-key.coffee
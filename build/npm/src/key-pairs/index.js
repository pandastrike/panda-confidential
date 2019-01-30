"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pandaParchment = require("panda-parchment");

var _keyPair = _interopRequireDefault(require("./key-pair"));

var _encryption = _interopRequireDefault(require("./encryption"));

var _signature = _interopRequireDefault(require("./signature"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyPairs;

keyPairs = function (confidential) {
  var EncryptionKeyPair, SignatureKeyPair;
  EncryptionKeyPair = (0, _encryption.default)(confidential);
  SignatureKeyPair = (0, _signature.default)(confidential);
  return (0, _pandaParchment.include)(confidential, {
    KeyPair: _keyPair.default,
    EncryptionKeyPair,
    SignatureKeyPair
  });
};

var _default = keyPairs;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxRQUFBOztBQUtBLFFBQUEsR0FBVyxVQUFBLFlBQUEsRUFBQTtBQUNULE1BQUEsaUJBQUEsRUFBQSxnQkFBQTtBQUFBLEVBQUEsaUJBQUEsR0FBb0IseUJBQUEsWUFBQSxDQUFwQjtBQUNBLEVBQUEsZ0JBQUEsR0FBbUIsd0JBQUEsWUFBQSxDQUFuQjtTQUNBLDZCQUFBLFlBQUEsRUFBc0I7QUFBQyxJQUFBLE9BQUQsRUFBQyxnQkFBRDtBQUFBLElBQUEsaUJBQUE7QUFBdEIsSUFBQTtBQUFzQixHQUF0QixDO0FBSFMsQ0FBWDs7ZUFLZSxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmNsdWRlfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCBLZXlQYWlyIGZyb20gXCIuL2tleS1wYWlyXCJcbmltcG9ydCBlbmNyeXB0aW9uS2V5UGFpciBmcm9tIFwiLi9lbmNyeXB0aW9uXCJcbmltcG9ydCBzaWduYXR1cmVLZXlQYWlyIGZyb20gXCIuL3NpZ25hdHVyZVwiXG5cbmtleVBhaXJzID0gKGNvbmZpZGVudGlhbCkgLT5cbiAgRW5jcnlwdGlvbktleVBhaXIgPSBlbmNyeXB0aW9uS2V5UGFpciBjb25maWRlbnRpYWxcbiAgU2lnbmF0dXJlS2V5UGFpciA9IHNpZ25hdHVyZUtleVBhaXIgY29uZmlkZW50aWFsXG4gIGluY2x1ZGUgY29uZmlkZW50aWFsLCB7S2V5UGFpciwgRW5jcnlwdGlvbktleVBhaXIsIFNpZ25hdHVyZUtleVBhaXJ9XG5cbmV4cG9ydCBkZWZhdWx0IGtleVBhaXJzXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/index.coffee
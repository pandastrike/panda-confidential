"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confidential = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _keys = require("./keys");

var _keyPairs = require("./key-pairs");

var _signedMessage = require("./signed-message");

var _encrypt = _interopRequireDefault(require("./encrypt"));

var _decrypt = _interopRequireDefault(require("./decrypt"));

var _sign = _interopRequireDefault(require("./sign"));

var _verify = _interopRequireDefault(require("./verify"));

var _hash = _interopRequireDefault(require("./hash"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confidential;
exports.confidential = confidential;

exports.confidential = confidential = function () {
  var c;
  c = {
    randomBytes: _tweetnacl.default.randomBytes
  }; // Key types.  Symmetric key generation requires randomBytes.

  c.key = {
    private: _keys.privateKey,
    public: _keys.publicKey,
    shared: _keys.sharedKey,
    symmetric: (0, _keys.symmetricKey)(c.randomBytes),
    isPrivate: _keys.isPrivateKey,
    isPublic: _keys.isPublicKey,
    isShared: _keys.isSharedKey,
    isSymmetric: _keys.isSymmetricKey,
    equal: _keys.equal
  }; // Key pair types.  Pair generation requires randomBytes

  c.keyPair = {
    encryption: (0, _keyPairs.encryptionKeyPair)(c.randomBytes),
    signature: (0, _keyPairs.signatureKeyPair)(c.randomBytes),
    isEncryption: _keyPairs.isEncryptionKeyPair,
    isSignature: _keyPairs.isSignatureKeyPair
  }; // Signed message type.

  c.signedMessage = _signedMessage.signedMessage;
  c.isSignedMessage = _signedMessage.isSignedMessage; // Main functions, 3 pairs of opposing operations.
  // encrypt needs randomBytes for nonce generation

  c.encrypt = (0, _encrypt.default)(c.randomBytes);
  c.decrypt = _decrypt.default;
  c.sign = _sign.default;
  c.verify = _verify.default;
  c.encode = _utils.encode;
  c.decode = _utils.decode; // Helper functions

  c.nacl = _tweetnacl.default; // Base methods directly use tweetnacl.

  c.hash = _hash.default; // wrapper around tweetnacl's SHA-512 hash

  c.isData = _utils.isData; // Is Uint8Array or Node.js buffer?

  return c;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFUQSxJQUFBLFlBQUE7OztBQVdBLHVCQUFBLFlBQUEsR0FBZSxZQUFBO0FBQ2IsTUFBQSxDQUFBO0FBQUEsRUFBQSxDQUFBLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxtQkFBSztBQUFsQixHQURGLENBRGEsQzs7QUFLYixFQUFBLENBQUMsQ0FBRCxHQUFBLEdBQ0U7QUFBQSxJQUFBLE9BQUEsRUFBQSxnQkFBQTtBQUNBLElBQUEsTUFBQSxFQURBLGVBQUE7QUFFQSxJQUFBLE1BQUEsRUFGQSxlQUFBO0FBR0EsSUFBQSxTQUFBLEVBQVcsd0JBQWEsQ0FBQyxDQUh6QixXQUdXLENBSFg7QUFJQSxJQUFBLFNBQUEsRUFKQSxrQkFBQTtBQUtBLElBQUEsUUFBQSxFQUxBLGlCQUFBO0FBTUEsSUFBQSxRQUFBLEVBTkEsaUJBQUE7QUFPQSxJQUFBLFdBQUEsRUFQQSxvQkFBQTtBQVFBLElBQUEsS0FBQSxFQUFPO0FBUlAsR0FERixDQUxhLEM7O0FBaUJiLEVBQUEsQ0FBQyxDQUFELE9BQUEsR0FDRTtBQUFBLElBQUEsVUFBQSxFQUFZLGlDQUFrQixDQUFDLENBQS9CLFdBQVksQ0FBWjtBQUNBLElBQUEsU0FBQSxFQUFXLGdDQUFpQixDQUFDLENBRDdCLFdBQ1csQ0FEWDtBQUVBLElBQUEsWUFBQSxFQUZBLDZCQUFBO0FBR0EsSUFBQSxXQUFBLEVBQWE7QUFIYixHQURGLENBakJhLEM7O0FBd0JiLEVBQUEsQ0FBQyxDQUFELGFBQUEsR0FBa0IsNEJBQWxCO0FBQ0EsRUFBQSxDQUFDLENBQUQsZUFBQSxHQXhCQSw4QkF3QkEsQ0F6QmEsQzs7O0FBNkJiLEVBQUEsQ0FBQyxDQUFELE9BQUEsR0FBWSxzQkFBUSxDQUFDLENBQVQsV0FBQSxDQUFaO0FBQ0EsRUFBQSxDQUFDLENBQUQsT0FBQSxHQUFZLGdCQUFaO0FBQ0EsRUFBQSxDQUFDLENBQUQsSUFBQSxHQUFTLGFBQVQ7QUFDQSxFQUFBLENBQUMsQ0FBRCxNQUFBLEdBQVcsZUFBWDtBQUNBLEVBQUEsQ0FBQyxDQUFELE1BQUEsR0FBVyxhQUFYO0FBQ0EsRUFBQSxDQUFDLENBQUQsTUFBQSxHQWpDQSxhQWlDQSxDQWxDYSxDOztBQXFDYixFQUFBLENBQUMsQ0FBRCxJQUFBLEdBcENBLGtCQW9DQSxDQXJDYSxDQUNiOztBQXFDQSxFQUFBLENBQUMsQ0FBRCxJQUFBLEdBckNBLGFBcUNBLENBdENhLENBQ2I7O0FBc0NBLEVBQUEsQ0FBQyxDQUFELE1BQUEsR0F0Q0EsYUFzQ0EsQ0F2Q2EsQ0FDYjs7U0F1Q0EsQztBQXhDYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge3ByaXZhdGVLZXksIHB1YmxpY0tleSwgc2hhcmVkS2V5LCBzeW1tZXRyaWNLZXksIGlzUHJpdmF0ZUtleSwgaXNQdWJsaWNLZXksIGlzU2hhcmVkS2V5LCBpc1N5bW1ldHJpY0tleSwgZXF1YWx9IGZyb20gXCIuL2tleXNcIlxuaW1wb3J0IHtlbmNyeXB0aW9uS2V5UGFpciwgc2lnbmF0dXJlS2V5UGFpciwgaXNFbmNyeXB0aW9uS2V5UGFpciwgaXNTaWduYXR1cmVLZXlQYWlyfSBmcm9tIFwiLi9rZXktcGFpcnNcIlxuaW1wb3J0IHtzaWduZWRNZXNzYWdlLCBpc1NpZ25lZE1lc3NhZ2V9IGZyb20gXCIuL3NpZ25lZC1tZXNzYWdlXCJcbmltcG9ydCBlbmNyeXB0IGZyb20gXCIuL2VuY3J5cHRcIlxuaW1wb3J0IGRlY3J5cHQgZnJvbSBcIi4vZGVjcnlwdFwiXG5pbXBvcnQgc2lnbiBmcm9tIFwiLi9zaWduXCJcbmltcG9ydCB2ZXJpZnkgZnJvbSBcIi4vdmVyaWZ5XCJcbmltcG9ydCBoYXNoIGZyb20gXCIuL2hhc2hcIlxuaW1wb3J0IHtlbmNvZGUsIGRlY29kZSwgaXNEYXRhLCBpc0VxdWFsfSBmcm9tIFwiLi91dGlsc1wiXG5cbmNvbmZpZGVudGlhbCA9IC0+XG4gIGMgPVxuICAgIHJhbmRvbUJ5dGVzOiBuYWNsLnJhbmRvbUJ5dGVzXG5cbiAgIyBLZXkgdHlwZXMuICBTeW1tZXRyaWMga2V5IGdlbmVyYXRpb24gcmVxdWlyZXMgcmFuZG9tQnl0ZXMuXG4gIGMua2V5ID1cbiAgICBwcml2YXRlOiBwcml2YXRlS2V5XG4gICAgcHVibGljOiBwdWJsaWNLZXlcbiAgICBzaGFyZWQ6IHNoYXJlZEtleVxuICAgIHN5bW1ldHJpYzogc3ltbWV0cmljS2V5IGMucmFuZG9tQnl0ZXNcbiAgICBpc1ByaXZhdGU6IGlzUHJpdmF0ZUtleVxuICAgIGlzUHVibGljOiBpc1B1YmxpY0tleVxuICAgIGlzU2hhcmVkOiBpc1NoYXJlZEtleVxuICAgIGlzU3ltbWV0cmljOiBpc1N5bW1ldHJpY0tleVxuICAgIGVxdWFsOiBlcXVhbFxuXG4gICMgS2V5IHBhaXIgdHlwZXMuICBQYWlyIGdlbmVyYXRpb24gcmVxdWlyZXMgcmFuZG9tQnl0ZXNcbiAgYy5rZXlQYWlyID1cbiAgICBlbmNyeXB0aW9uOiBlbmNyeXB0aW9uS2V5UGFpciBjLnJhbmRvbUJ5dGVzXG4gICAgc2lnbmF0dXJlOiBzaWduYXR1cmVLZXlQYWlyIGMucmFuZG9tQnl0ZXNcbiAgICBpc0VuY3J5cHRpb246IGlzRW5jcnlwdGlvbktleVBhaXJcbiAgICBpc1NpZ25hdHVyZTogaXNTaWduYXR1cmVLZXlQYWlyXG5cbiAgIyBTaWduZWQgbWVzc2FnZSB0eXBlLlxuICBjLnNpZ25lZE1lc3NhZ2UgPSBzaWduZWRNZXNzYWdlXG4gIGMuaXNTaWduZWRNZXNzYWdlID0gaXNTaWduZWRNZXNzYWdlXG5cbiAgIyBNYWluIGZ1bmN0aW9ucywgMyBwYWlycyBvZiBvcHBvc2luZyBvcGVyYXRpb25zLlxuICAjIGVuY3J5cHQgbmVlZHMgcmFuZG9tQnl0ZXMgZm9yIG5vbmNlIGdlbmVyYXRpb25cbiAgYy5lbmNyeXB0ID0gZW5jcnlwdCBjLnJhbmRvbUJ5dGVzXG4gIGMuZGVjcnlwdCA9IGRlY3J5cHRcbiAgYy5zaWduID0gc2lnblxuICBjLnZlcmlmeSA9IHZlcmlmeVxuICBjLmVuY29kZSA9IGVuY29kZVxuICBjLmRlY29kZSA9IGRlY29kZVxuXG4gICMgSGVscGVyIGZ1bmN0aW9uc1xuICBjLm5hY2wgPSBuYWNsICAgICAgIyBCYXNlIG1ldGhvZHMgZGlyZWN0bHkgdXNlIHR3ZWV0bmFjbC5cbiAgYy5oYXNoID0gaGFzaCAgICAgICMgd3JhcHBlciBhcm91bmQgdHdlZXRuYWNsJ3MgU0hBLTUxMiBoYXNoXG4gIGMuaXNEYXRhID0gaXNEYXRhICAjIElzIFVpbnQ4QXJyYXkgb3IgTm9kZS5qcyBidWZmZXI/XG4gIGNcblxuZXhwb3J0IHtjb25maWRlbnRpYWx9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=index.coffee
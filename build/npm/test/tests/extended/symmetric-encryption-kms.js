"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _keyName = _interopRequireDefault(require("../../key-name"));

var _kmsKey = require("./kms-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symmetric;

symmetric = function ({
  encrypt,
  decrypt
}) {
  return async function () {
    var cipher, keyID, message, output; // Create our custom key class to pass into Confidential.

    keyID = (0, _kmsKey.kmsKeyID)(_keyName.default);
    (0, _assert.default)(keyID && (0, _kmsKey.isKMSKeyID)(keyID), "bad key"); // Person A symmetrically encrypts their data.

    message = "Hello World!";
    cipher = await encrypt(keyID, message);
    (0, _assert.default)(cipher && message !== cipher, "must create a ciphertext"); // Person A later decrypts that ciphertext.

    output = await decrypt(keyID, cipher);
    return _assert.default.equal(message, output, "failed to decrypt");
  };
};

var _default = symmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL3N5bW1ldHJpYy1lbmNyeXB0aW9uLWttcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7O0FBSEEsSUFBQSxTQUFBOztBQUtBLFNBQUEsR0FBWSxVQUFDO0FBQUEsRUFBQSxPQUFBO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtTQUF3QixrQkFBQTtBQUVsQyxRQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsQ0FGa0MsQzs7QUFFbEMsSUFBQSxLQUFBLEdBQVEsc0JBQUEsZ0JBQUEsQ0FBUjtBQUNBLHlCQUFRLEtBQUEsSUFBUyx3QkFBakIsS0FBaUIsQ0FBakIsRUFEQSxTQUNBLEVBSGtDLEM7O0FBTWxDLElBQUEsT0FBQSxHQUFVLGNBQVY7QUFDQSxJQUFBLE1BQUEsR0FBUyxNQUFNLE9BQUEsQ0FBQSxLQUFBLEVBQU4sT0FBTSxDQUFmO0FBQ0EseUJBQVEsTUFBQSxJQUFVLE9BQUEsS0FBbEIsTUFBQSxFQU5BLDBCQU1BLEVBUmtDLEM7O0FBV2xDLElBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLEtBQUEsRUFBTixNQUFNLENBQWY7V0FDQSxnQkFBQSxLQUFBLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxtQkFBQSxDO0FBWmtDLEc7QUFBeEIsQ0FBWjs7ZUFjZSxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcbmltcG9ydCBrbXNLZXlOYW1lIGZyb20gXCIuLi8uLi9rZXktbmFtZVwiXG5cbmltcG9ydCB7a21zS2V5SUQsIGlzS01TS2V5SUR9IGZyb20gXCIuL2ttcy1rZXlcIlxuXG5zeW1tZXRyaWMgPSAoe2VuY3J5cHQsIGRlY3J5cHR9KSAtPiAtPlxuICAjIENyZWF0ZSBvdXIgY3VzdG9tIGtleSBjbGFzcyB0byBwYXNzIGludG8gQ29uZmlkZW50aWFsLlxuICBrZXlJRCA9IGttc0tleUlEIGttc0tleU5hbWVcbiAgYXNzZXJ0IChrZXlJRCAmJiBpc0tNU0tleUlEIGtleUlEKSwgXCJiYWQga2V5XCJcblxuICAjIFBlcnNvbiBBIHN5bW1ldHJpY2FsbHkgZW5jcnlwdHMgdGhlaXIgZGF0YS5cbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcbiAgY2lwaGVyID0gYXdhaXQgZW5jcnlwdCBrZXlJRCwgbWVzc2FnZVxuICBhc3NlcnQgKGNpcGhlciAmJiBtZXNzYWdlICE9IGNpcGhlciksIFwibXVzdCBjcmVhdGUgYSBjaXBoZXJ0ZXh0XCJcblxuICAjIFBlcnNvbiBBIGxhdGVyIGRlY3J5cHRzIHRoYXQgY2lwaGVydGV4dC5cbiAgb3V0cHV0ID0gYXdhaXQgZGVjcnlwdCBrZXlJRCwgY2lwaGVyXG4gIGFzc2VydC5lcXVhbCBtZXNzYWdlLCBvdXRwdXQsIFwiZmFpbGVkIHRvIGRlY3J5cHRcIlxuXG5leHBvcnQgZGVmYXVsdCBzeW1tZXRyaWNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/extended/symmetric-encryption-kms.coffee
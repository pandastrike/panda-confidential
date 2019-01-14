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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQvc3ltbWV0cmljLWVuY3J5cHRpb24ta21zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7QUFIQSxJQUFBLFNBQUE7O0FBS0EsU0FBQSxHQUFZLFVBQUM7QUFBQSxFQUFBLE9BQUE7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO1NBQXdCLGtCQUFBO0FBRWxDLFFBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxDQUZrQyxDOztBQUVsQyxJQUFBLEtBQUEsR0FBUSxzQkFBQSxnQkFBQSxDQUFSO0FBQ0EseUJBQVEsS0FBQSxJQUFTLHdCQUFqQixLQUFpQixDQUFqQixFQURBLFNBQ0EsRUFIa0MsQzs7QUFNbEMsSUFBQSxPQUFBLEdBQVUsY0FBVjtBQUNBLElBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLEtBQUEsRUFBTixPQUFNLENBQWY7QUFDQSx5QkFBUSxNQUFBLElBQVUsT0FBQSxLQUFsQixNQUFBLEVBTkEsMEJBTUEsRUFSa0MsQzs7QUFXbEMsSUFBQSxNQUFBLEdBQVMsTUFBTSxPQUFBLENBQUEsS0FBQSxFQUFOLE1BQU0sQ0FBZjtXQUNBLGdCQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLG1CQUFBLEM7QUFaa0MsRztBQUF4QixDQUFaOztlQWNlLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IGttc0tleU5hbWUgZnJvbSBcIi4uLy4uL2tleS1uYW1lXCJcblxuaW1wb3J0IHtrbXNLZXlJRCwgaXNLTVNLZXlJRH0gZnJvbSBcIi4va21zLWtleVwiXG5cbnN5bW1ldHJpYyA9ICh7ZW5jcnlwdCwgZGVjcnlwdH0pIC0+IC0+XG4gICMgQ3JlYXRlIG91ciBjdXN0b20ga2V5IGNsYXNzIHRvIHBhc3MgaW50byBDb25maWRlbnRpYWwuXG4gIGtleUlEID0ga21zS2V5SUQga21zS2V5TmFtZVxuICBhc3NlcnQgKGtleUlEICYmIGlzS01TS2V5SUQga2V5SUQpLCBcImJhZCBrZXlcIlxuXG4gICMgUGVyc29uIEEgc3ltbWV0cmljYWxseSBlbmNyeXB0cyB0aGVpciBkYXRhLlxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuICBjaXBoZXIgPSBhd2FpdCBlbmNyeXB0IGtleUlELCBtZXNzYWdlXG4gIGFzc2VydCAoY2lwaGVyICYmIG1lc3NhZ2UgIT0gY2lwaGVyKSwgXCJtdXN0IGNyZWF0ZSBhIGNpcGhlcnRleHRcIlxuXG4gICMgUGVyc29uIEEgbGF0ZXIgZGVjcnlwdHMgdGhhdCBjaXBoZXJ0ZXh0LlxuICBvdXRwdXQgPSBhd2FpdCBkZWNyeXB0IGtleUlELCBjaXBoZXJcbiAgYXNzZXJ0LmVxdWFsIG1lc3NhZ2UsIG91dHB1dCwgXCJmYWlsZWQgdG8gZGVjcnlwdFwiXG5cbmV4cG9ydCBkZWZhdWx0IHN5bW1ldHJpY1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/symmetric-encryption-kms.coffee
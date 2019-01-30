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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9zeW1tZXRyaWMtZW5jcnlwdGlvbi1rbXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUhBLElBQUEsU0FBQTs7QUFLQSxTQUFBLEdBQVksVUFBQztBQUFBLEVBQUEsT0FBQTtBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7U0FBd0Isa0JBQUE7QUFFbEMsUUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLENBRmtDLEM7O0FBRWxDLElBQUEsS0FBQSxHQUFRLHNCQUFBLGdCQUFBLENBQVI7QUFDQSx5QkFBUSxLQUFBLElBQVMsd0JBQWpCLEtBQWlCLENBQWpCLEVBREEsU0FDQSxFQUhrQyxDOztBQU1sQyxJQUFBLE9BQUEsR0FBVSxjQUFWO0FBQ0EsSUFBQSxNQUFBLEdBQVMsTUFBTSxPQUFBLENBQUEsS0FBQSxFQUFOLE9BQU0sQ0FBZjtBQUNBLHlCQUFRLE1BQUEsSUFBVSxPQUFBLEtBQWxCLE1BQUEsRUFOQSwwQkFNQSxFQVJrQyxDOztBQVdsQyxJQUFBLE1BQUEsR0FBUyxNQUFNLE9BQUEsQ0FBQSxLQUFBLEVBQU4sTUFBTSxDQUFmO1dBQ0EsZ0JBQUEsS0FBQSxDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsbUJBQUEsQztBQVprQyxHO0FBQXhCLENBQVo7O2VBY2UsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQga21zS2V5TmFtZSBmcm9tIFwiLi4vLi4va2V5LW5hbWVcIlxuXG5pbXBvcnQge2ttc0tleUlELCBpc0tNU0tleUlEfSBmcm9tIFwiLi9rbXMta2V5XCJcblxuc3ltbWV0cmljID0gKHtlbmNyeXB0LCBkZWNyeXB0fSkgLT4gLT5cbiAgIyBDcmVhdGUgb3VyIGN1c3RvbSBrZXkgY2xhc3MgdG8gcGFzcyBpbnRvIENvbmZpZGVudGlhbC5cbiAga2V5SUQgPSBrbXNLZXlJRCBrbXNLZXlOYW1lXG4gIGFzc2VydCAoa2V5SUQgJiYgaXNLTVNLZXlJRCBrZXlJRCksIFwiYmFkIGtleVwiXG5cbiAgIyBQZXJzb24gQSBzeW1tZXRyaWNhbGx5IGVuY3J5cHRzIHRoZWlyIGRhdGEuXG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG4gIGNpcGhlciA9IGF3YWl0IGVuY3J5cHQga2V5SUQsIG1lc3NhZ2VcbiAgYXNzZXJ0IChjaXBoZXIgJiYgbWVzc2FnZSAhPSBjaXBoZXIpLCBcIm11c3QgY3JlYXRlIGEgY2lwaGVydGV4dFwiXG5cbiAgIyBQZXJzb24gQSBsYXRlciBkZWNyeXB0cyB0aGF0IGNpcGhlcnRleHQuXG4gIG91dHB1dCA9IGF3YWl0IGRlY3J5cHQga2V5SUQsIGNpcGhlclxuICBhc3NlcnQuZXF1YWwgbWVzc2FnZSwgb3V0cHV0LCBcImZhaWxlZCB0byBkZWNyeXB0XCJcblxuZXhwb3J0IGRlZmF1bHQgc3ltbWV0cmljXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/symmetric-encryption-kms.coffee
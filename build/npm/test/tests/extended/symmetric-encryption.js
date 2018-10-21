"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symmetric;

symmetric = function ({
  encrypt,
  decrypt,
  key
}) {
  return async function () {
    var KEY, cipher, message, output; // Generate symmetric key of correct length that should be saved.

    KEY = await key.symmetric();
    (0, _assert.default)(KEY && key.isSymmetric(KEY), "bad key"); // Person A symmetrically encrypts their data.

    message = "Hello World!";
    cipher = await encrypt(KEY, message);
    (0, _assert.default)(cipher && message !== cipher, "must create a ciphertext"); // Person A later decrypts that ciphertext.

    output = await decrypt(KEY, cipher);
    return _assert.default.equal(message, output, "failed to decrypt");
  };
};

var _default = symmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL3N5bW1ldHJpYy1lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFBQSxJQUFBLFNBQUE7O0FBRUEsU0FBQSxHQUFZLFVBQUM7QUFBQSxFQUFBLE9BQUE7QUFBQSxFQUFBLE9BQUE7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO1NBQTZCLGtCQUFBO0FBRXZDLFFBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxDQUZ1QyxDOztBQUV2QyxJQUFBLEdBQUEsR0FBTSxNQUFNLEdBQUcsQ0FBVCxTQUFNLEVBQVo7QUFDQSx5QkFBUSxHQUFBLElBQU8sR0FBRyxDQUFILFdBQUEsQ0FBZixHQUFlLENBQWYsRUFEQSxTQUNBLEVBSHVDLEM7O0FBTXZDLElBQUEsT0FBQSxHQUFVLGNBQVY7QUFDQSxJQUFBLE1BQUEsR0FBUyxNQUFNLE9BQUEsQ0FBQSxHQUFBLEVBQU4sT0FBTSxDQUFmO0FBQ0EseUJBQVEsTUFBQSxJQUFVLE9BQUEsS0FBbEIsTUFBQSxFQU5BLDBCQU1BLEVBUnVDLEM7O0FBV3ZDLElBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLEdBQUEsRUFBTixNQUFNLENBQWY7V0FDQSxnQkFBQSxLQUFBLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxtQkFBQSxDO0FBWnVDLEc7QUFBN0IsQ0FBWjs7ZUFjZSxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcblxuc3ltbWV0cmljID0gKHtlbmNyeXB0LCBkZWNyeXB0LCBrZXl9KSAtPiAtPlxuICAjIEdlbmVyYXRlIHN5bW1ldHJpYyBrZXkgb2YgY29ycmVjdCBsZW5ndGggdGhhdCBzaG91bGQgYmUgc2F2ZWQuXG4gIEtFWSA9IGF3YWl0IGtleS5zeW1tZXRyaWMoKVxuICBhc3NlcnQgKEtFWSAmJiBrZXkuaXNTeW1tZXRyaWMgS0VZKSwgXCJiYWQga2V5XCJcblxuICAjIFBlcnNvbiBBIHN5bW1ldHJpY2FsbHkgZW5jcnlwdHMgdGhlaXIgZGF0YS5cbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcbiAgY2lwaGVyID0gYXdhaXQgZW5jcnlwdCBLRVksIG1lc3NhZ2VcbiAgYXNzZXJ0IChjaXBoZXIgJiYgbWVzc2FnZSAhPSBjaXBoZXIpLCBcIm11c3QgY3JlYXRlIGEgY2lwaGVydGV4dFwiXG5cbiAgIyBQZXJzb24gQSBsYXRlciBkZWNyeXB0cyB0aGF0IGNpcGhlcnRleHQuXG4gIG91dHB1dCA9IGF3YWl0IGRlY3J5cHQgS0VZLCBjaXBoZXJcbiAgYXNzZXJ0LmVxdWFsIG1lc3NhZ2UsIG91dHB1dCwgXCJmYWlsZWQgdG8gZGVjcnlwdFwiXG5cbmV4cG9ydCBkZWZhdWx0IHN5bW1ldHJpY1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=tests/extended/symmetric-encryption.coffee
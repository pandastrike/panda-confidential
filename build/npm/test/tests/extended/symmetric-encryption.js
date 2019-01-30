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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9zeW1tZXRyaWMtZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQUEsSUFBQSxTQUFBOztBQUVBLFNBQUEsR0FBWSxVQUFDO0FBQUEsRUFBQSxPQUFBO0FBQUEsRUFBQSxPQUFBO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtTQUE2QixrQkFBQTtBQUV2QyxRQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsQ0FGdUMsQzs7QUFFdkMsSUFBQSxHQUFBLEdBQU0sTUFBTSxHQUFHLENBQVQsU0FBTSxFQUFaO0FBQ0EseUJBQVEsR0FBQSxJQUFPLEdBQUcsQ0FBSCxXQUFBLENBQWYsR0FBZSxDQUFmLEVBREEsU0FDQSxFQUh1QyxDOztBQU12QyxJQUFBLE9BQUEsR0FBVSxjQUFWO0FBQ0EsSUFBQSxNQUFBLEdBQVMsTUFBTSxPQUFBLENBQUEsR0FBQSxFQUFOLE9BQU0sQ0FBZjtBQUNBLHlCQUFRLE1BQUEsSUFBVSxPQUFBLEtBQWxCLE1BQUEsRUFOQSwwQkFNQSxFQVJ1QyxDOztBQVd2QyxJQUFBLE1BQUEsR0FBUyxNQUFNLE9BQUEsQ0FBQSxHQUFBLEVBQU4sTUFBTSxDQUFmO1dBQ0EsZ0JBQUEsS0FBQSxDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsbUJBQUEsQztBQVp1QyxHO0FBQTdCLENBQVo7O2VBY2UsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5cbnN5bW1ldHJpYyA9ICh7ZW5jcnlwdCwgZGVjcnlwdCwga2V5fSkgLT4gLT5cbiAgIyBHZW5lcmF0ZSBzeW1tZXRyaWMga2V5IG9mIGNvcnJlY3QgbGVuZ3RoIHRoYXQgc2hvdWxkIGJlIHNhdmVkLlxuICBLRVkgPSBhd2FpdCBrZXkuc3ltbWV0cmljKClcbiAgYXNzZXJ0IChLRVkgJiYga2V5LmlzU3ltbWV0cmljIEtFWSksIFwiYmFkIGtleVwiXG5cbiAgIyBQZXJzb24gQSBzeW1tZXRyaWNhbGx5IGVuY3J5cHRzIHRoZWlyIGRhdGEuXG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG4gIGNpcGhlciA9IGF3YWl0IGVuY3J5cHQgS0VZLCBtZXNzYWdlXG4gIGFzc2VydCAoY2lwaGVyICYmIG1lc3NhZ2UgIT0gY2lwaGVyKSwgXCJtdXN0IGNyZWF0ZSBhIGNpcGhlcnRleHRcIlxuXG4gICMgUGVyc29uIEEgbGF0ZXIgZGVjcnlwdHMgdGhhdCBjaXBoZXJ0ZXh0LlxuICBvdXRwdXQgPSBhd2FpdCBkZWNyeXB0IEtFWSwgY2lwaGVyXG4gIGFzc2VydC5lcXVhbCBtZXNzYWdlLCBvdXRwdXQsIFwiZmFpbGVkIHRvIGRlY3J5cHRcIlxuXG5leHBvcnQgZGVmYXVsdCBzeW1tZXRyaWNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/symmetric-encryption.coffee
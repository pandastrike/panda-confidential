"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _index = require("../../../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symmetric;

symmetric = async function () {
  var KEY, cipher, decrypt, encrypt, key, message, output; // Setup for encryption

  ({
    encrypt,
    decrypt,
    key
  } = (0, _index.confidential)()); // Generate symmetric key of correct length that should be saved.

  KEY = await key.symmetric();
  (0, _assert.default)(KEY && key.isSymmetric(KEY), "bad key"); // Person A symmetrically encrypts their data.

  message = "Hello World!";
  cipher = await encrypt(KEY, message);
  (0, _assert.default)(cipher && message !== cipher, "must create a ciphertext"); // Person A later decrypts that ciphertext.

  output = await decrypt(KEY, cipher);
  return _assert.default.equal(message, output, "failed to decrypt");
};

var _default = symmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL3JlZ3VsYXIvc3ltbWV0cmljLWVuY3J5cHRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQURBLElBQUEsU0FBQTs7QUFHQSxTQUFBLEdBQVksa0JBQUE7QUFFVixNQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsQ0FGVSxDOztBQUVWLEdBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQSxFQUZVLEM7O0FBS1YsRUFBQSxHQUFBLEdBQU0sTUFBTSxHQUFHLENBQVQsU0FBTSxFQUFaO0FBQ0EsdUJBQVEsR0FBQSxJQUFPLEdBQUcsQ0FBSCxXQUFBLENBQWYsR0FBZSxDQUFmLEVBSkEsU0FJQSxFQU5VLEM7O0FBU1YsRUFBQSxPQUFBLEdBQVUsY0FBVjtBQUNBLEVBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLEdBQUEsRUFBTixPQUFNLENBQWY7QUFDQSx1QkFBUSxNQUFBLElBQVUsT0FBQSxLQUFsQixNQUFBLEVBVEEsMEJBU0EsRUFYVSxDOztBQWNWLEVBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLEdBQUEsRUFBTixNQUFNLENBQWY7U0FDQSxnQkFBQSxLQUFBLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxtQkFBQSxDO0FBZlUsQ0FBWjs7ZUFpQmUsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge2NvbmZpZGVudGlhbH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9pbmRleFwiXG5cbnN5bW1ldHJpYyA9IC0+XG4gICMgU2V0dXAgZm9yIGVuY3J5cHRpb25cbiAge2VuY3J5cHQsIGRlY3J5cHQsIGtleX0gPSBjb25maWRlbnRpYWwoKVxuXG4gICMgR2VuZXJhdGUgc3ltbWV0cmljIGtleSBvZiBjb3JyZWN0IGxlbmd0aCB0aGF0IHNob3VsZCBiZSBzYXZlZC5cbiAgS0VZID0gYXdhaXQga2V5LnN5bW1ldHJpYygpXG4gIGFzc2VydCAoS0VZICYmIGtleS5pc1N5bW1ldHJpYyBLRVkpLCBcImJhZCBrZXlcIlxuXG4gICMgUGVyc29uIEEgc3ltbWV0cmljYWxseSBlbmNyeXB0cyB0aGVpciBkYXRhLlxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuICBjaXBoZXIgPSBhd2FpdCBlbmNyeXB0IEtFWSwgbWVzc2FnZVxuICBhc3NlcnQgKGNpcGhlciAmJiBtZXNzYWdlICE9IGNpcGhlciksIFwibXVzdCBjcmVhdGUgYSBjaXBoZXJ0ZXh0XCJcblxuICAjIFBlcnNvbiBBIGxhdGVyIGRlY3J5cHRzIHRoYXQgY2lwaGVydGV4dC5cbiAgb3V0cHV0ID0gYXdhaXQgZGVjcnlwdCBLRVksIGNpcGhlclxuICBhc3NlcnQuZXF1YWwgbWVzc2FnZSwgb3V0cHV0LCBcImZhaWxlZCB0byBkZWNyeXB0XCJcblxuZXhwb3J0IGRlZmF1bHQgc3ltbWV0cmljXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=tests/regular/symmetric-encryption.coffee
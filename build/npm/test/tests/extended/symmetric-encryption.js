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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQvc3ltbWV0cmljLWVuY3J5cHRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUFBLElBQUEsU0FBQTs7QUFFQSxTQUFBLEdBQVksVUFBQztBQUFBLEVBQUEsT0FBQTtBQUFBLEVBQUEsT0FBQTtBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7U0FBNkIsa0JBQUE7QUFFdkMsUUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLENBRnVDLEM7O0FBRXZDLElBQUEsR0FBQSxHQUFNLE1BQU0sR0FBRyxDQUFULFNBQU0sRUFBWjtBQUNBLHlCQUFRLEdBQUEsSUFBTyxHQUFHLENBQUgsV0FBQSxDQUFmLEdBQWUsQ0FBZixFQURBLFNBQ0EsRUFIdUMsQzs7QUFNdkMsSUFBQSxPQUFBLEdBQVUsY0FBVjtBQUNBLElBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLEdBQUEsRUFBTixPQUFNLENBQWY7QUFDQSx5QkFBUSxNQUFBLElBQVUsT0FBQSxLQUFsQixNQUFBLEVBTkEsMEJBTUEsRUFSdUMsQzs7QUFXdkMsSUFBQSxNQUFBLEdBQVMsTUFBTSxPQUFBLENBQUEsR0FBQSxFQUFOLE1BQU0sQ0FBZjtXQUNBLGdCQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLG1CQUFBLEM7QUFadUMsRztBQUE3QixDQUFaOztlQWNlLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuXG5zeW1tZXRyaWMgPSAoe2VuY3J5cHQsIGRlY3J5cHQsIGtleX0pIC0+IC0+XG4gICMgR2VuZXJhdGUgc3ltbWV0cmljIGtleSBvZiBjb3JyZWN0IGxlbmd0aCB0aGF0IHNob3VsZCBiZSBzYXZlZC5cbiAgS0VZID0gYXdhaXQga2V5LnN5bW1ldHJpYygpXG4gIGFzc2VydCAoS0VZICYmIGtleS5pc1N5bW1ldHJpYyBLRVkpLCBcImJhZCBrZXlcIlxuXG4gICMgUGVyc29uIEEgc3ltbWV0cmljYWxseSBlbmNyeXB0cyB0aGVpciBkYXRhLlxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuICBjaXBoZXIgPSBhd2FpdCBlbmNyeXB0IEtFWSwgbWVzc2FnZVxuICBhc3NlcnQgKGNpcGhlciAmJiBtZXNzYWdlICE9IGNpcGhlciksIFwibXVzdCBjcmVhdGUgYSBjaXBoZXJ0ZXh0XCJcblxuICAjIFBlcnNvbiBBIGxhdGVyIGRlY3J5cHRzIHRoYXQgY2lwaGVydGV4dC5cbiAgb3V0cHV0ID0gYXdhaXQgZGVjcnlwdCBLRVksIGNpcGhlclxuICBhc3NlcnQuZXF1YWwgbWVzc2FnZSwgb3V0cHV0LCBcImZhaWxlZCB0byBkZWNyeXB0XCJcblxuZXhwb3J0IGRlZmF1bHQgc3ltbWV0cmljXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/symmetric-encryption.coffee
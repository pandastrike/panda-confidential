"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asymmetric;

asymmetric = function ({
  keyPair,
  key,
  encrypt,
  decrypt,
  nacl
}) {
  return async function () {
    var A, B, cipher, key1, key2, message, output, privateKey, publicKey; // Test Key Pair Generation

    A = ({
      privateKey,
      publicKey
    } = await keyPair.encryption());
    (0, _assert.default)(privateKey && key.isPrivate(privateKey), "must make private key");
    (0, _assert.default)(publicKey && key.isPublic(publicKey), "must make public key");
    (0, _assert.default)(privateKey.key.length === nacl.box.secretKeyLength, "private key is improper length");
    (0, _assert.default)(publicKey.key.length === nacl.box.publicKeyLength, "public key is improper length"); // Test Encrypt - Decrypt Cycle

    B = await keyPair.encryption();
    message = "Hello World!"; // Person A encrypts the message for person B.

    key1 = key.shared(A.privateKey, B.publicKey);
    (0, _assert.default)(key1 && key.isShared(key1) && key1.key.length === nacl.box.sharedKeyLength, "failed to create shared key.");
    cipher = await encrypt(key1, message);
    (0, _assert.default)(cipher && message !== cipher, "failed to create a ciphertext"); // Person B gets the cipher and decrypts the message with counterpart.

    key2 = key.shared(B.privateKey, A.publicKey);

    _assert.default.equal(key1.encode(), key2.encode(), "shared keys must be identical");

    output = decrypt(key2, cipher);
    return _assert.default.equal(message, output, "failed to decrypt");
  };
};

var _default = asymmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQvYXN5bW1ldHJpYy1lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFBQSxJQUFBLFVBQUE7O0FBRUEsVUFBQSxHQUFhLFVBQUM7QUFBQSxFQUFBLE9BQUE7QUFBQSxFQUFBLEdBQUE7QUFBQSxFQUFBLE9BQUE7QUFBQSxFQUFBLE9BQUE7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO1NBQTRDLGtCQUFBO0FBRXZELFFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLENBRnVELEM7O0FBRXZELElBQUEsQ0FBQSxJQUFJO0FBQUEsTUFBQSxVQUFBO0FBQUEsTUFBQTtBQUFBLFFBQTBCLE1BQU0sT0FBTyxDQUF2QyxVQUFnQyxFQUFwQyxDQUFBO0FBQ0EseUJBQVEsVUFBQSxJQUFjLEdBQUcsQ0FBSCxTQUFBLENBQXRCLFVBQXNCLENBQXRCLEVBQUEsdUJBQUE7QUFDQSx5QkFBUSxTQUFBLElBQWEsR0FBRyxDQUFILFFBQUEsQ0FBckIsU0FBcUIsQ0FBckIsRUFBQSxzQkFBQTtBQUNBLHlCQUFPLFVBQVUsQ0FBQyxHQUFYLENBQUEsTUFBQSxLQUF5QixJQUFJLENBQUMsR0FBTCxDQUFoQyxlQUFBLEVBQUEsZ0NBQUE7QUFFQSx5QkFBTyxTQUFTLENBQUMsR0FBVixDQUFBLE1BQUEsS0FBd0IsSUFBSSxDQUFDLEdBQUwsQ0FBL0IsZUFBQSxFQUxBLCtCQUtBLEVBUHVELEM7O0FBV3ZELElBQUEsQ0FBQSxHQUFJLE1BQU0sT0FBTyxDQUFiLFVBQU0sRUFBVjtBQUNBLElBQUEsT0FBQSxHQVZBLGNBVUEsQ0FadUQsQzs7QUFldkQsSUFBQSxJQUFBLEdBQU8sR0FBRyxDQUFILE1BQUEsQ0FBVyxDQUFDLENBQVosVUFBQSxFQUF5QixDQUFDLENBQTFCLFNBQUEsQ0FBUDtBQUNBLHlCQUFRLElBQUEsSUFBUSxHQUFHLENBQUgsUUFBQSxDQUFSLElBQVEsQ0FBUixJQUErQixJQUFJLENBQUMsR0FBTCxDQUFBLE1BQUEsS0FBbUIsSUFBSSxDQUFDLEdBQUwsQ0FBMUQsZUFBQSxFQUFBLDhCQUFBO0FBQ0EsSUFBQSxNQUFBLEdBQVMsTUFBTSxPQUFBLENBQUEsSUFBQSxFQUFOLE9BQU0sQ0FBZjtBQUNBLHlCQUFRLE1BQUEsSUFBVSxPQUFBLEtBQWxCLE1BQUEsRUFoQkEsK0JBZ0JBLEVBbEJ1RCxDOztBQXFCdkQsSUFBQSxJQUFBLEdBQU8sR0FBRyxDQUFILE1BQUEsQ0FBVyxDQUFDLENBQVosVUFBQSxFQUF5QixDQUFDLENBQTFCLFNBQUEsQ0FBUDs7QUFDQSxvQkFBQSxLQUFBLENBQWEsSUFBSSxDQUFqQixNQUFhLEVBQWIsRUFBNEIsSUFBSSxDQUFoQyxNQUE0QixFQUE1QixFQUFBLCtCQUFBOztBQUNBLElBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxDQUFUO1dBQ0EsZ0JBQUEsS0FBQSxDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsbUJBQUEsQztBQXhCdUQsRztBQUE1QyxDQUFiOztlQTBCZSxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcblxuYXN5bW1ldHJpYyA9ICh7a2V5UGFpciwga2V5LCBlbmNyeXB0LCBkZWNyeXB0LCBuYWNsfSkgLT4gLT5cbiAgIyBUZXN0IEtleSBQYWlyIEdlbmVyYXRpb25cbiAgQSA9IHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9ID0gYXdhaXQga2V5UGFpci5lbmNyeXB0aW9uKClcbiAgYXNzZXJ0IChwcml2YXRlS2V5ICYmIGtleS5pc1ByaXZhdGUgcHJpdmF0ZUtleSksIFwibXVzdCBtYWtlIHByaXZhdGUga2V5XCJcbiAgYXNzZXJ0IChwdWJsaWNLZXkgJiYga2V5LmlzUHVibGljIHB1YmxpY0tleSksIFwibXVzdCBtYWtlIHB1YmxpYyBrZXlcIlxuICBhc3NlcnQgcHJpdmF0ZUtleS5rZXkubGVuZ3RoID09IG5hY2wuYm94LnNlY3JldEtleUxlbmd0aCxcbiAgICBcInByaXZhdGUga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG4gIGFzc2VydCBwdWJsaWNLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5wdWJsaWNLZXlMZW5ndGgsXG4gICAgXCJwdWJsaWMga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG5cbiAgIyBUZXN0IEVuY3J5cHQgLSBEZWNyeXB0IEN5Y2xlXG4gIEIgPSBhd2FpdCBrZXlQYWlyLmVuY3J5cHRpb24oKVxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuXG4gICMgUGVyc29uIEEgZW5jcnlwdHMgdGhlIG1lc3NhZ2UgZm9yIHBlcnNvbiBCLlxuICBrZXkxID0ga2V5LnNoYXJlZCBBLnByaXZhdGVLZXksIEIucHVibGljS2V5XG4gIGFzc2VydCAoa2V5MSAmJiBrZXkuaXNTaGFyZWQoa2V5MSkgJiYgKGtleTEua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5zaGFyZWRLZXlMZW5ndGgpKSwgXCJmYWlsZWQgdG8gY3JlYXRlIHNoYXJlZCBrZXkuXCJcbiAgY2lwaGVyID0gYXdhaXQgZW5jcnlwdCBrZXkxLCBtZXNzYWdlXG4gIGFzc2VydCAoY2lwaGVyICYmIG1lc3NhZ2UgIT0gY2lwaGVyKSwgXCJmYWlsZWQgdG8gY3JlYXRlIGEgY2lwaGVydGV4dFwiXG5cbiAgIyBQZXJzb24gQiBnZXRzIHRoZSBjaXBoZXIgYW5kIGRlY3J5cHRzIHRoZSBtZXNzYWdlIHdpdGggY291bnRlcnBhcnQuXG4gIGtleTIgPSBrZXkuc2hhcmVkIEIucHJpdmF0ZUtleSwgQS5wdWJsaWNLZXlcbiAgYXNzZXJ0LmVxdWFsIGtleTEuZW5jb2RlKCksIGtleTIuZW5jb2RlKCksIFwic2hhcmVkIGtleXMgbXVzdCBiZSBpZGVudGljYWxcIlxuICBvdXRwdXQgPSBkZWNyeXB0IGtleTIsIGNpcGhlclxuICBhc3NlcnQuZXF1YWwgbWVzc2FnZSwgb3V0cHV0LCBcImZhaWxlZCB0byBkZWNyeXB0XCJcblxuZXhwb3J0IGRlZmF1bHQgYXN5bW1ldHJpY1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/asymmetric-encryption.coffee
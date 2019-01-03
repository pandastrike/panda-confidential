"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _amen = require("amen");

var _index = require("../../../src/index");

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asymmetric;

asymmetric = async function () {
  var A, B, cipher, decrypt, encrypt, key, key1, key2, keyPair, message, output, privateKey, publicKey;
  ({
    keyPair,
    key,
    encrypt,
    decrypt
  } = (0, _index.confidential)()); // Test Key Pair Generation

  A = ({
    privateKey,
    publicKey
  } = await keyPair.encryption());
  (0, _assert.default)(privateKey && key.isPrivate(privateKey), "must make private key");
  (0, _assert.default)(publicKey && key.isPublic(publicKey), "must make public key");
  (0, _assert.default)(privateKey.key.length === _tweetnacl.default.box.secretKeyLength, "private key is improper length");
  (0, _assert.default)(publicKey.key.length === _tweetnacl.default.box.publicKeyLength, "public key is improper length"); // Test Encrypt - Decrypt Cycle

  B = await keyPair.encryption();
  message = "Hello World!"; // Person A encrypts the message for person B.

  key1 = key.shared(A.privateKey, B.publicKey);
  (0, _assert.default)(key1 && key.isShared(key1) && key1.key.length === _tweetnacl.default.box.sharedKeyLength, "failed to create shared key.");
  cipher = await encrypt(key1, message);
  (0, _assert.default)(cipher && message !== cipher, "failed to create a ciphertext"); // Person B gets the cipher and decrypts the message with counterpart.

  key2 = key.shared(B.privateKey, A.publicKey);

  _assert.default.equal(key1.encode(), key2.encode(), "shared keys must be identical");

  output = decrypt(key2, cipher);
  return _assert.default.equal(message, output, "failed to decrypt");
};

var _default = asymmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL3JlZ3VsYXIvYXN5bW1ldHJpYy1lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFIQSxJQUFBLFVBQUE7O0FBS0EsVUFBQSxHQUFhLGtCQUFBO0FBQ1gsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFVBQUEsRUFBQSxTQUFBO0FBQUEsR0FBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUEsR0FBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUE7QUFBQSxNQUFBLDBCQUFBLEVBRFcsQzs7QUFJWCxFQUFBLENBQUEsSUFBSTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUE7QUFBQSxNQUEwQixNQUFNLE9BQU8sQ0FBdkMsVUFBZ0MsRUFBcEMsQ0FBQTtBQUNBLHVCQUFRLFVBQUEsSUFBYyxHQUFHLENBQUgsU0FBQSxDQUF0QixVQUFzQixDQUF0QixFQUFBLHVCQUFBO0FBQ0EsdUJBQVEsU0FBQSxJQUFhLEdBQUcsQ0FBSCxRQUFBLENBQXJCLFNBQXFCLENBQXJCLEVBQUEsc0JBQUE7QUFDQSx1QkFBTyxVQUFVLENBQUMsR0FBWCxDQUFBLE1BQUEsS0FBeUIsbUJBQUssR0FBTCxDQUFoQyxlQUFBLEVBQUEsZ0NBQUE7QUFFQSx1QkFBTyxTQUFTLENBQUMsR0FBVixDQUFBLE1BQUEsS0FBd0IsbUJBQUssR0FBTCxDQUEvQixlQUFBLEVBUkEsK0JBUUEsRUFUVyxDOztBQWFYLEVBQUEsQ0FBQSxHQUFJLE1BQU0sT0FBTyxDQUFiLFVBQU0sRUFBVjtBQUNBLEVBQUEsT0FBQSxHQWJBLGNBYUEsQ0FkVyxDOztBQWlCWCxFQUFBLElBQUEsR0FBTyxHQUFHLENBQUgsTUFBQSxDQUFXLENBQUMsQ0FBWixVQUFBLEVBQXlCLENBQUMsQ0FBMUIsU0FBQSxDQUFQO0FBQ0EsdUJBQVEsSUFBQSxJQUFRLEdBQUcsQ0FBSCxRQUFBLENBQVIsSUFBUSxDQUFSLElBQStCLElBQUksQ0FBQyxHQUFMLENBQUEsTUFBQSxLQUFtQixtQkFBSyxHQUFMLENBQTFELGVBQUEsRUFBQSw4QkFBQTtBQUNBLEVBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLElBQUEsRUFBTixPQUFNLENBQWY7QUFDQSx1QkFBUSxNQUFBLElBQVUsT0FBQSxLQUFsQixNQUFBLEVBbkJBLCtCQW1CQSxFQXBCVyxDOztBQXVCWCxFQUFBLElBQUEsR0FBTyxHQUFHLENBQUgsTUFBQSxDQUFXLENBQUMsQ0FBWixVQUFBLEVBQXlCLENBQUMsQ0FBMUIsU0FBQSxDQUFQOztBQUNBLGtCQUFBLEtBQUEsQ0FBYSxJQUFJLENBQWpCLE1BQWEsRUFBYixFQUE0QixJQUFJLENBQWhDLE1BQTRCLEVBQTVCLEVBQUEsK0JBQUE7O0FBQ0EsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFBLElBQUEsRUFBQSxNQUFBLENBQVQ7U0FDQSxnQkFBQSxLQUFBLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxtQkFBQSxDO0FBMUJXLENBQWI7O2VBNEJlLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IHt0ZXN0LCBwcmludH0gZnJvbSBcImFtZW5cIlxuaW1wb3J0IHtjb25maWRlbnRpYWx9IGZyb20gXCIuLi8uLi8uLi9zcmMvaW5kZXhcIlxuaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5cbmFzeW1tZXRyaWMgPSAtPlxuICB7a2V5UGFpciwga2V5LCBlbmNyeXB0LCBkZWNyeXB0fSA9IGNvbmZpZGVudGlhbCgpXG5cbiAgIyBUZXN0IEtleSBQYWlyIEdlbmVyYXRpb25cbiAgQSA9IHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9ID0gYXdhaXQga2V5UGFpci5lbmNyeXB0aW9uKClcbiAgYXNzZXJ0IChwcml2YXRlS2V5ICYmIGtleS5pc1ByaXZhdGUgcHJpdmF0ZUtleSksIFwibXVzdCBtYWtlIHByaXZhdGUga2V5XCJcbiAgYXNzZXJ0IChwdWJsaWNLZXkgJiYga2V5LmlzUHVibGljIHB1YmxpY0tleSksIFwibXVzdCBtYWtlIHB1YmxpYyBrZXlcIlxuICBhc3NlcnQgcHJpdmF0ZUtleS5rZXkubGVuZ3RoID09IG5hY2wuYm94LnNlY3JldEtleUxlbmd0aCxcbiAgICBcInByaXZhdGUga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG4gIGFzc2VydCBwdWJsaWNLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5wdWJsaWNLZXlMZW5ndGgsXG4gICAgXCJwdWJsaWMga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG5cbiAgIyBUZXN0IEVuY3J5cHQgLSBEZWNyeXB0IEN5Y2xlXG4gIEIgPSBhd2FpdCBrZXlQYWlyLmVuY3J5cHRpb24oKVxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuXG4gICMgUGVyc29uIEEgZW5jcnlwdHMgdGhlIG1lc3NhZ2UgZm9yIHBlcnNvbiBCLlxuICBrZXkxID0ga2V5LnNoYXJlZCBBLnByaXZhdGVLZXksIEIucHVibGljS2V5XG4gIGFzc2VydCAoa2V5MSAmJiBrZXkuaXNTaGFyZWQoa2V5MSkgJiYgKGtleTEua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5zaGFyZWRLZXlMZW5ndGgpKSwgXCJmYWlsZWQgdG8gY3JlYXRlIHNoYXJlZCBrZXkuXCJcbiAgY2lwaGVyID0gYXdhaXQgZW5jcnlwdCBrZXkxLCBtZXNzYWdlXG4gIGFzc2VydCAoY2lwaGVyICYmIG1lc3NhZ2UgIT0gY2lwaGVyKSwgXCJmYWlsZWQgdG8gY3JlYXRlIGEgY2lwaGVydGV4dFwiXG5cbiAgIyBQZXJzb24gQiBnZXRzIHRoZSBjaXBoZXIgYW5kIGRlY3J5cHRzIHRoZSBtZXNzYWdlIHdpdGggY291bnRlcnBhcnQuXG4gIGtleTIgPSBrZXkuc2hhcmVkIEIucHJpdmF0ZUtleSwgQS5wdWJsaWNLZXlcbiAgYXNzZXJ0LmVxdWFsIGtleTEuZW5jb2RlKCksIGtleTIuZW5jb2RlKCksIFwic2hhcmVkIGtleXMgbXVzdCBiZSBpZGVudGljYWxcIlxuICBvdXRwdXQgPSBkZWNyeXB0IGtleTIsIGNpcGhlclxuICBhc3NlcnQuZXF1YWwgbWVzc2FnZSwgb3V0cHV0LCBcImZhaWxlZCB0byBkZWNyeXB0XCJcblxuZXhwb3J0IGRlZmF1bHQgYXN5bW1ldHJpY1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=tests/regular/asymmetric-encryption.coffee
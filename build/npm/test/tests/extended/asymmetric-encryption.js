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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9hc3ltbWV0cmljLWVuY3J5cHRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUFBLElBQUEsVUFBQTs7QUFFQSxVQUFBLEdBQWEsVUFBQztBQUFBLEVBQUEsT0FBQTtBQUFBLEVBQUEsR0FBQTtBQUFBLEVBQUEsT0FBQTtBQUFBLEVBQUEsT0FBQTtBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7U0FBNEMsa0JBQUE7QUFFdkQsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLFNBQUEsQ0FGdUQsQzs7QUFFdkQsSUFBQSxDQUFBLElBQUk7QUFBQSxNQUFBLFVBQUE7QUFBQSxNQUFBO0FBQUEsUUFBMEIsTUFBTSxPQUFPLENBQXZDLFVBQWdDLEVBQXBDLENBQUE7QUFDQSx5QkFBUSxVQUFBLElBQWMsR0FBRyxDQUFILFNBQUEsQ0FBdEIsVUFBc0IsQ0FBdEIsRUFBQSx1QkFBQTtBQUNBLHlCQUFRLFNBQUEsSUFBYSxHQUFHLENBQUgsUUFBQSxDQUFyQixTQUFxQixDQUFyQixFQUFBLHNCQUFBO0FBQ0EseUJBQU8sVUFBVSxDQUFDLEdBQVgsQ0FBQSxNQUFBLEtBQXlCLElBQUksQ0FBQyxHQUFMLENBQWhDLGVBQUEsRUFBQSxnQ0FBQTtBQUVBLHlCQUFPLFNBQVMsQ0FBQyxHQUFWLENBQUEsTUFBQSxLQUF3QixJQUFJLENBQUMsR0FBTCxDQUEvQixlQUFBLEVBTEEsK0JBS0EsRUFQdUQsQzs7QUFXdkQsSUFBQSxDQUFBLEdBQUksTUFBTSxPQUFPLENBQWIsVUFBTSxFQUFWO0FBQ0EsSUFBQSxPQUFBLEdBVkEsY0FVQSxDQVp1RCxDOztBQWV2RCxJQUFBLElBQUEsR0FBTyxHQUFHLENBQUgsTUFBQSxDQUFXLENBQUMsQ0FBWixVQUFBLEVBQXlCLENBQUMsQ0FBMUIsU0FBQSxDQUFQO0FBQ0EseUJBQVEsSUFBQSxJQUFRLEdBQUcsQ0FBSCxRQUFBLENBQVIsSUFBUSxDQUFSLElBQStCLElBQUksQ0FBQyxHQUFMLENBQUEsTUFBQSxLQUFtQixJQUFJLENBQUMsR0FBTCxDQUExRCxlQUFBLEVBQUEsOEJBQUE7QUFDQSxJQUFBLE1BQUEsR0FBUyxNQUFNLE9BQUEsQ0FBQSxJQUFBLEVBQU4sT0FBTSxDQUFmO0FBQ0EseUJBQVEsTUFBQSxJQUFVLE9BQUEsS0FBbEIsTUFBQSxFQWhCQSwrQkFnQkEsRUFsQnVELEM7O0FBcUJ2RCxJQUFBLElBQUEsR0FBTyxHQUFHLENBQUgsTUFBQSxDQUFXLENBQUMsQ0FBWixVQUFBLEVBQXlCLENBQUMsQ0FBMUIsU0FBQSxDQUFQOztBQUNBLG9CQUFBLEtBQUEsQ0FBYSxJQUFJLENBQWpCLE1BQWEsRUFBYixFQUE0QixJQUFJLENBQWhDLE1BQTRCLEVBQTVCLEVBQUEsK0JBQUE7O0FBQ0EsSUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFBLElBQUEsRUFBQSxNQUFBLENBQVQ7V0FDQSxnQkFBQSxLQUFBLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxtQkFBQSxDO0FBeEJ1RCxHO0FBQTVDLENBQWI7O2VBMEJlLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuXG5hc3ltbWV0cmljID0gKHtrZXlQYWlyLCBrZXksIGVuY3J5cHQsIGRlY3J5cHQsIG5hY2x9KSAtPiAtPlxuICAjIFRlc3QgS2V5IFBhaXIgR2VuZXJhdGlvblxuICBBID0ge3ByaXZhdGVLZXksIHB1YmxpY0tleX0gPSBhd2FpdCBrZXlQYWlyLmVuY3J5cHRpb24oKVxuICBhc3NlcnQgKHByaXZhdGVLZXkgJiYga2V5LmlzUHJpdmF0ZSBwcml2YXRlS2V5KSwgXCJtdXN0IG1ha2UgcHJpdmF0ZSBrZXlcIlxuICBhc3NlcnQgKHB1YmxpY0tleSAmJiBrZXkuaXNQdWJsaWMgcHVibGljS2V5KSwgXCJtdXN0IG1ha2UgcHVibGljIGtleVwiXG4gIGFzc2VydCBwcml2YXRlS2V5LmtleS5sZW5ndGggPT0gbmFjbC5ib3guc2VjcmV0S2V5TGVuZ3RoLFxuICAgIFwicHJpdmF0ZSBrZXkgaXMgaW1wcm9wZXIgbGVuZ3RoXCJcbiAgYXNzZXJ0IHB1YmxpY0tleS5rZXkubGVuZ3RoID09IG5hY2wuYm94LnB1YmxpY0tleUxlbmd0aCxcbiAgICBcInB1YmxpYyBrZXkgaXMgaW1wcm9wZXIgbGVuZ3RoXCJcblxuICAjIFRlc3QgRW5jcnlwdCAtIERlY3J5cHQgQ3ljbGVcbiAgQiA9IGF3YWl0IGtleVBhaXIuZW5jcnlwdGlvbigpXG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG5cbiAgIyBQZXJzb24gQSBlbmNyeXB0cyB0aGUgbWVzc2FnZSBmb3IgcGVyc29uIEIuXG4gIGtleTEgPSBrZXkuc2hhcmVkIEEucHJpdmF0ZUtleSwgQi5wdWJsaWNLZXlcbiAgYXNzZXJ0IChrZXkxICYmIGtleS5pc1NoYXJlZChrZXkxKSAmJiAoa2V5MS5rZXkubGVuZ3RoID09IG5hY2wuYm94LnNoYXJlZEtleUxlbmd0aCkpLCBcImZhaWxlZCB0byBjcmVhdGUgc2hhcmVkIGtleS5cIlxuICBjaXBoZXIgPSBhd2FpdCBlbmNyeXB0IGtleTEsIG1lc3NhZ2VcbiAgYXNzZXJ0IChjaXBoZXIgJiYgbWVzc2FnZSAhPSBjaXBoZXIpLCBcImZhaWxlZCB0byBjcmVhdGUgYSBjaXBoZXJ0ZXh0XCJcblxuICAjIFBlcnNvbiBCIGdldHMgdGhlIGNpcGhlciBhbmQgZGVjcnlwdHMgdGhlIG1lc3NhZ2Ugd2l0aCBjb3VudGVycGFydC5cbiAga2V5MiA9IGtleS5zaGFyZWQgQi5wcml2YXRlS2V5LCBBLnB1YmxpY0tleVxuICBhc3NlcnQuZXF1YWwga2V5MS5lbmNvZGUoKSwga2V5Mi5lbmNvZGUoKSwgXCJzaGFyZWQga2V5cyBtdXN0IGJlIGlkZW50aWNhbFwiXG4gIG91dHB1dCA9IGRlY3J5cHQga2V5MiwgY2lwaGVyXG4gIGFzc2VydC5lcXVhbCBtZXNzYWdlLCBvdXRwdXQsIFwiZmFpbGVkIHRvIGRlY3J5cHRcIlxuXG5leHBvcnQgZGVmYXVsdCBhc3ltbWV0cmljXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/asymmetric-encryption.coffee
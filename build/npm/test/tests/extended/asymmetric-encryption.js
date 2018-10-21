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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL2FzeW1tZXRyaWMtZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQUEsSUFBQSxVQUFBOztBQUVBLFVBQUEsR0FBYSxVQUFDO0FBQUEsRUFBQSxPQUFBO0FBQUEsRUFBQSxHQUFBO0FBQUEsRUFBQSxPQUFBO0FBQUEsRUFBQSxPQUFBO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtTQUE0QyxrQkFBQTtBQUV2RCxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsU0FBQSxDQUZ1RCxDOztBQUV2RCxJQUFBLENBQUEsSUFBSTtBQUFBLE1BQUEsVUFBQTtBQUFBLE1BQUE7QUFBQSxRQUEwQixNQUFNLE9BQU8sQ0FBdkMsVUFBZ0MsRUFBcEMsQ0FBQTtBQUNBLHlCQUFRLFVBQUEsSUFBYyxHQUFHLENBQUgsU0FBQSxDQUF0QixVQUFzQixDQUF0QixFQUFBLHVCQUFBO0FBQ0EseUJBQVEsU0FBQSxJQUFhLEdBQUcsQ0FBSCxRQUFBLENBQXJCLFNBQXFCLENBQXJCLEVBQUEsc0JBQUE7QUFDQSx5QkFBTyxVQUFVLENBQUMsR0FBWCxDQUFBLE1BQUEsS0FBeUIsSUFBSSxDQUFDLEdBQUwsQ0FBaEMsZUFBQSxFQUFBLGdDQUFBO0FBRUEseUJBQU8sU0FBUyxDQUFDLEdBQVYsQ0FBQSxNQUFBLEtBQXdCLElBQUksQ0FBQyxHQUFMLENBQS9CLGVBQUEsRUFMQSwrQkFLQSxFQVB1RCxDOztBQVd2RCxJQUFBLENBQUEsR0FBSSxNQUFNLE9BQU8sQ0FBYixVQUFNLEVBQVY7QUFDQSxJQUFBLE9BQUEsR0FWQSxjQVVBLENBWnVELEM7O0FBZXZELElBQUEsSUFBQSxHQUFPLEdBQUcsQ0FBSCxNQUFBLENBQVcsQ0FBQyxDQUFaLFVBQUEsRUFBeUIsQ0FBQyxDQUExQixTQUFBLENBQVA7QUFDQSx5QkFBUSxJQUFBLElBQVEsR0FBRyxDQUFILFFBQUEsQ0FBUixJQUFRLENBQVIsSUFBK0IsSUFBSSxDQUFDLEdBQUwsQ0FBQSxNQUFBLEtBQW1CLElBQUksQ0FBQyxHQUFMLENBQTFELGVBQUEsRUFBQSw4QkFBQTtBQUNBLElBQUEsTUFBQSxHQUFTLE1BQU0sT0FBQSxDQUFBLElBQUEsRUFBTixPQUFNLENBQWY7QUFDQSx5QkFBUSxNQUFBLElBQVUsT0FBQSxLQUFsQixNQUFBLEVBaEJBLCtCQWdCQSxFQWxCdUQsQzs7QUFxQnZELElBQUEsSUFBQSxHQUFPLEdBQUcsQ0FBSCxNQUFBLENBQVcsQ0FBQyxDQUFaLFVBQUEsRUFBeUIsQ0FBQyxDQUExQixTQUFBLENBQVA7O0FBQ0Esb0JBQUEsS0FBQSxDQUFhLElBQUksQ0FBakIsTUFBYSxFQUFiLEVBQTRCLElBQUksQ0FBaEMsTUFBNEIsRUFBNUIsRUFBQSwrQkFBQTs7QUFDQSxJQUFBLE1BQUEsR0FBUyxPQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsQ0FBVDtXQUNBLGdCQUFBLEtBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLG1CQUFBLEM7QUF4QnVELEc7QUFBNUMsQ0FBYjs7ZUEwQmUsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5cbmFzeW1tZXRyaWMgPSAoe2tleVBhaXIsIGtleSwgZW5jcnlwdCwgZGVjcnlwdCwgbmFjbH0pIC0+IC0+XG4gICMgVGVzdCBLZXkgUGFpciBHZW5lcmF0aW9uXG4gIEEgPSB7cHJpdmF0ZUtleSwgcHVibGljS2V5fSA9IGF3YWl0IGtleVBhaXIuZW5jcnlwdGlvbigpXG4gIGFzc2VydCAocHJpdmF0ZUtleSAmJiBrZXkuaXNQcml2YXRlIHByaXZhdGVLZXkpLCBcIm11c3QgbWFrZSBwcml2YXRlIGtleVwiXG4gIGFzc2VydCAocHVibGljS2V5ICYmIGtleS5pc1B1YmxpYyBwdWJsaWNLZXkpLCBcIm11c3QgbWFrZSBwdWJsaWMga2V5XCJcbiAgYXNzZXJ0IHByaXZhdGVLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5zZWNyZXRLZXlMZW5ndGgsXG4gICAgXCJwcml2YXRlIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuICBhc3NlcnQgcHVibGljS2V5LmtleS5sZW5ndGggPT0gbmFjbC5ib3gucHVibGljS2V5TGVuZ3RoLFxuICAgIFwicHVibGljIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuXG4gICMgVGVzdCBFbmNyeXB0IC0gRGVjcnlwdCBDeWNsZVxuICBCID0gYXdhaXQga2V5UGFpci5lbmNyeXB0aW9uKClcbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcblxuICAjIFBlcnNvbiBBIGVuY3J5cHRzIHRoZSBtZXNzYWdlIGZvciBwZXJzb24gQi5cbiAga2V5MSA9IGtleS5zaGFyZWQgQS5wcml2YXRlS2V5LCBCLnB1YmxpY0tleVxuICBhc3NlcnQgKGtleTEgJiYga2V5LmlzU2hhcmVkKGtleTEpICYmIChrZXkxLmtleS5sZW5ndGggPT0gbmFjbC5ib3guc2hhcmVkS2V5TGVuZ3RoKSksIFwiZmFpbGVkIHRvIGNyZWF0ZSBzaGFyZWQga2V5LlwiXG4gIGNpcGhlciA9IGF3YWl0IGVuY3J5cHQga2V5MSwgbWVzc2FnZVxuICBhc3NlcnQgKGNpcGhlciAmJiBtZXNzYWdlICE9IGNpcGhlciksIFwiZmFpbGVkIHRvIGNyZWF0ZSBhIGNpcGhlcnRleHRcIlxuXG4gICMgUGVyc29uIEIgZ2V0cyB0aGUgY2lwaGVyIGFuZCBkZWNyeXB0cyB0aGUgbWVzc2FnZSB3aXRoIGNvdW50ZXJwYXJ0LlxuICBrZXkyID0ga2V5LnNoYXJlZCBCLnByaXZhdGVLZXksIEEucHVibGljS2V5XG4gIGFzc2VydC5lcXVhbCBrZXkxLmVuY29kZSgpLCBrZXkyLmVuY29kZSgpLCBcInNoYXJlZCBrZXlzIG11c3QgYmUgaWRlbnRpY2FsXCJcbiAgb3V0cHV0ID0gZGVjcnlwdCBrZXkyLCBjaXBoZXJcbiAgYXNzZXJ0LmVxdWFsIG1lc3NhZ2UsIG91dHB1dCwgXCJmYWlsZWQgdG8gZGVjcnlwdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW1tZXRyaWNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/extended/asymmetric-encryption.coffee
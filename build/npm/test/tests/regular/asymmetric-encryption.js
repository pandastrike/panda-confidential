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
  var A, B, C, EncryptionKeyPair, Envelope, Message, PrivateKey, PublicKey, decrypt, encrypt, envelope, message, outMessage, privateKey, publicKey, serialized, string;
  ({
    encrypt,
    decrypt,
    EncryptionKeyPair,
    Message,
    Envelope,
    PrivateKey,
    PublicKey
  } = (0, _index.confidential)()); // Test Key Pair Generation

  A = ({
    privateKey,
    publicKey
  } = await EncryptionKeyPair.create());
  (0, _assert.default)(PrivateKey.isType(privateKey), "bad private key");
  (0, _assert.default)(PublicKey.isType(publicKey), "bad public key");
  (0, _assert.default)(privateKey.key.length === _tweetnacl.default.box.secretKeyLength, "private key is improper length");
  (0, _assert.default)(publicKey.key.length === _tweetnacl.default.box.publicKeyLength, "public key is improper length"); // Test Encrypt - Decrypt Cycle

  B = await EncryptionKeyPair.create(); // Person A encrypts the message for person B.

  string = "Hello World!";
  message = Message.from("utf8", string);
  (0, _assert.default)(Message.isType(message), "bad message");
  envelope = await encrypt(A, B.publicKey, message);
  (0, _assert.default)(Envelope.isType(envelope), "bad envelope");
  serialized = envelope.to("base64"); // Person B gets the envelope and decrypts the message with counterpart.

  envelope = Envelope.from("base64", serialized);
  outMessage = decrypt(B, envelope);
  (0, _assert.default)(Message.isType(outMessage), "bad message");

  _assert.default.equal(outMessage.to("utf8"), string, "failed to decrypt");

  try {
    // Negative test
    C = await EncryptionKeyPair.create();
    decrypt(C, envelope);
    return _assert.default.fail("This decrypt should fail");
  } catch (error) {}
};

var _default = asymmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9yZWd1bGFyL2FzeW1tZXRyaWMtZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxVQUFBOztBQUtBLFVBQUEsR0FBYSxrQkFBQTtBQUNYLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsaUJBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxVQUFBLEVBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxNQUFBO0FBQUEsR0FBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUEsaUJBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLFFBQUE7QUFBQSxJQUFBLFVBQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQSxFQURXLEM7O0FBSVgsRUFBQSxDQUFBLElBQUk7QUFBQSxJQUFBLFVBQUE7QUFBQSxJQUFBO0FBQUEsTUFBMEIsTUFBTSxpQkFBaUIsQ0FBakQsTUFBZ0MsRUFBcEMsQ0FBQTtBQUNBLHVCQUFRLFVBQVUsQ0FBVixNQUFBLENBQVIsVUFBUSxDQUFSLEVBQUEsaUJBQUE7QUFDQSx1QkFBUSxTQUFTLENBQVQsTUFBQSxDQUFSLFNBQVEsQ0FBUixFQUFBLGdCQUFBO0FBQ0EsdUJBQU8sVUFBVSxDQUFDLEdBQVgsQ0FBQSxNQUFBLEtBQXlCLG1CQUFLLEdBQUwsQ0FBaEMsZUFBQSxFQUFBLGdDQUFBO0FBRUEsdUJBQU8sU0FBUyxDQUFDLEdBQVYsQ0FBQSxNQUFBLEtBQXdCLG1CQUFLLEdBQUwsQ0FBL0IsZUFBQSxFQVJBLCtCQVFBLEVBVFcsQzs7QUFhWCxFQUFBLENBQUEsR0FBSSxNQUFNLGlCQUFpQixDQVozQixNQVlVLEVBQVYsQ0FiVyxDOztBQWdCWCxFQUFBLE1BQUEsR0FBUyxjQUFUO0FBQ0EsRUFBQSxPQUFBLEdBQVUsT0FBTyxDQUFQLElBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxDQUFWO0FBQ0EsdUJBQVEsT0FBTyxDQUFQLE1BQUEsQ0FBUixPQUFRLENBQVIsRUFBQSxhQUFBO0FBRUEsRUFBQSxRQUFBLEdBQVcsTUFBTSxPQUFBLENBQUEsQ0FBQSxFQUFXLENBQUMsQ0FBWixTQUFBLEVBQU4sT0FBTSxDQUFqQjtBQUNBLHVCQUFRLFFBQVEsQ0FBUixNQUFBLENBQVIsUUFBUSxDQUFSLEVBQUEsY0FBQTtBQUNBLEVBQUEsVUFBQSxHQUFhLFFBQVEsQ0FBUixFQUFBLENBckJiLFFBcUJhLENBQWIsQ0F0QlcsQzs7QUF5QlgsRUFBQSxRQUFBLEdBQVcsUUFBUSxDQUFSLElBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxDQUFYO0FBRUEsRUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFBLENBQUEsRUFBQSxRQUFBLENBQWI7QUFDQSx1QkFBUSxPQUFPLENBQVAsTUFBQSxDQUFSLFVBQVEsQ0FBUixFQUFBLGFBQUE7O0FBRUEsa0JBQUEsS0FBQSxDQUFjLFVBQVUsQ0FBVixFQUFBLENBQWQsTUFBYyxDQUFkLEVBQUEsTUFBQSxFQUFBLG1CQUFBOztBQUdBLE1BQUE7O0FBQ0UsSUFBQSxDQUFBLEdBQUksTUFBTSxpQkFBaUIsQ0FBdkIsTUFBTSxFQUFWO0FBQ0EsSUFBQSxPQUFBLENBQUEsQ0FBQSxFQUFBLFFBQUEsQ0FBQTtXQUNBLGdCQUFBLElBQUEsQ0FIRiwwQkFHRSxDO0FBSEYsR0FBQSxDQUFBLE9BQUEsS0FBQSxFQUFBLEM7QUFqQ1csQ0FBYjs7ZUF1Q2UsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge3Rlc3QsIHByaW50fSBmcm9tIFwiYW1lblwiXG5pbXBvcnQge2NvbmZpZGVudGlhbH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9pbmRleFwiXG5pbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcblxuYXN5bW1ldHJpYyA9IC0+XG4gIHtlbmNyeXB0LCBkZWNyeXB0LCBFbmNyeXB0aW9uS2V5UGFpciwgTWVzc2FnZSwgRW52ZWxvcGUsIFByaXZhdGVLZXksIFB1YmxpY0tleX0gPSBjb25maWRlbnRpYWwoKVxuXG4gICMgVGVzdCBLZXkgUGFpciBHZW5lcmF0aW9uXG4gIEEgPSB7cHJpdmF0ZUtleSwgcHVibGljS2V5fSA9IGF3YWl0IEVuY3J5cHRpb25LZXlQYWlyLmNyZWF0ZSgpXG4gIGFzc2VydCAoUHJpdmF0ZUtleS5pc1R5cGUgcHJpdmF0ZUtleSksIFwiYmFkIHByaXZhdGUga2V5XCJcbiAgYXNzZXJ0IChQdWJsaWNLZXkuaXNUeXBlIHB1YmxpY0tleSksIFwiYmFkIHB1YmxpYyBrZXlcIlxuICBhc3NlcnQgcHJpdmF0ZUtleS5rZXkubGVuZ3RoID09IG5hY2wuYm94LnNlY3JldEtleUxlbmd0aCxcbiAgICBcInByaXZhdGUga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG4gIGFzc2VydCBwdWJsaWNLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5wdWJsaWNLZXlMZW5ndGgsXG4gICAgXCJwdWJsaWMga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG5cbiAgIyBUZXN0IEVuY3J5cHQgLSBEZWNyeXB0IEN5Y2xlXG4gIEIgPSBhd2FpdCBFbmNyeXB0aW9uS2V5UGFpci5jcmVhdGUoKVxuXG4gICMgUGVyc29uIEEgZW5jcnlwdHMgdGhlIG1lc3NhZ2UgZm9yIHBlcnNvbiBCLlxuICBzdHJpbmcgPSBcIkhlbGxvIFdvcmxkIVwiXG4gIG1lc3NhZ2UgPSBNZXNzYWdlLmZyb20gXCJ1dGY4XCIsIHN0cmluZ1xuICBhc3NlcnQgKE1lc3NhZ2UuaXNUeXBlIG1lc3NhZ2UpLCBcImJhZCBtZXNzYWdlXCJcblxuICBlbnZlbG9wZSA9IGF3YWl0IGVuY3J5cHQgQSwgQi5wdWJsaWNLZXksIG1lc3NhZ2VcbiAgYXNzZXJ0IChFbnZlbG9wZS5pc1R5cGUgZW52ZWxvcGUpLCBcImJhZCBlbnZlbG9wZVwiXG4gIHNlcmlhbGl6ZWQgPSBlbnZlbG9wZS50byBcImJhc2U2NFwiXG5cbiAgIyBQZXJzb24gQiBnZXRzIHRoZSBlbnZlbG9wZSBhbmQgZGVjcnlwdHMgdGhlIG1lc3NhZ2Ugd2l0aCBjb3VudGVycGFydC5cbiAgZW52ZWxvcGUgPSBFbnZlbG9wZS5mcm9tIFwiYmFzZTY0XCIsIHNlcmlhbGl6ZWRcblxuICBvdXRNZXNzYWdlID0gZGVjcnlwdCBCLCBlbnZlbG9wZVxuICBhc3NlcnQgKE1lc3NhZ2UuaXNUeXBlIG91dE1lc3NhZ2UpLCBcImJhZCBtZXNzYWdlXCJcblxuICBhc3NlcnQuZXF1YWwgKG91dE1lc3NhZ2UudG8gXCJ1dGY4XCIpLCBzdHJpbmcsIFwiZmFpbGVkIHRvIGRlY3J5cHRcIlxuXG4gICMgTmVnYXRpdmUgdGVzdFxuICB0cnlcbiAgICBDID0gYXdhaXQgRW5jcnlwdGlvbktleVBhaXIuY3JlYXRlKClcbiAgICBkZWNyeXB0IEMsIGVudmVsb3BlXG4gICAgYXNzZXJ0LmZhaWwgXCJUaGlzIGRlY3J5cHQgc2hvdWxkIGZhaWxcIlxuICBjYXRjaFxuXG5leHBvcnQgZGVmYXVsdCBhc3ltbWV0cmljXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/regular/asymmetric-encryption.coffee
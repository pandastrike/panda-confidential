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
  var A, B, C, EncryptionKeyPair, Envelope, Message, PrivateKey, PublicKey, SharedKey, decrypt, encrypt, envelope, key1, key2, key3, message, outMessage, privateKey, publicKey, serialized, string;
  ({
    encrypt,
    decrypt,
    EncryptionKeyPair,
    Message,
    Envelope,
    PrivateKey,
    PublicKey,
    SharedKey
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
  key1 = SharedKey.create(A.privateKey, B.publicKey);
  (0, _assert.default)(SharedKey.isType(key1), "bad shared key");
  (0, _assert.default)(key1.key.length === _tweetnacl.default.box.sharedKeyLength, "bad shared key");
  envelope = await encrypt(key1, message);
  (0, _assert.default)(Envelope.isType(envelope), "bad envelope");
  serialized = envelope.to("base64"); // Person B gets the envelope and decrypts the message with counterpart.

  envelope = Envelope.from("base64", serialized);
  key2 = SharedKey.create(B.privateKey, A.publicKey);

  _assert.default.equal(key1.to("base64"), key2.to("base64"), "shared keys must match");

  outMessage = decrypt(key2, envelope);
  (0, _assert.default)(Message.isType(outMessage), "bad message");

  _assert.default.equal(outMessage.to("utf8"), string, "failed to decrypt");

  try {
    // Negative test
    C = await EncryptionKeyPair.create();
    key3 = SharedKey.create(A.publicKey, C.privateKey);
    decrypt(key3, envelope);
    return _assert.default.fail("This decrypt shoudl fail");
  } catch (error) {}
};

var _default = asymmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9hc3ltbWV0cmljLWVuY3J5cHRpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsVUFBQTs7QUFLQSxVQUFBLEdBQWEsa0JBQUE7QUFDWCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLGlCQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsU0FBQSxFQUFBLFNBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUE7QUFBQSxHQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxpQkFBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUEsUUFBQTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUEsU0FBQTtBQUFBLElBQUE7QUFBQSxNQUFBLDBCQUFBLEVBRFcsQzs7QUFJWCxFQUFBLENBQUEsSUFBSTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUE7QUFBQSxNQUEwQixNQUFNLGlCQUFpQixDQUFqRCxNQUFnQyxFQUFwQyxDQUFBO0FBQ0EsdUJBQVEsVUFBVSxDQUFWLE1BQUEsQ0FBUixVQUFRLENBQVIsRUFBQSxpQkFBQTtBQUNBLHVCQUFRLFNBQVMsQ0FBVCxNQUFBLENBQVIsU0FBUSxDQUFSLEVBQUEsZ0JBQUE7QUFDQSx1QkFBTyxVQUFVLENBQUMsR0FBWCxDQUFBLE1BQUEsS0FBeUIsbUJBQUssR0FBTCxDQUFoQyxlQUFBLEVBQUEsZ0NBQUE7QUFFQSx1QkFBTyxTQUFTLENBQUMsR0FBVixDQUFBLE1BQUEsS0FBd0IsbUJBQUssR0FBTCxDQUEvQixlQUFBLEVBUkEsK0JBUUEsRUFUVyxDOztBQWFYLEVBQUEsQ0FBQSxHQUFJLE1BQU0saUJBQWlCLENBWjNCLE1BWVUsRUFBVixDQWJXLEM7O0FBZ0JYLEVBQUEsTUFBQSxHQUFTLGNBQVQ7QUFDQSxFQUFBLE9BQUEsR0FBVSxPQUFPLENBQVAsSUFBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLENBQVY7QUFDQSx1QkFBUSxPQUFPLENBQVAsTUFBQSxDQUFSLE9BQVEsQ0FBUixFQUFBLGFBQUE7QUFFQSxFQUFBLElBQUEsR0FBTyxTQUFTLENBQVQsTUFBQSxDQUFpQixDQUFDLENBQWxCLFVBQUEsRUFBK0IsQ0FBQyxDQUFoQyxTQUFBLENBQVA7QUFDQSx1QkFBUSxTQUFTLENBQVQsTUFBQSxDQUFSLElBQVEsQ0FBUixFQUFBLGdCQUFBO0FBQ0EsdUJBQU8sSUFBSSxDQUFDLEdBQUwsQ0FBQSxNQUFBLEtBQW1CLG1CQUFLLEdBQUwsQ0FBMUIsZUFBQSxFQUFBLGdCQUFBO0FBRUEsRUFBQSxRQUFBLEdBQVcsTUFBTSxPQUFBLENBQUEsSUFBQSxFQUFOLE9BQU0sQ0FBakI7QUFDQSx1QkFBUSxRQUFRLENBQVIsTUFBQSxDQUFSLFFBQVEsQ0FBUixFQUFBLGNBQUE7QUFDQSxFQUFBLFVBQUEsR0FBYSxRQUFRLENBQVIsRUFBQSxDQXpCYixRQXlCYSxDQUFiLENBMUJXLEM7O0FBNkJYLEVBQUEsUUFBQSxHQUFXLFFBQVEsQ0FBUixJQUFBLENBQUEsUUFBQSxFQUFBLFVBQUEsQ0FBWDtBQUVBLEVBQUEsSUFBQSxHQUFPLFNBQVMsQ0FBVCxNQUFBLENBQWlCLENBQUMsQ0FBbEIsVUFBQSxFQUErQixDQUFDLENBQWhDLFNBQUEsQ0FBUDs7QUFDQSxrQkFBQSxLQUFBLENBQWMsSUFBSSxDQUFKLEVBQUEsQ0FBZCxRQUFjLENBQWQsRUFBa0MsSUFBSSxDQUFKLEVBQUEsQ0FBbEMsUUFBa0MsQ0FBbEMsRUFBQSx3QkFBQTs7QUFFQSxFQUFBLFVBQUEsR0FBYSxPQUFBLENBQUEsSUFBQSxFQUFBLFFBQUEsQ0FBYjtBQUNBLHVCQUFRLE9BQU8sQ0FBUCxNQUFBLENBQVIsVUFBUSxDQUFSLEVBQUEsYUFBQTs7QUFFQSxrQkFBQSxLQUFBLENBQWMsVUFBVSxDQUFWLEVBQUEsQ0FBZCxNQUFjLENBQWQsRUFBQSxNQUFBLEVBQUEsbUJBQUE7O0FBR0EsTUFBQTs7QUFDRSxJQUFBLENBQUEsR0FBSSxNQUFNLGlCQUFpQixDQUF2QixNQUFNLEVBQVY7QUFDQSxJQUFBLElBQUEsR0FBTyxTQUFTLENBQVQsTUFBQSxDQUFpQixDQUFDLENBQWxCLFNBQUEsRUFBOEIsQ0FBQyxDQUEvQixVQUFBLENBQVA7QUFDQSxJQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsUUFBQSxDQUFBO1dBQ0EsZ0JBQUEsSUFBQSxDQUpGLDBCQUlFLEM7QUFKRixHQUFBLENBQUEsT0FBQSxLQUFBLEVBQUEsQztBQXhDVyxDQUFiOztlQStDZSxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcbmltcG9ydCB7dGVzdCwgcHJpbnR9IGZyb20gXCJhbWVuXCJcbmltcG9ydCB7Y29uZmlkZW50aWFsfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2luZGV4XCJcbmltcG9ydCBuYWNsIGZyb20gXCJ0d2VldG5hY2xcIlxuXG5hc3ltbWV0cmljID0gLT5cbiAge2VuY3J5cHQsIGRlY3J5cHQsIEVuY3J5cHRpb25LZXlQYWlyLCBNZXNzYWdlLCBFbnZlbG9wZSwgUHJpdmF0ZUtleSwgUHVibGljS2V5LCBTaGFyZWRLZXl9ID0gY29uZmlkZW50aWFsKClcblxuICAjIFRlc3QgS2V5IFBhaXIgR2VuZXJhdGlvblxuICBBID0ge3ByaXZhdGVLZXksIHB1YmxpY0tleX0gPSBhd2FpdCBFbmNyeXB0aW9uS2V5UGFpci5jcmVhdGUoKVxuICBhc3NlcnQgKFByaXZhdGVLZXkuaXNUeXBlIHByaXZhdGVLZXkpLCBcImJhZCBwcml2YXRlIGtleVwiXG4gIGFzc2VydCAoUHVibGljS2V5LmlzVHlwZSBwdWJsaWNLZXkpLCBcImJhZCBwdWJsaWMga2V5XCJcbiAgYXNzZXJ0IHByaXZhdGVLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLmJveC5zZWNyZXRLZXlMZW5ndGgsXG4gICAgXCJwcml2YXRlIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuICBhc3NlcnQgcHVibGljS2V5LmtleS5sZW5ndGggPT0gbmFjbC5ib3gucHVibGljS2V5TGVuZ3RoLFxuICAgIFwicHVibGljIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuXG4gICMgVGVzdCBFbmNyeXB0IC0gRGVjcnlwdCBDeWNsZVxuICBCID0gYXdhaXQgRW5jcnlwdGlvbktleVBhaXIuY3JlYXRlKClcblxuICAjIFBlcnNvbiBBIGVuY3J5cHRzIHRoZSBtZXNzYWdlIGZvciBwZXJzb24gQi5cbiAgc3RyaW5nID0gXCJIZWxsbyBXb3JsZCFcIlxuICBtZXNzYWdlID0gTWVzc2FnZS5mcm9tIFwidXRmOFwiLCBzdHJpbmdcbiAgYXNzZXJ0IChNZXNzYWdlLmlzVHlwZSBtZXNzYWdlKSwgXCJiYWQgbWVzc2FnZVwiXG5cbiAga2V5MSA9IFNoYXJlZEtleS5jcmVhdGUgQS5wcml2YXRlS2V5LCBCLnB1YmxpY0tleVxuICBhc3NlcnQgKFNoYXJlZEtleS5pc1R5cGUga2V5MSksIFwiYmFkIHNoYXJlZCBrZXlcIlxuICBhc3NlcnQga2V5MS5rZXkubGVuZ3RoID09IG5hY2wuYm94LnNoYXJlZEtleUxlbmd0aCwgXCJiYWQgc2hhcmVkIGtleVwiXG5cbiAgZW52ZWxvcGUgPSBhd2FpdCBlbmNyeXB0IGtleTEsIG1lc3NhZ2VcbiAgYXNzZXJ0IChFbnZlbG9wZS5pc1R5cGUgZW52ZWxvcGUpLCBcImJhZCBlbnZlbG9wZVwiXG4gIHNlcmlhbGl6ZWQgPSBlbnZlbG9wZS50byBcImJhc2U2NFwiXG5cbiAgIyBQZXJzb24gQiBnZXRzIHRoZSBlbnZlbG9wZSBhbmQgZGVjcnlwdHMgdGhlIG1lc3NhZ2Ugd2l0aCBjb3VudGVycGFydC5cbiAgZW52ZWxvcGUgPSBFbnZlbG9wZS5mcm9tIFwiYmFzZTY0XCIsIHNlcmlhbGl6ZWRcblxuICBrZXkyID0gU2hhcmVkS2V5LmNyZWF0ZSBCLnByaXZhdGVLZXksIEEucHVibGljS2V5XG4gIGFzc2VydC5lcXVhbCAoa2V5MS50byBcImJhc2U2NFwiKSwgKGtleTIudG8gXCJiYXNlNjRcIiksIFwic2hhcmVkIGtleXMgbXVzdCBtYXRjaFwiXG5cbiAgb3V0TWVzc2FnZSA9IGRlY3J5cHQga2V5MiwgZW52ZWxvcGVcbiAgYXNzZXJ0IChNZXNzYWdlLmlzVHlwZSBvdXRNZXNzYWdlKSwgXCJiYWQgbWVzc2FnZVwiXG5cbiAgYXNzZXJ0LmVxdWFsIChvdXRNZXNzYWdlLnRvIFwidXRmOFwiKSwgc3RyaW5nLCBcImZhaWxlZCB0byBkZWNyeXB0XCJcblxuICAjIE5lZ2F0aXZlIHRlc3RcbiAgdHJ5XG4gICAgQyA9IGF3YWl0IEVuY3J5cHRpb25LZXlQYWlyLmNyZWF0ZSgpXG4gICAga2V5MyA9IFNoYXJlZEtleS5jcmVhdGUgQS5wdWJsaWNLZXksIEMucHJpdmF0ZUtleVxuICAgIGRlY3J5cHQga2V5MywgZW52ZWxvcGVcbiAgICBhc3NlcnQuZmFpbCBcIlRoaXMgZGVjcnlwdCBzaG91ZGwgZmFpbFwiXG4gIGNhdGNoXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW1tZXRyaWNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/asymmetric-encryption.coffee
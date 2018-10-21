"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _amen = require("amen");

var _index = require("../../../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Signature;

Signature = async function () {
  var A, B, blob, isSignedMessage, key, keyPair, message, nacl, output, privateKey, publicKey, sign, signedMsg, verify;
  ({
    sign,
    verify,
    key,
    keyPair,
    isSignedMessage,
    nacl
  } = (0, _index.confidential)()); // Test Key Pair Generation

  A = ({
    privateKey,
    publicKey
  } = await keyPair.signature());
  (0, _assert.default)(privateKey && key.isPrivate(privateKey), "must make private key");
  (0, _assert.default)(publicKey && key.isPublic(publicKey), "must make public key");
  (0, _assert.default)(privateKey.key.length === nacl.sign.secretKeyLength, "private key is improper length");
  (0, _assert.default)(publicKey.key.length === nacl.sign.publicKeyLength, "public key is improper length"); // Test Encrypt - Decrypt Cycle

  B = await keyPair.signature();
  message = "Hello World!"; //# Case 1
  //###############################
  // Person A signs a message.

  signedMsg = sign(A.privateKey, A.publicKey, message);
  (0, _assert.default)(signedMsg && isSignedMessage(signedMsg), "bad signature");
  (0, _assert.default)(signedMsg.encodeMessage() === message, "message must be the same"); // Person B uses A's public key to verify and open the message.

  output = verify(signedMsg);
  (0, _assert.default)(output === true, "failed to verify");
  (0, _assert.default)(key.equal(signedMsg.publicKeys[0], A.publicKey), "public key is wrong"); //# Case 2
  //###############################
  // Person A and B sign a message with key pairs.

  signedMsg = sign(A, message);
  signedMsg = sign(B, signedMsg);
  (0, _assert.default)(signedMsg && isSignedMessage(signedMsg), "bad signature");
  (0, _assert.default)(signedMsg.encodeMessage() === message, "message must be the same"); // Person C verifies the message from both.

  output = verify(signedMsg);
  (0, _assert.default)(output === true, "failed to verify");
  (0, _assert.default)(key.equal(signedMsg.publicKeys[0], A.publicKey), "public key is wrong");
  (0, _assert.default)(key.equal(signedMsg.publicKeys[1], B.publicKey), "public key is wrong"); //# Case 3
  //###############################
  // Person D recieves a base64 encoded blob of the signed message and verifies.

  blob = signedMsg.encode();
  output = verify(blob);
  return (0, _assert.default)(output === true, "failed to verify");
};

var _default = Signature;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL3JlZ3VsYXIvc2lnbmF0dXJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFGQSxJQUFBLFNBQUE7O0FBSUEsU0FBQSxHQUFZLGtCQUFBO0FBQ1YsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxlQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxTQUFBLEVBQUEsTUFBQTtBQUFBLEdBQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLEdBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLGVBQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQSxFQURVLEM7O0FBSVYsRUFBQSxDQUFBLElBQUk7QUFBQSxJQUFBLFVBQUE7QUFBQSxJQUFBO0FBQUEsTUFBMEIsTUFBTSxPQUFPLENBQXZDLFNBQWdDLEVBQXBDLENBQUE7QUFDQSx1QkFBUSxVQUFBLElBQWMsR0FBRyxDQUFILFNBQUEsQ0FBdEIsVUFBc0IsQ0FBdEIsRUFBQSx1QkFBQTtBQUNBLHVCQUFRLFNBQUEsSUFBYSxHQUFHLENBQUgsUUFBQSxDQUFyQixTQUFxQixDQUFyQixFQUFBLHNCQUFBO0FBQ0EsdUJBQU8sVUFBVSxDQUFDLEdBQVgsQ0FBQSxNQUFBLEtBQXlCLElBQUksQ0FBQyxJQUFMLENBQWhDLGVBQUEsRUFBQSxnQ0FBQTtBQUVBLHVCQUFPLFNBQVMsQ0FBQyxHQUFWLENBQUEsTUFBQSxLQUF3QixJQUFJLENBQUMsSUFBTCxDQUEvQixlQUFBLEVBUkEsK0JBUUEsRUFUVSxDOztBQWNWLEVBQUEsQ0FBQSxHQUFJLE1BQU0sT0FBTyxDQUFiLFNBQU0sRUFBVjtBQUNBLEVBQUEsT0FBQSxHQWRBLGNBY0EsQ0FmVSxDOzs7O0FBb0JWLEVBQUEsU0FBQSxHQUFZLElBQUEsQ0FBSyxDQUFDLENBQU4sVUFBQSxFQUFtQixDQUFDLENBQXBCLFNBQUEsRUFBQSxPQUFBLENBQVo7QUFDQSx1QkFBUSxTQUFBLElBQWEsZUFBQSxDQUFyQixTQUFxQixDQUFyQixFQUFBLGVBQUE7QUFDQSx1QkFBTyxTQUFTLENBQVQsYUFBQSxPQUFQLE9BQUEsRUFyQkEsMEJBcUJBLEVBdEJVLEM7O0FBeUJWLEVBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBQSxTQUFBLENBQVQ7QUFDQSx1QkFBTyxNQUFBLEtBQVAsSUFBQSxFQUFBLGtCQUFBO0FBQ0EsdUJBQU8sR0FBRyxDQUFILEtBQUEsQ0FBVSxTQUFTLENBQUMsVUFBVixDQUFWLENBQVUsQ0FBVixFQUFtQyxDQUFDLENBQTNDLFNBQU8sQ0FBUCxFQTFCQSxxQkEwQkEsRUEzQlUsQzs7OztBQWlDVixFQUFBLFNBQUEsR0FBWSxJQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBWjtBQUNBLEVBQUEsU0FBQSxHQUFZLElBQUEsQ0FBQSxDQUFBLEVBQUEsU0FBQSxDQUFaO0FBQ0EsdUJBQVEsU0FBQSxJQUFhLGVBQUEsQ0FBckIsU0FBcUIsQ0FBckIsRUFBQSxlQUFBO0FBQ0EsdUJBQU8sU0FBUyxDQUFULGFBQUEsT0FBUCxPQUFBLEVBbkNBLDBCQW1DQSxFQXBDVSxDOztBQXVDVixFQUFBLE1BQUEsR0FBUyxNQUFBLENBQUEsU0FBQSxDQUFUO0FBQ0EsdUJBQU8sTUFBQSxLQUFQLElBQUEsRUFBQSxrQkFBQTtBQUNBLHVCQUFPLEdBQUcsQ0FBSCxLQUFBLENBQVUsU0FBUyxDQUFDLFVBQVYsQ0FBVixDQUFVLENBQVYsRUFBbUMsQ0FBQyxDQUEzQyxTQUFPLENBQVAsRUFBQSxxQkFBQTtBQUNBLHVCQUFPLEdBQUcsQ0FBSCxLQUFBLENBQVUsU0FBUyxDQUFDLFVBQVYsQ0FBVixDQUFVLENBQVYsRUFBbUMsQ0FBQyxDQUEzQyxTQUFPLENBQVAsRUF6Q0EscUJBeUNBLEVBMUNVLEM7Ozs7QUErQ1YsRUFBQSxJQUFBLEdBQU8sU0FBUyxDQUFULE1BQUEsRUFBUDtBQUNBLEVBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBQSxJQUFBLENBQVQ7U0FDQSxxQkFBTyxNQUFBLEtBQVAsSUFBQSxFQUFBLGtCQUFBLEM7QUFqRFUsQ0FBWjs7ZUFtRGUsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge3Rlc3QsIHByaW50fSBmcm9tIFwiYW1lblwiXG5pbXBvcnQge2NvbmZpZGVudGlhbH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9pbmRleFwiXG5cblNpZ25hdHVyZSA9IC0+XG4gIHtzaWduLCB2ZXJpZnksIGtleSwga2V5UGFpciwgaXNTaWduZWRNZXNzYWdlLCBuYWNsfSA9IGNvbmZpZGVudGlhbCgpXG5cbiAgIyBUZXN0IEtleSBQYWlyIEdlbmVyYXRpb25cbiAgQSA9IHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9ID0gYXdhaXQga2V5UGFpci5zaWduYXR1cmUoKVxuICBhc3NlcnQgKHByaXZhdGVLZXkgJiYga2V5LmlzUHJpdmF0ZSBwcml2YXRlS2V5KSwgXCJtdXN0IG1ha2UgcHJpdmF0ZSBrZXlcIlxuICBhc3NlcnQgKHB1YmxpY0tleSAmJiBrZXkuaXNQdWJsaWMgcHVibGljS2V5KSwgXCJtdXN0IG1ha2UgcHVibGljIGtleVwiXG4gIGFzc2VydCBwcml2YXRlS2V5LmtleS5sZW5ndGggPT0gbmFjbC5zaWduLnNlY3JldEtleUxlbmd0aCxcbiAgICBcInByaXZhdGUga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG4gIGFzc2VydCBwdWJsaWNLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLnNpZ24ucHVibGljS2V5TGVuZ3RoLFxuICAgIFwicHVibGljIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuXG5cbiAgIyBUZXN0IEVuY3J5cHQgLSBEZWNyeXB0IEN5Y2xlXG4gIEIgPSBhd2FpdCBrZXlQYWlyLnNpZ25hdHVyZSgpXG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG5cbiAgIyMgQ2FzZSAxXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEEgc2lnbnMgYSBtZXNzYWdlLlxuICBzaWduZWRNc2cgPSBzaWduIEEucHJpdmF0ZUtleSwgQS5wdWJsaWNLZXksIG1lc3NhZ2VcbiAgYXNzZXJ0IChzaWduZWRNc2cgJiYgaXNTaWduZWRNZXNzYWdlIHNpZ25lZE1zZyksIFwiYmFkIHNpZ25hdHVyZVwiXG4gIGFzc2VydCBzaWduZWRNc2cuZW5jb2RlTWVzc2FnZSgpID09IG1lc3NhZ2UsIFwibWVzc2FnZSBtdXN0IGJlIHRoZSBzYW1lXCJcblxuICAjIFBlcnNvbiBCIHVzZXMgQSdzIHB1YmxpYyBrZXkgdG8gdmVyaWZ5IGFuZCBvcGVuIHRoZSBtZXNzYWdlLlxuICBvdXRwdXQgPSB2ZXJpZnkgc2lnbmVkTXNnXG4gIGFzc2VydCBvdXRwdXQgPT0gdHJ1ZSwgXCJmYWlsZWQgdG8gdmVyaWZ5XCJcbiAgYXNzZXJ0IGtleS5lcXVhbChzaWduZWRNc2cucHVibGljS2V5c1swXSwgQS5wdWJsaWNLZXkpLCBcInB1YmxpYyBrZXkgaXMgd3JvbmdcIlxuXG5cbiAgIyMgQ2FzZSAyXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEEgYW5kIEIgc2lnbiBhIG1lc3NhZ2Ugd2l0aCBrZXkgcGFpcnMuXG4gIHNpZ25lZE1zZyA9IHNpZ24gQSwgbWVzc2FnZVxuICBzaWduZWRNc2cgPSBzaWduIEIsIHNpZ25lZE1zZ1xuICBhc3NlcnQgKHNpZ25lZE1zZyAmJiBpc1NpZ25lZE1lc3NhZ2Ugc2lnbmVkTXNnKSwgXCJiYWQgc2lnbmF0dXJlXCJcbiAgYXNzZXJ0IHNpZ25lZE1zZy5lbmNvZGVNZXNzYWdlKCkgPT0gbWVzc2FnZSwgXCJtZXNzYWdlIG11c3QgYmUgdGhlIHNhbWVcIlxuXG4gICMgUGVyc29uIEMgdmVyaWZpZXMgdGhlIG1lc3NhZ2UgZnJvbSBib3RoLlxuICBvdXRwdXQgPSB2ZXJpZnkgc2lnbmVkTXNnXG4gIGFzc2VydCBvdXRwdXQgPT0gdHJ1ZSwgXCJmYWlsZWQgdG8gdmVyaWZ5XCJcbiAgYXNzZXJ0IGtleS5lcXVhbChzaWduZWRNc2cucHVibGljS2V5c1swXSwgQS5wdWJsaWNLZXkpLCBcInB1YmxpYyBrZXkgaXMgd3JvbmdcIlxuICBhc3NlcnQga2V5LmVxdWFsKHNpZ25lZE1zZy5wdWJsaWNLZXlzWzFdLCBCLnB1YmxpY0tleSksIFwicHVibGljIGtleSBpcyB3cm9uZ1wiXG5cbiAgIyMgQ2FzZSAzXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEQgcmVjaWV2ZXMgYSBiYXNlNjQgZW5jb2RlZCBibG9iIG9mIHRoZSBzaWduZWQgbWVzc2FnZSBhbmQgdmVyaWZpZXMuXG4gIGJsb2IgPSBzaWduZWRNc2cuZW5jb2RlKClcbiAgb3V0cHV0ID0gdmVyaWZ5IGJsb2JcbiAgYXNzZXJ0IG91dHB1dCA9PSB0cnVlLCBcImZhaWxlZCB0byB2ZXJpZnlcIlxuXG5leHBvcnQgZGVmYXVsdCBTaWduYXR1cmVcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/regular/signature.coffee
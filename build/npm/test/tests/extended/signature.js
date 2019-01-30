"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Signature;

Signature = function ({
  sign,
  verify,
  key,
  keyPair,
  isSignedMessage,
  nacl
}) {
  return async function () {
    var A, B, blob, message, output, privateKey, publicKey, signedMsg; // Test Key Pair Generation

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
    (0, _assert.default)(signedMsg.encodeMessage() === message, "message must be the same");
    (0, _assert.default)(key.equal(signedMsg.publicKeys[0], A.publicKey), "public key is wrong");
    (0, _assert.default)(key.equal(signedMsg.publicKeys[1], B.publicKey), "public key is wrong"); // Person C verifies the message from both.

    output = verify(signedMsg);
    (0, _assert.default)(output === true, "failed to verify"); //# Case 3
    //###############################
    // Person D recieves a base64 encoded blob of the signed message and verifies.

    blob = signedMsg.encode();
    output = verify(blob);
    return (0, _assert.default)(output === true, "failed to verify");
  };
};

var _default = Signature;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9zaWduYXR1cmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUFBLElBQUEsU0FBQTs7QUFFQSxTQUFBLEdBQVksVUFBQztBQUFBLEVBQUEsSUFBQTtBQUFBLEVBQUEsTUFBQTtBQUFBLEVBQUEsR0FBQTtBQUFBLEVBQUEsT0FBQTtBQUFBLEVBQUEsZUFBQTtBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7U0FBeUQsa0JBQUE7QUFFbkUsUUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxDQUZtRSxDOztBQUVuRSxJQUFBLENBQUEsSUFBSTtBQUFBLE1BQUEsVUFBQTtBQUFBLE1BQUE7QUFBQSxRQUEwQixNQUFNLE9BQU8sQ0FBdkMsU0FBZ0MsRUFBcEMsQ0FBQTtBQUNBLHlCQUFRLFVBQUEsSUFBYyxHQUFHLENBQUgsU0FBQSxDQUF0QixVQUFzQixDQUF0QixFQUFBLHVCQUFBO0FBQ0EseUJBQVEsU0FBQSxJQUFhLEdBQUcsQ0FBSCxRQUFBLENBQXJCLFNBQXFCLENBQXJCLEVBQUEsc0JBQUE7QUFDQSx5QkFBTyxVQUFVLENBQUMsR0FBWCxDQUFBLE1BQUEsS0FBeUIsSUFBSSxDQUFDLElBQUwsQ0FBaEMsZUFBQSxFQUFBLGdDQUFBO0FBRUEseUJBQU8sU0FBUyxDQUFDLEdBQVYsQ0FBQSxNQUFBLEtBQXdCLElBQUksQ0FBQyxJQUFMLENBQS9CLGVBQUEsRUFMQSwrQkFLQSxFQVBtRSxDOztBQVluRSxJQUFBLENBQUEsR0FBSSxNQUFNLE9BQU8sQ0FBYixTQUFNLEVBQVY7QUFDQSxJQUFBLE9BQUEsR0FYQSxjQVdBLENBYm1FLEM7Ozs7QUFrQm5FLElBQUEsU0FBQSxHQUFZLElBQUEsQ0FBSyxDQUFDLENBQU4sVUFBQSxFQUFtQixDQUFDLENBQXBCLFNBQUEsRUFBQSxPQUFBLENBQVo7QUFDQSx5QkFBUSxTQUFBLElBQWEsZUFBQSxDQUFyQixTQUFxQixDQUFyQixFQUFBLGVBQUE7QUFDQSx5QkFBTyxTQUFTLENBQVQsYUFBQSxPQUFQLE9BQUEsRUFsQkEsMEJBa0JBLEVBcEJtRSxDOztBQXVCbkUsSUFBQSxNQUFBLEdBQVMsTUFBQSxDQUFBLFNBQUEsQ0FBVDtBQUNBLHlCQUFPLE1BQUEsS0FBUCxJQUFBLEVBQUEsa0JBQUE7QUFDQSx5QkFBTyxHQUFHLENBQUgsS0FBQSxDQUFVLFNBQVMsQ0FBQyxVQUFWLENBQVYsQ0FBVSxDQUFWLEVBQW1DLENBQUMsQ0FBM0MsU0FBTyxDQUFQLEVBdkJBLHFCQXVCQSxFQXpCbUUsQzs7OztBQThCbkUsSUFBQSxTQUFBLEdBQVksSUFBQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQVo7QUFDQSxJQUFBLFNBQUEsR0FBWSxJQUFBLENBQUEsQ0FBQSxFQUFBLFNBQUEsQ0FBWjtBQUNBLHlCQUFRLFNBQUEsSUFBYSxlQUFBLENBQXJCLFNBQXFCLENBQXJCLEVBQUEsZUFBQTtBQUNBLHlCQUFPLFNBQVMsQ0FBVCxhQUFBLE9BQVAsT0FBQSxFQUFBLDBCQUFBO0FBQ0EseUJBQU8sR0FBRyxDQUFILEtBQUEsQ0FBVSxTQUFTLENBQUMsVUFBVixDQUFWLENBQVUsQ0FBVixFQUFtQyxDQUFDLENBQTNDLFNBQU8sQ0FBUCxFQUFBLHFCQUFBO0FBQ0EseUJBQU8sR0FBRyxDQUFILEtBQUEsQ0FBVSxTQUFTLENBQUMsVUFBVixDQUFWLENBQVUsQ0FBVixFQUFtQyxDQUFDLENBQTNDLFNBQU8sQ0FBUCxFQWpDQSxxQkFpQ0EsRUFuQ21FLEM7O0FBc0NuRSxJQUFBLE1BQUEsR0FBUyxNQUFBLENBQUEsU0FBQSxDQUFUO0FBQ0EseUJBQU8sTUFBQSxLQUFQLElBQUEsRUFyQ0Esa0JBcUNBLEVBdkNtRSxDOzs7O0FBNENuRSxJQUFBLElBQUEsR0FBTyxTQUFTLENBQVQsTUFBQSxFQUFQO0FBQ0EsSUFBQSxNQUFBLEdBQVMsTUFBQSxDQUFBLElBQUEsQ0FBVDtXQUNBLHFCQUFPLE1BQUEsS0FBUCxJQUFBLEVBQUEsa0JBQUEsQztBQTlDbUUsRztBQUF6RCxDQUFaOztlQWdEZSxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcblxuU2lnbmF0dXJlID0gKHtzaWduLCB2ZXJpZnksIGtleSwga2V5UGFpciwgaXNTaWduZWRNZXNzYWdlLCBuYWNsfSkgLT4gLT5cbiAgIyBUZXN0IEtleSBQYWlyIEdlbmVyYXRpb25cbiAgQSA9IHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9ID0gYXdhaXQga2V5UGFpci5zaWduYXR1cmUoKVxuICBhc3NlcnQgKHByaXZhdGVLZXkgJiYga2V5LmlzUHJpdmF0ZSBwcml2YXRlS2V5KSwgXCJtdXN0IG1ha2UgcHJpdmF0ZSBrZXlcIlxuICBhc3NlcnQgKHB1YmxpY0tleSAmJiBrZXkuaXNQdWJsaWMgcHVibGljS2V5KSwgXCJtdXN0IG1ha2UgcHVibGljIGtleVwiXG4gIGFzc2VydCBwcml2YXRlS2V5LmtleS5sZW5ndGggPT0gbmFjbC5zaWduLnNlY3JldEtleUxlbmd0aCxcbiAgICBcInByaXZhdGUga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG4gIGFzc2VydCBwdWJsaWNLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLnNpZ24ucHVibGljS2V5TGVuZ3RoLFxuICAgIFwicHVibGljIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuXG5cbiAgIyBUZXN0IEVuY3J5cHQgLSBEZWNyeXB0IEN5Y2xlXG4gIEIgPSBhd2FpdCBrZXlQYWlyLnNpZ25hdHVyZSgpXG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG5cbiAgIyMgQ2FzZSAxXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEEgc2lnbnMgYSBtZXNzYWdlLlxuICBzaWduZWRNc2cgPSBzaWduIEEucHJpdmF0ZUtleSwgQS5wdWJsaWNLZXksIG1lc3NhZ2VcbiAgYXNzZXJ0IChzaWduZWRNc2cgJiYgaXNTaWduZWRNZXNzYWdlIHNpZ25lZE1zZyksIFwiYmFkIHNpZ25hdHVyZVwiXG4gIGFzc2VydCBzaWduZWRNc2cuZW5jb2RlTWVzc2FnZSgpID09IG1lc3NhZ2UsIFwibWVzc2FnZSBtdXN0IGJlIHRoZSBzYW1lXCJcblxuICAjIFBlcnNvbiBCIHVzZXMgQSdzIHB1YmxpYyBrZXkgdG8gdmVyaWZ5IGFuZCBvcGVuIHRoZSBtZXNzYWdlLlxuICBvdXRwdXQgPSB2ZXJpZnkgc2lnbmVkTXNnXG4gIGFzc2VydCBvdXRwdXQgPT0gdHJ1ZSwgXCJmYWlsZWQgdG8gdmVyaWZ5XCJcbiAgYXNzZXJ0IGtleS5lcXVhbChzaWduZWRNc2cucHVibGljS2V5c1swXSwgQS5wdWJsaWNLZXkpLCBcInB1YmxpYyBrZXkgaXMgd3JvbmdcIlxuXG4gICMjIENhc2UgMlxuICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAjIFBlcnNvbiBBIGFuZCBCIHNpZ24gYSBtZXNzYWdlIHdpdGgga2V5IHBhaXJzLlxuICBzaWduZWRNc2cgPSBzaWduIEEsIG1lc3NhZ2VcbiAgc2lnbmVkTXNnID0gc2lnbiBCLCBzaWduZWRNc2dcbiAgYXNzZXJ0IChzaWduZWRNc2cgJiYgaXNTaWduZWRNZXNzYWdlIHNpZ25lZE1zZyksIFwiYmFkIHNpZ25hdHVyZVwiXG4gIGFzc2VydCBzaWduZWRNc2cuZW5jb2RlTWVzc2FnZSgpID09IG1lc3NhZ2UsIFwibWVzc2FnZSBtdXN0IGJlIHRoZSBzYW1lXCJcbiAgYXNzZXJ0IGtleS5lcXVhbChzaWduZWRNc2cucHVibGljS2V5c1swXSwgQS5wdWJsaWNLZXkpLCBcInB1YmxpYyBrZXkgaXMgd3JvbmdcIlxuICBhc3NlcnQga2V5LmVxdWFsKHNpZ25lZE1zZy5wdWJsaWNLZXlzWzFdLCBCLnB1YmxpY0tleSksIFwicHVibGljIGtleSBpcyB3cm9uZ1wiXG5cbiAgIyBQZXJzb24gQyB2ZXJpZmllcyB0aGUgbWVzc2FnZSBmcm9tIGJvdGguXG4gIG91dHB1dCA9IHZlcmlmeSBzaWduZWRNc2dcbiAgYXNzZXJ0IG91dHB1dCA9PSB0cnVlLCBcImZhaWxlZCB0byB2ZXJpZnlcIlxuXG4gICMjIENhc2UgM1xuICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAjIFBlcnNvbiBEIHJlY2lldmVzIGEgYmFzZTY0IGVuY29kZWQgYmxvYiBvZiB0aGUgc2lnbmVkIG1lc3NhZ2UgYW5kIHZlcmlmaWVzLlxuICBibG9iID0gc2lnbmVkTXNnLmVuY29kZSgpXG4gIG91dHB1dCA9IHZlcmlmeSBibG9iXG4gIGFzc2VydCBvdXRwdXQgPT0gdHJ1ZSwgXCJmYWlsZWQgdG8gdmVyaWZ5XCJcblxuZXhwb3J0IGRlZmF1bHQgU2lnbmF0dXJlXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/signature.coffee
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQvc2lnbmF0dXJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFBQSxJQUFBLFNBQUE7O0FBRUEsU0FBQSxHQUFZLFVBQUM7QUFBQSxFQUFBLElBQUE7QUFBQSxFQUFBLE1BQUE7QUFBQSxFQUFBLEdBQUE7QUFBQSxFQUFBLE9BQUE7QUFBQSxFQUFBLGVBQUE7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO1NBQXlELGtCQUFBO0FBRW5FLFFBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxVQUFBLEVBQUEsU0FBQSxFQUFBLFNBQUEsQ0FGbUUsQzs7QUFFbkUsSUFBQSxDQUFBLElBQUk7QUFBQSxNQUFBLFVBQUE7QUFBQSxNQUFBO0FBQUEsUUFBMEIsTUFBTSxPQUFPLENBQXZDLFNBQWdDLEVBQXBDLENBQUE7QUFDQSx5QkFBUSxVQUFBLElBQWMsR0FBRyxDQUFILFNBQUEsQ0FBdEIsVUFBc0IsQ0FBdEIsRUFBQSx1QkFBQTtBQUNBLHlCQUFRLFNBQUEsSUFBYSxHQUFHLENBQUgsUUFBQSxDQUFyQixTQUFxQixDQUFyQixFQUFBLHNCQUFBO0FBQ0EseUJBQU8sVUFBVSxDQUFDLEdBQVgsQ0FBQSxNQUFBLEtBQXlCLElBQUksQ0FBQyxJQUFMLENBQWhDLGVBQUEsRUFBQSxnQ0FBQTtBQUVBLHlCQUFPLFNBQVMsQ0FBQyxHQUFWLENBQUEsTUFBQSxLQUF3QixJQUFJLENBQUMsSUFBTCxDQUEvQixlQUFBLEVBTEEsK0JBS0EsRUFQbUUsQzs7QUFZbkUsSUFBQSxDQUFBLEdBQUksTUFBTSxPQUFPLENBQWIsU0FBTSxFQUFWO0FBQ0EsSUFBQSxPQUFBLEdBWEEsY0FXQSxDQWJtRSxDOzs7O0FBa0JuRSxJQUFBLFNBQUEsR0FBWSxJQUFBLENBQUssQ0FBQyxDQUFOLFVBQUEsRUFBbUIsQ0FBQyxDQUFwQixTQUFBLEVBQUEsT0FBQSxDQUFaO0FBQ0EseUJBQVEsU0FBQSxJQUFhLGVBQUEsQ0FBckIsU0FBcUIsQ0FBckIsRUFBQSxlQUFBO0FBQ0EseUJBQU8sU0FBUyxDQUFULGFBQUEsT0FBUCxPQUFBLEVBbEJBLDBCQWtCQSxFQXBCbUUsQzs7QUF1Qm5FLElBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBQSxTQUFBLENBQVQ7QUFDQSx5QkFBTyxNQUFBLEtBQVAsSUFBQSxFQUFBLGtCQUFBO0FBQ0EseUJBQU8sR0FBRyxDQUFILEtBQUEsQ0FBVSxTQUFTLENBQUMsVUFBVixDQUFWLENBQVUsQ0FBVixFQUFtQyxDQUFDLENBQTNDLFNBQU8sQ0FBUCxFQXZCQSxxQkF1QkEsRUF6Qm1FLEM7Ozs7QUE4Qm5FLElBQUEsU0FBQSxHQUFZLElBQUEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFaO0FBQ0EsSUFBQSxTQUFBLEdBQVksSUFBQSxDQUFBLENBQUEsRUFBQSxTQUFBLENBQVo7QUFDQSx5QkFBUSxTQUFBLElBQWEsZUFBQSxDQUFyQixTQUFxQixDQUFyQixFQUFBLGVBQUE7QUFDQSx5QkFBTyxTQUFTLENBQVQsYUFBQSxPQUFQLE9BQUEsRUFBQSwwQkFBQTtBQUNBLHlCQUFPLEdBQUcsQ0FBSCxLQUFBLENBQVUsU0FBUyxDQUFDLFVBQVYsQ0FBVixDQUFVLENBQVYsRUFBbUMsQ0FBQyxDQUEzQyxTQUFPLENBQVAsRUFBQSxxQkFBQTtBQUNBLHlCQUFPLEdBQUcsQ0FBSCxLQUFBLENBQVUsU0FBUyxDQUFDLFVBQVYsQ0FBVixDQUFVLENBQVYsRUFBbUMsQ0FBQyxDQUEzQyxTQUFPLENBQVAsRUFqQ0EscUJBaUNBLEVBbkNtRSxDOztBQXNDbkUsSUFBQSxNQUFBLEdBQVMsTUFBQSxDQUFBLFNBQUEsQ0FBVDtBQUNBLHlCQUFPLE1BQUEsS0FBUCxJQUFBLEVBckNBLGtCQXFDQSxFQXZDbUUsQzs7OztBQTRDbkUsSUFBQSxJQUFBLEdBQU8sU0FBUyxDQUFULE1BQUEsRUFBUDtBQUNBLElBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBQSxJQUFBLENBQVQ7V0FDQSxxQkFBTyxNQUFBLEtBQVAsSUFBQSxFQUFBLGtCQUFBLEM7QUE5Q21FLEc7QUFBekQsQ0FBWjs7ZUFnRGUsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5cblNpZ25hdHVyZSA9ICh7c2lnbiwgdmVyaWZ5LCBrZXksIGtleVBhaXIsIGlzU2lnbmVkTWVzc2FnZSwgbmFjbH0pIC0+IC0+XG4gICMgVGVzdCBLZXkgUGFpciBHZW5lcmF0aW9uXG4gIEEgPSB7cHJpdmF0ZUtleSwgcHVibGljS2V5fSA9IGF3YWl0IGtleVBhaXIuc2lnbmF0dXJlKClcbiAgYXNzZXJ0IChwcml2YXRlS2V5ICYmIGtleS5pc1ByaXZhdGUgcHJpdmF0ZUtleSksIFwibXVzdCBtYWtlIHByaXZhdGUga2V5XCJcbiAgYXNzZXJ0IChwdWJsaWNLZXkgJiYga2V5LmlzUHVibGljIHB1YmxpY0tleSksIFwibXVzdCBtYWtlIHB1YmxpYyBrZXlcIlxuICBhc3NlcnQgcHJpdmF0ZUtleS5rZXkubGVuZ3RoID09IG5hY2wuc2lnbi5zZWNyZXRLZXlMZW5ndGgsXG4gICAgXCJwcml2YXRlIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuICBhc3NlcnQgcHVibGljS2V5LmtleS5sZW5ndGggPT0gbmFjbC5zaWduLnB1YmxpY0tleUxlbmd0aCxcbiAgICBcInB1YmxpYyBrZXkgaXMgaW1wcm9wZXIgbGVuZ3RoXCJcblxuXG4gICMgVGVzdCBFbmNyeXB0IC0gRGVjcnlwdCBDeWNsZVxuICBCID0gYXdhaXQga2V5UGFpci5zaWduYXR1cmUoKVxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuXG4gICMjIENhc2UgMVxuICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAjIFBlcnNvbiBBIHNpZ25zIGEgbWVzc2FnZS5cbiAgc2lnbmVkTXNnID0gc2lnbiBBLnByaXZhdGVLZXksIEEucHVibGljS2V5LCBtZXNzYWdlXG4gIGFzc2VydCAoc2lnbmVkTXNnICYmIGlzU2lnbmVkTWVzc2FnZSBzaWduZWRNc2cpLCBcImJhZCBzaWduYXR1cmVcIlxuICBhc3NlcnQgc2lnbmVkTXNnLmVuY29kZU1lc3NhZ2UoKSA9PSBtZXNzYWdlLCBcIm1lc3NhZ2UgbXVzdCBiZSB0aGUgc2FtZVwiXG5cbiAgIyBQZXJzb24gQiB1c2VzIEEncyBwdWJsaWMga2V5IHRvIHZlcmlmeSBhbmQgb3BlbiB0aGUgbWVzc2FnZS5cbiAgb3V0cHV0ID0gdmVyaWZ5IHNpZ25lZE1zZ1xuICBhc3NlcnQgb3V0cHV0ID09IHRydWUsIFwiZmFpbGVkIHRvIHZlcmlmeVwiXG4gIGFzc2VydCBrZXkuZXF1YWwoc2lnbmVkTXNnLnB1YmxpY0tleXNbMF0sIEEucHVibGljS2V5KSwgXCJwdWJsaWMga2V5IGlzIHdyb25nXCJcblxuICAjIyBDYXNlIDJcbiAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgIyBQZXJzb24gQSBhbmQgQiBzaWduIGEgbWVzc2FnZSB3aXRoIGtleSBwYWlycy5cbiAgc2lnbmVkTXNnID0gc2lnbiBBLCBtZXNzYWdlXG4gIHNpZ25lZE1zZyA9IHNpZ24gQiwgc2lnbmVkTXNnXG4gIGFzc2VydCAoc2lnbmVkTXNnICYmIGlzU2lnbmVkTWVzc2FnZSBzaWduZWRNc2cpLCBcImJhZCBzaWduYXR1cmVcIlxuICBhc3NlcnQgc2lnbmVkTXNnLmVuY29kZU1lc3NhZ2UoKSA9PSBtZXNzYWdlLCBcIm1lc3NhZ2UgbXVzdCBiZSB0aGUgc2FtZVwiXG4gIGFzc2VydCBrZXkuZXF1YWwoc2lnbmVkTXNnLnB1YmxpY0tleXNbMF0sIEEucHVibGljS2V5KSwgXCJwdWJsaWMga2V5IGlzIHdyb25nXCJcbiAgYXNzZXJ0IGtleS5lcXVhbChzaWduZWRNc2cucHVibGljS2V5c1sxXSwgQi5wdWJsaWNLZXkpLCBcInB1YmxpYyBrZXkgaXMgd3JvbmdcIlxuXG4gICMgUGVyc29uIEMgdmVyaWZpZXMgdGhlIG1lc3NhZ2UgZnJvbSBib3RoLlxuICBvdXRwdXQgPSB2ZXJpZnkgc2lnbmVkTXNnXG4gIGFzc2VydCBvdXRwdXQgPT0gdHJ1ZSwgXCJmYWlsZWQgdG8gdmVyaWZ5XCJcblxuICAjIyBDYXNlIDNcbiAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgIyBQZXJzb24gRCByZWNpZXZlcyBhIGJhc2U2NCBlbmNvZGVkIGJsb2Igb2YgdGhlIHNpZ25lZCBtZXNzYWdlIGFuZCB2ZXJpZmllcy5cbiAgYmxvYiA9IHNpZ25lZE1zZy5lbmNvZGUoKVxuICBvdXRwdXQgPSB2ZXJpZnkgYmxvYlxuICBhc3NlcnQgb3V0cHV0ID09IHRydWUsIFwiZmFpbGVkIHRvIHZlcmlmeVwiXG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hdHVyZVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/signature.coffee
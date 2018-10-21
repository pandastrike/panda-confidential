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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL3NpZ25hdHVyZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQUEsSUFBQSxTQUFBOztBQUVBLFNBQUEsR0FBWSxVQUFDO0FBQUEsRUFBQSxJQUFBO0FBQUEsRUFBQSxNQUFBO0FBQUEsRUFBQSxHQUFBO0FBQUEsRUFBQSxPQUFBO0FBQUEsRUFBQSxlQUFBO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtTQUF5RCxrQkFBQTtBQUVuRSxRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLFNBQUEsRUFBQSxTQUFBLENBRm1FLEM7O0FBRW5FLElBQUEsQ0FBQSxJQUFJO0FBQUEsTUFBQSxVQUFBO0FBQUEsTUFBQTtBQUFBLFFBQTBCLE1BQU0sT0FBTyxDQUF2QyxTQUFnQyxFQUFwQyxDQUFBO0FBQ0EseUJBQVEsVUFBQSxJQUFjLEdBQUcsQ0FBSCxTQUFBLENBQXRCLFVBQXNCLENBQXRCLEVBQUEsdUJBQUE7QUFDQSx5QkFBUSxTQUFBLElBQWEsR0FBRyxDQUFILFFBQUEsQ0FBckIsU0FBcUIsQ0FBckIsRUFBQSxzQkFBQTtBQUNBLHlCQUFPLFVBQVUsQ0FBQyxHQUFYLENBQUEsTUFBQSxLQUF5QixJQUFJLENBQUMsSUFBTCxDQUFoQyxlQUFBLEVBQUEsZ0NBQUE7QUFFQSx5QkFBTyxTQUFTLENBQUMsR0FBVixDQUFBLE1BQUEsS0FBd0IsSUFBSSxDQUFDLElBQUwsQ0FBL0IsZUFBQSxFQUxBLCtCQUtBLEVBUG1FLEM7O0FBWW5FLElBQUEsQ0FBQSxHQUFJLE1BQU0sT0FBTyxDQUFiLFNBQU0sRUFBVjtBQUNBLElBQUEsT0FBQSxHQVhBLGNBV0EsQ0FibUUsQzs7OztBQWtCbkUsSUFBQSxTQUFBLEdBQVksSUFBQSxDQUFLLENBQUMsQ0FBTixVQUFBLEVBQW1CLENBQUMsQ0FBcEIsU0FBQSxFQUFBLE9BQUEsQ0FBWjtBQUNBLHlCQUFRLFNBQUEsSUFBYSxlQUFBLENBQXJCLFNBQXFCLENBQXJCLEVBQUEsZUFBQTtBQUNBLHlCQUFPLFNBQVMsQ0FBVCxhQUFBLE9BQVAsT0FBQSxFQWxCQSwwQkFrQkEsRUFwQm1FLEM7O0FBdUJuRSxJQUFBLE1BQUEsR0FBUyxNQUFBLENBQUEsU0FBQSxDQUFUO0FBQ0EseUJBQU8sTUFBQSxLQUFQLElBQUEsRUFBQSxrQkFBQTtBQUNBLHlCQUFPLEdBQUcsQ0FBSCxLQUFBLENBQVUsU0FBUyxDQUFDLFVBQVYsQ0FBVixDQUFVLENBQVYsRUFBbUMsQ0FBQyxDQUEzQyxTQUFPLENBQVAsRUF2QkEscUJBdUJBLEVBekJtRSxDOzs7O0FBOEJuRSxJQUFBLFNBQUEsR0FBWSxJQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBWjtBQUNBLElBQUEsU0FBQSxHQUFZLElBQUEsQ0FBQSxDQUFBLEVBQUEsU0FBQSxDQUFaO0FBQ0EseUJBQVEsU0FBQSxJQUFhLGVBQUEsQ0FBckIsU0FBcUIsQ0FBckIsRUFBQSxlQUFBO0FBQ0EseUJBQU8sU0FBUyxDQUFULGFBQUEsT0FBUCxPQUFBLEVBQUEsMEJBQUE7QUFDQSx5QkFBTyxHQUFHLENBQUgsS0FBQSxDQUFVLFNBQVMsQ0FBQyxVQUFWLENBQVYsQ0FBVSxDQUFWLEVBQW1DLENBQUMsQ0FBM0MsU0FBTyxDQUFQLEVBQUEscUJBQUE7QUFDQSx5QkFBTyxHQUFHLENBQUgsS0FBQSxDQUFVLFNBQVMsQ0FBQyxVQUFWLENBQVYsQ0FBVSxDQUFWLEVBQW1DLENBQUMsQ0FBM0MsU0FBTyxDQUFQLEVBakNBLHFCQWlDQSxFQW5DbUUsQzs7QUFzQ25FLElBQUEsTUFBQSxHQUFTLE1BQUEsQ0FBQSxTQUFBLENBQVQ7QUFDQSx5QkFBTyxNQUFBLEtBQVAsSUFBQSxFQXJDQSxrQkFxQ0EsRUF2Q21FLEM7Ozs7QUE0Q25FLElBQUEsSUFBQSxHQUFPLFNBQVMsQ0FBVCxNQUFBLEVBQVA7QUFDQSxJQUFBLE1BQUEsR0FBUyxNQUFBLENBQUEsSUFBQSxDQUFUO1dBQ0EscUJBQU8sTUFBQSxLQUFQLElBQUEsRUFBQSxrQkFBQSxDO0FBOUNtRSxHO0FBQXpELENBQVo7O2VBZ0RlLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuXG5TaWduYXR1cmUgPSAoe3NpZ24sIHZlcmlmeSwga2V5LCBrZXlQYWlyLCBpc1NpZ25lZE1lc3NhZ2UsIG5hY2x9KSAtPiAtPlxuICAjIFRlc3QgS2V5IFBhaXIgR2VuZXJhdGlvblxuICBBID0ge3ByaXZhdGVLZXksIHB1YmxpY0tleX0gPSBhd2FpdCBrZXlQYWlyLnNpZ25hdHVyZSgpXG4gIGFzc2VydCAocHJpdmF0ZUtleSAmJiBrZXkuaXNQcml2YXRlIHByaXZhdGVLZXkpLCBcIm11c3QgbWFrZSBwcml2YXRlIGtleVwiXG4gIGFzc2VydCAocHVibGljS2V5ICYmIGtleS5pc1B1YmxpYyBwdWJsaWNLZXkpLCBcIm11c3QgbWFrZSBwdWJsaWMga2V5XCJcbiAgYXNzZXJ0IHByaXZhdGVLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLnNpZ24uc2VjcmV0S2V5TGVuZ3RoLFxuICAgIFwicHJpdmF0ZSBrZXkgaXMgaW1wcm9wZXIgbGVuZ3RoXCJcbiAgYXNzZXJ0IHB1YmxpY0tleS5rZXkubGVuZ3RoID09IG5hY2wuc2lnbi5wdWJsaWNLZXlMZW5ndGgsXG4gICAgXCJwdWJsaWMga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG5cblxuICAjIFRlc3QgRW5jcnlwdCAtIERlY3J5cHQgQ3ljbGVcbiAgQiA9IGF3YWl0IGtleVBhaXIuc2lnbmF0dXJlKClcbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcblxuICAjIyBDYXNlIDFcbiAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgIyBQZXJzb24gQSBzaWducyBhIG1lc3NhZ2UuXG4gIHNpZ25lZE1zZyA9IHNpZ24gQS5wcml2YXRlS2V5LCBBLnB1YmxpY0tleSwgbWVzc2FnZVxuICBhc3NlcnQgKHNpZ25lZE1zZyAmJiBpc1NpZ25lZE1lc3NhZ2Ugc2lnbmVkTXNnKSwgXCJiYWQgc2lnbmF0dXJlXCJcbiAgYXNzZXJ0IHNpZ25lZE1zZy5lbmNvZGVNZXNzYWdlKCkgPT0gbWVzc2FnZSwgXCJtZXNzYWdlIG11c3QgYmUgdGhlIHNhbWVcIlxuXG4gICMgUGVyc29uIEIgdXNlcyBBJ3MgcHVibGljIGtleSB0byB2ZXJpZnkgYW5kIG9wZW4gdGhlIG1lc3NhZ2UuXG4gIG91dHB1dCA9IHZlcmlmeSBzaWduZWRNc2dcbiAgYXNzZXJ0IG91dHB1dCA9PSB0cnVlLCBcImZhaWxlZCB0byB2ZXJpZnlcIlxuICBhc3NlcnQga2V5LmVxdWFsKHNpZ25lZE1zZy5wdWJsaWNLZXlzWzBdLCBBLnB1YmxpY0tleSksIFwicHVibGljIGtleSBpcyB3cm9uZ1wiXG5cbiAgIyMgQ2FzZSAyXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEEgYW5kIEIgc2lnbiBhIG1lc3NhZ2Ugd2l0aCBrZXkgcGFpcnMuXG4gIHNpZ25lZE1zZyA9IHNpZ24gQSwgbWVzc2FnZVxuICBzaWduZWRNc2cgPSBzaWduIEIsIHNpZ25lZE1zZ1xuICBhc3NlcnQgKHNpZ25lZE1zZyAmJiBpc1NpZ25lZE1lc3NhZ2Ugc2lnbmVkTXNnKSwgXCJiYWQgc2lnbmF0dXJlXCJcbiAgYXNzZXJ0IHNpZ25lZE1zZy5lbmNvZGVNZXNzYWdlKCkgPT0gbWVzc2FnZSwgXCJtZXNzYWdlIG11c3QgYmUgdGhlIHNhbWVcIlxuICBhc3NlcnQga2V5LmVxdWFsKHNpZ25lZE1zZy5wdWJsaWNLZXlzWzBdLCBBLnB1YmxpY0tleSksIFwicHVibGljIGtleSBpcyB3cm9uZ1wiXG4gIGFzc2VydCBrZXkuZXF1YWwoc2lnbmVkTXNnLnB1YmxpY0tleXNbMV0sIEIucHVibGljS2V5KSwgXCJwdWJsaWMga2V5IGlzIHdyb25nXCJcblxuICAjIFBlcnNvbiBDIHZlcmlmaWVzIHRoZSBtZXNzYWdlIGZyb20gYm90aC5cbiAgb3V0cHV0ID0gdmVyaWZ5IHNpZ25lZE1zZ1xuICBhc3NlcnQgb3V0cHV0ID09IHRydWUsIFwiZmFpbGVkIHRvIHZlcmlmeVwiXG5cbiAgIyMgQ2FzZSAzXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEQgcmVjaWV2ZXMgYSBiYXNlNjQgZW5jb2RlZCBibG9iIG9mIHRoZSBzaWduZWQgbWVzc2FnZSBhbmQgdmVyaWZpZXMuXG4gIGJsb2IgPSBzaWduZWRNc2cuZW5jb2RlKClcbiAgb3V0cHV0ID0gdmVyaWZ5IGJsb2JcbiAgYXNzZXJ0IG91dHB1dCA9PSB0cnVlLCBcImZhaWxlZCB0byB2ZXJpZnlcIlxuXG5leHBvcnQgZGVmYXVsdCBTaWduYXR1cmVcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/extended/signature.coffee
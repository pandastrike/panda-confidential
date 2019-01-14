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

var Signature;

Signature = async function () {
  var A, B, Declaration, Plaintext, PrivateKey, PublicKey, SignatureKeyPair, convert, declaration, message, plaintext, privateKey, publicKey, serialized, sign, verify;
  ({
    sign,
    verify,
    SignatureKeyPair,
    PrivateKey,
    PublicKey,
    Declaration,
    Plaintext,
    convert
  } = (0, _index.confidential)()); // Test Key Pair Generation

  A = ({
    privateKey,
    publicKey
  } = await SignatureKeyPair.create());
  (0, _assert.default)(PrivateKey.isType(privateKey), "bad private key");
  (0, _assert.default)(PublicKey.isType(publicKey), "bad public key");
  (0, _assert.default)(privateKey.key.length === _tweetnacl.default.sign.secretKeyLength, "private key is improper length");
  (0, _assert.default)(publicKey.key.length === _tweetnacl.default.sign.publicKeyLength, "public key is improper length"); // Test Encrypt - Decrypt Cycle

  B = await SignatureKeyPair.create();
  message = "Hello World!";
  plaintext = Plaintext.from("utf8", message);
  (0, _assert.default)(Plaintext.isType(plaintext), "bad plaintext"); //# Case 1
  //###############################
  // Person A signs a message.

  declaration = sign(A.privateKey, A.publicKey, plaintext);
  (0, _assert.default)(Declaration.isType(declaration), "bad declaration");

  _assert.default.equal(convert({
    from: "bytes",
    to: "utf8"
  }, declaration.data), message, "bad declaration: message must be intact");

  _assert.default.equal(convert({
    from: "bytes",
    to: "base64"
  }, declaration.signatories[0]), A.publicKey.to("base64"), "bad declaration: signatory's public key is incorrect");

  serialized = declaration.to("base64"); // Person B uses A's public key to verify and open the message.

  declaration = Declaration.from("base64", serialized);
  (0, _assert.default)(verify(declaration) === true, "failed to verify"); // Negative test.

  declaration.signatories = [B.publicKey.to("bytes")];
  (0, _assert.default)(verify(declaration) === false, "signature negative test failure"); //# Case 2
  //###############################
  // Person A and B sign a message with key pairs.

  declaration = sign(A, plaintext);
  sign(B, declaration);
  (0, _assert.default)(Declaration.isType(declaration), "bad declaration");

  _assert.default.equal(convert({
    from: "bytes",
    to: "utf8"
  }, declaration.data), message, "bad declaration: message must be intact");

  _assert.default.equal(convert({
    from: "bytes",
    to: "base64"
  }, declaration.signatories[0]), A.publicKey.to("base64"), "bad declaration: signatory A's public key is incorrect");

  _assert.default.equal(convert({
    from: "bytes",
    to: "base64"
  }, declaration.signatories[1]), B.publicKey.to("base64"), "bad declaration: signatory B's public key is incorrect");

  serialized = declaration.to("base64"); // Person C verifies the message from both.

  declaration = Declaration.from("base64", serialized);
  return (0, _assert.default)(verify(declaration) === true, "failed to verify");
};

var _default = Signature;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9zaWduYXR1cmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsU0FBQTs7QUFLQSxTQUFBLEdBQVksa0JBQUE7QUFDVixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsV0FBQSxFQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsU0FBQSxFQUFBLGdCQUFBLEVBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxPQUFBLEVBQUEsU0FBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxNQUFBO0FBQUEsR0FBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUEsTUFBQTtBQUFBLElBQUEsZ0JBQUE7QUFBQSxJQUFBLFVBQUE7QUFBQSxJQUFBLFNBQUE7QUFBQSxJQUFBLFdBQUE7QUFBQSxJQUFBLFNBQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQSxFQURVLEM7O0FBSVYsRUFBQSxDQUFBLElBQUk7QUFBQSxJQUFBLFVBQUE7QUFBQSxJQUFBO0FBQUEsTUFBMEIsTUFBTSxnQkFBZ0IsQ0FBaEQsTUFBZ0MsRUFBcEMsQ0FBQTtBQUNBLHVCQUFRLFVBQVUsQ0FBVixNQUFBLENBQVIsVUFBUSxDQUFSLEVBQUEsaUJBQUE7QUFDQSx1QkFBUSxTQUFTLENBQVQsTUFBQSxDQUFSLFNBQVEsQ0FBUixFQUFBLGdCQUFBO0FBQ0EsdUJBQU8sVUFBVSxDQUFDLEdBQVgsQ0FBQSxNQUFBLEtBQXlCLG1CQUFLLElBQUwsQ0FBaEMsZUFBQSxFQUFBLGdDQUFBO0FBRUEsdUJBQU8sU0FBUyxDQUFDLEdBQVYsQ0FBQSxNQUFBLEtBQXdCLG1CQUFLLElBQUwsQ0FBL0IsZUFBQSxFQVJBLCtCQVFBLEVBVFUsQzs7QUFjVixFQUFBLENBQUEsR0FBSSxNQUFNLGdCQUFn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QVo7O2VBNEVlLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IHt0ZXN0LCBwcmludH0gZnJvbSBcImFtZW5cIlxuaW1wb3J0IHtjb25maWRlbnRpYWx9IGZyb20gXCIuLi8uLi8uLi9zcmMvaW5kZXhcIlxuaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5cblNpZ25hdHVyZSA9IC0+XG4gIHtzaWduLCB2ZXJpZnksIFNpZ25hdHVyZUtleVBhaXIsIFByaXZhdGVLZXksIFB1YmxpY0tleSwgRGVjbGFyYXRpb24sIFBsYWludGV4dCwgY29udmVydH0gPSBjb25maWRlbnRpYWwoKVxuXG4gICMgVGVzdCBLZXkgUGFpciBHZW5lcmF0aW9uXG4gIEEgPSB7cHJpdmF0ZUtleSwgcHVibGljS2V5fSA9IGF3YWl0IFNpZ25hdHVyZUtleVBhaXIuY3JlYXRlKClcbiAgYXNzZXJ0IChQcml2YXRlS2V5LmlzVHlwZSBwcml2YXRlS2V5KSwgXCJiYWQgcHJpdmF0ZSBrZXlcIlxuICBhc3NlcnQgKFB1YmxpY0tleS5pc1R5cGUgcHVibGljS2V5KSwgXCJiYWQgcHVibGljIGtleVwiXG4gIGFzc2VydCBwcml2YXRlS2V5LmtleS5sZW5ndGggPT0gbmFjbC5zaWduLnNlY3JldEtleUxlbmd0aCxcbiAgICBcInByaXZhdGUga2V5IGlzIGltcHJvcGVyIGxlbmd0aFwiXG4gIGFzc2VydCBwdWJsaWNLZXkua2V5Lmxlbmd0aCA9PSBuYWNsLnNpZ24ucHVibGljS2V5TGVuZ3RoLFxuICAgIFwicHVibGljIGtleSBpcyBpbXByb3BlciBsZW5ndGhcIlxuXG5cbiAgIyBUZXN0IEVuY3J5cHQgLSBEZWNyeXB0IEN5Y2xlXG4gIEIgPSBhd2FpdCBTaWduYXR1cmVLZXlQYWlyLmNyZWF0ZSgpXG5cbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcbiAgcGxhaW50ZXh0ID0gUGxhaW50ZXh0LmZyb20gXCJ1dGY4XCIsIG1lc3NhZ2VcbiAgYXNzZXJ0IChQbGFpbnRleHQuaXNUeXBlIHBsYWludGV4dCksIFwiYmFkIHBsYWludGV4dFwiXG5cbiAgIyMgQ2FzZSAxXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEEgc2lnbnMgYSBtZXNzYWdlLlxuICBkZWNsYXJhdGlvbiA9IHNpZ24gQS5wcml2YXRlS2V5LCBBLnB1YmxpY0tleSwgcGxhaW50ZXh0XG4gIGFzc2VydCAoRGVjbGFyYXRpb24uaXNUeXBlIGRlY2xhcmF0aW9uKSwgXCJiYWQgZGVjbGFyYXRpb25cIlxuICBhc3NlcnQuZXF1YWwoXG4gICAgY29udmVydCBmcm9tOiBcImJ5dGVzXCIsIHRvOiBcInV0ZjhcIiwgZGVjbGFyYXRpb24uZGF0YVxuICAgIG1lc3NhZ2VcbiAgICBcImJhZCBkZWNsYXJhdGlvbjogbWVzc2FnZSBtdXN0IGJlIGludGFjdFwiXG4gIClcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIGNvbnZlcnQgZnJvbTogXCJieXRlc1wiLCB0bzogXCJiYXNlNjRcIiwgZGVjbGFyYXRpb24uc2lnbmF0b3JpZXNbMF1cbiAgICBBLnB1YmxpY0tleS50byBcImJhc2U2NFwiXG4gICAgXCJiYWQgZGVjbGFyYXRpb246IHNpZ25hdG9yeSdzIHB1YmxpYyBrZXkgaXMgaW5jb3JyZWN0XCJcbiAgKVxuXG4gIHNlcmlhbGl6ZWQgPSBkZWNsYXJhdGlvbi50byBcImJhc2U2NFwiXG5cbiAgIyBQZXJzb24gQiB1c2VzIEEncyBwdWJsaWMga2V5IHRvIHZlcmlmeSBhbmQgb3BlbiB0aGUgbWVzc2FnZS5cbiAgZGVjbGFyYXRpb24gPSBEZWNsYXJhdGlvbi5mcm9tIFwiYmFzZTY0XCIsIHNlcmlhbGl6ZWRcbiAgYXNzZXJ0ICh2ZXJpZnkgZGVjbGFyYXRpb24pID09IHRydWUsIFwiZmFpbGVkIHRvIHZlcmlmeVwiXG5cbiAgIyBOZWdhdGl2ZSB0ZXN0LlxuICBkZWNsYXJhdGlvbi5zaWduYXRvcmllcyA9IFtCLnB1YmxpY0tleS50byBcImJ5dGVzXCJdXG4gIGFzc2VydCAodmVyaWZ5IGRlY2xhcmF0aW9uKSA9PSBmYWxzZSwgXCJzaWduYXR1cmUgbmVnYXRpdmUgdGVzdCBmYWlsdXJlXCJcblxuXG5cbiAgIyMgQ2FzZSAyXG4gICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICMgUGVyc29uIEEgYW5kIEIgc2lnbiBhIG1lc3NhZ2Ugd2l0aCBrZXkgcGFpcnMuXG4gIGRlY2xhcmF0aW9uID0gc2lnbiBBLCBwbGFpbnRleHRcbiAgc2lnbiBCLCBkZWNsYXJhdGlvblxuICBhc3NlcnQgKERlY2xhcmF0aW9uLmlzVHlwZSBkZWNsYXJhdGlvbiksIFwiYmFkIGRlY2xhcmF0aW9uXCJcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIGNvbnZlcnQgZnJvbTogXCJieXRlc1wiLCB0bzogXCJ1dGY4XCIsIGRlY2xhcmF0aW9uLmRhdGFcbiAgICBtZXNzYWdlXG4gICAgXCJiYWQgZGVjbGFyYXRpb246IG1lc3NhZ2UgbXVzdCBiZSBpbnRhY3RcIlxuICApXG4gIGFzc2VydC5lcXVhbChcbiAgICBjb252ZXJ0IGZyb206IFwiYnl0ZXNcIiwgdG86IFwiYmFzZTY0XCIsIGRlY2xhcmF0aW9uLnNpZ25hdG9yaWVzWzBdXG4gICAgQS5wdWJsaWNLZXkudG8gXCJiYXNlNjRcIlxuICAgIFwiYmFkIGRlY2xhcmF0aW9uOiBzaWduYXRvcnkgQSdzIHB1YmxpYyBrZXkgaXMgaW5jb3JyZWN0XCJcbiAgKVxuICBhc3NlcnQuZXF1YWwoXG4gICAgY29udmVydCBmcm9tOiBcImJ5dGVzXCIsIHRvOiBcImJhc2U2NFwiLCBkZWNsYXJhdGlvbi5zaWduYXRvcmllc1sxXVxuICAgIEIucHVibGljS2V5LnRvIFwiYmFzZTY0XCJcbiAgICBcImJhZCBkZWNsYXJhdGlvbjogc2lnbmF0b3J5IEIncyBwdWJsaWMga2V5IGlzIGluY29ycmVjdFwiXG4gIClcblxuICBzZXJpYWxpemVkID0gZGVjbGFyYXRpb24udG8gXCJiYXNlNjRcIlxuXG4gICMgUGVyc29uIEMgdmVyaWZpZXMgdGhlIG1lc3NhZ2UgZnJvbSBib3RoLlxuICBkZWNsYXJhdGlvbiA9IERlY2xhcmF0aW9uLmZyb20gXCJiYXNlNjRcIiwgc2VyaWFsaXplZFxuICBhc3NlcnQgKHZlcmlmeSBkZWNsYXJhdGlvbikgPT0gdHJ1ZSwgXCJmYWlsZWQgdG8gdmVyaWZ5XCJcblxuZXhwb3J0IGRlZmF1bHQgU2lnbmF0dXJlXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/signature.coffee
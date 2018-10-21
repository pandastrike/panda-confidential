"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSignatureKeyPair = exports.signatureKeyPair = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _keyPair = require("./key-pair");

var _keys = require("../keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignatureKeyPair, isSignatureKeyPair, signatureKeyPair;
exports.signatureKeyPair = signatureKeyPair;
exports.isSignatureKeyPair = isSignatureKeyPair;
SignatureKeyPair = class SignatureKeyPair extends _keyPair.KeyPair {};
exports.isSignatureKeyPair = isSignatureKeyPair = (0, _pandaParchment.isType)(SignatureKeyPair);

exports.signatureKeyPair = signatureKeyPair = function (randomBytes) {
  var getPair; // Generate a random input to generate a pair. Length comes from TweetNaCl.

  getPair = _pandaGenerics.Method.create({
    default: async function () {
      var input, pair;
      input = await randomBytes(_tweetnacl.default.sign.seedLength);
      pair = _tweetnacl.default.sign.keyPair.fromSeed(input);
      return new SignatureKeyPair({
        privateKey: (0, _keys.privateKey)(pair.secretKey),
        publicKey: (0, _keys.publicKey)(pair.publicKey)
      });
    }
  });

  _pandaGenerics.Method.define(getPair, _pandaParchment.isObject, function (o) {
    return new SignatureKeyPair(o);
  });

  return getPair;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleS1wYWlycy9zaWduYXR1cmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUpBLElBQUEsZ0JBQUEsRUFBQSxrQkFBQSxFQUFBLGdCQUFBOzs7QUFNTSxnQkFBQSxHQUFOLE1BQUEsZ0JBQUEsU0FBK0IsZ0JBQS9CLENBQUEsRUFBTTtBQUVOLDZCQUFBLGtCQUFBLEdBQXFCLDRCQUFBLGdCQUFBLENBQXJCOztBQUVBLDJCQUFBLGdCQUFBLEdBQW1CLFVBQUEsV0FBQSxFQUFBO0FBRWpCLE1BQUEsT0FBQSxDQUZpQixDOztBQUVqQixFQUFBLE9BQUEsR0FBVSxzQkFBQSxNQUFBLENBQ1I7QUFBQSxJQUFBLE9BQUEsRUFBUyxrQkFBQTtBQUNQLFVBQUEsS0FBQSxFQUFBLElBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxNQUFNLFdBQUEsQ0FBWSxtQkFBSyxJQUFMLENBQWxCLFVBQU0sQ0FBZDtBQUNBLE1BQUEsSUFBQSxHQUFPLG1CQUFLLElBQUwsQ0FBVSxPQUFWLENBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBUDthQUNBLElBQUEsZ0JBQUEsQ0FDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLHNCQUFXLElBQUksQ0FBM0IsU0FBWSxDQUFaO0FBQ0EsUUFBQSxTQUFBLEVBQVcscUJBQVUsSUFBSSxDQUFkLFNBQUE7QUFEWCxPQURGLEM7QUFITztBQUFULEdBRFEsQ0FBVjs7QUFPQSx3QkFBQSxNQUFBLENBQUEsT0FBQSxFQUFBLHdCQUFBLEVBQWlDLFVBQUEsQ0FBQSxFQUFBO1dBQU8sSUFBQSxnQkFBQSxDQUFBLENBQUEsQztBQUF4QyxHQUFBOztTQUNBLE87QUFWaUIsQ0FBbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcbmltcG9ydCB7aXNUeXBlLCBpc09iamVjdH0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge01ldGhvZH0gZnJvbSBcInBhbmRhLWdlbmVyaWNzXCJcbmltcG9ydCB7S2V5UGFpcn0gZnJvbSBcIi4va2V5LXBhaXJcIlxuaW1wb3J0IHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9IGZyb20gXCIuLi9rZXlzXCJcblxuY2xhc3MgU2lnbmF0dXJlS2V5UGFpciBleHRlbmRzIEtleVBhaXJcblxuaXNTaWduYXR1cmVLZXlQYWlyID0gaXNUeXBlIFNpZ25hdHVyZUtleVBhaXJcblxuc2lnbmF0dXJlS2V5UGFpciA9IChyYW5kb21CeXRlcykgLT5cbiAgIyBHZW5lcmF0ZSBhIHJhbmRvbSBpbnB1dCB0byBnZW5lcmF0ZSBhIHBhaXIuIExlbmd0aCBjb21lcyBmcm9tIFR3ZWV0TmFDbC5cbiAgZ2V0UGFpciA9IE1ldGhvZC5jcmVhdGVcbiAgICBkZWZhdWx0OiAtPlxuICAgICAgaW5wdXQgPSBhd2FpdCByYW5kb21CeXRlcyBuYWNsLnNpZ24uc2VlZExlbmd0aFxuICAgICAgcGFpciA9IG5hY2wuc2lnbi5rZXlQYWlyLmZyb21TZWVkIGlucHV0XG4gICAgICBuZXcgU2lnbmF0dXJlS2V5UGFpclxuICAgICAgICBwcml2YXRlS2V5OiBwcml2YXRlS2V5IHBhaXIuc2VjcmV0S2V5XG4gICAgICAgIHB1YmxpY0tleTogcHVibGljS2V5IHBhaXIucHVibGljS2V5XG4gIE1ldGhvZC5kZWZpbmUgZ2V0UGFpciwgaXNPYmplY3QsIChvKSAtPiBuZXcgU2lnbmF0dXJlS2V5UGFpciBvXG4gIGdldFBhaXJcblxuZXhwb3J0IHtzaWduYXR1cmVLZXlQYWlyLCBpc1NpZ25hdHVyZUtleVBhaXJ9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=key-pairs/signature.coffee
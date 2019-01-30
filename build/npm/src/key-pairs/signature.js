"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _utils = require("../utils");

var _keyPair = _interopRequireDefault(require("./key-pair"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signatureKeyPair, toBytes;

toBytes = function (string) {
  return (0, _utils.convert)({
    from: "base64",
    to: "bytes"
  }, string);
};

signatureKeyPair = function ({
  randomBytes
}) {
  var SignatureKeyPair;
  return SignatureKeyPair = function () {
    class SignatureKeyPair extends _keyPair.default {
      static async create() {
        var input, pair;
        input = await randomBytes(_tweetnacl.default.sign.seedLength);
        pair = _tweetnacl.default.sign.keyPair.fromSeed(input);
        return new SignatureKeyPair({
          privateKey: pair.secretKey,
          publicKey: pair.publicKey
        });
      }

      static from(hint, value) {
        return new SignatureKeyPair(function () {
          value = hint === "utf8" ? (0, _pandaParchment.fromJSON)(value) : (0, _pandaParchment.fromJSON)((0, _utils.convert)({
            from: hint,
            to: "utf8"
          }, value));
          return {
            privateKey: toBytes(value.privateKey),
            publicKey: toBytes(value.publicKey)
          };
        }());
      }

    }

    ;
    SignatureKeyPair.isType = (0, _pandaParchment.isType)(SignatureKeyPair);
    SignatureKeyPair.areType = (0, _utils.areType)(SignatureKeyPair.isType);
    return SignatureKeyPair;
  }.call(this);
};

var _default = signatureKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9zaWduYXR1cmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsZ0JBQUEsRUFBQSxPQUFBOztBQUtBLE9BQUEsR0FBVSxVQUFBLE1BQUEsRUFBQTtTQUFZLG9CQUFRO0FBQUEsSUFBQSxJQUFBLEVBQUEsUUFBQTtBQUFnQixJQUFBLEVBQUEsRUFBSTtBQUFwQixHQUFSLEVBQUEsTUFBQSxDO0FBQVosQ0FBVjs7QUFFQSxnQkFBQSxHQUFtQixVQUFDO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtBQUNqQixNQUFBLGdCQUFBO1NBQU0sZ0JBQUEsR0FBQSxZQUFBO0FBQU4sVUFBQSxnQkFBQSxTQUErQixnQkFBL0IsQ0FBQTtBQUVXLG1CQUFSLE1BQVEsR0FBQTtBQUNQLFlBQUEsS0FBQSxFQUFBLElBQUE7QUFBQSxRQUFBLEtBQUEsR0FBUSxNQUFNLFdBQUEsQ0FBWSxtQkFBSyxJQUFMLENBQWxCLFVBQU0sQ0FBZDtBQUNBLFFBQUEsSUFBQSxHQUFPLG1CQUFLLElBQUwsQ0FBVSxPQUFWLENBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBUDtlQUNBLElBQUEsZ0JBQUEsQ0FDRTtBQUFBLFVBQUEsVUFBQSxFQUFZLElBQUksQ0FBaEIsU0FBQTtBQUNBLFVBQUEsU0FBQSxFQUFXLElBQUksQ0FBQztBQURoQixTQURGLEM7QUFITzs7QUFPRixhQUFOLElBQU0sQ0FBQSxJQUFBLEVBQUEsS0FBQSxFQUFBO2VBQ0wsSUFBQSxnQkFBQSxDQUF3QixZQUFBO0FBQ3RCLFVBQUEsS0FBQSxHQUNLLElBQUEsS0FBSCxNQUFHLEdBQ0QsOEJBREYsS0FDRSxDQURDLEdBR0QsOEJBQVMsb0JBQVE7QUFBQSxZQUFBLElBQUEsRUFBQSxJQUFBO0FBQVksWUFBQSxFQUFBLEVBQUk7QUFBaEIsV0FBUixFQUFULEtBQVMsQ0FBVCxDQUpKO2lCQU1BO0FBQUEsWUFBQSxVQUFBLEVBQVksT0FBQSxDQUFRLEtBQUssQ0FBekIsVUFBWSxDQUFaO0FBQ0EsWUFBQSxTQUFBLEVBQVcsT0FBQSxDQUFRLEtBQUssQ0FBYixTQUFBO0FBRFgsVztBQVBGLFNBQXdCLEVBQXhCLEM7QUFESzs7QUFUVDs7QUFBQTtBQW9CRSxJQUFBLGdCQUFDLENBQUQsTUFBQSxHQUFTLDRCQUFBLGdCQUFBLENBQVQ7QUFDQSxJQUFBLGdCQUFDLENBQUQsT0FBQSxHQUFVLG9CQUFRLGdCQUFDLENBQVQsTUFBQSxDQUFWOztHQXJCSSxDLElBQUEsQyxJQUFBLEM7QUFEVyxDQUFuQjs7ZUF3QmUsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcbmltcG9ydCB7aXNUeXBlLCBmcm9tSlNPTn0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge2NvbnZlcnQsIGFyZVR5cGV9IGZyb20gXCIuLi91dGlsc1wiXG5pbXBvcnQgS2V5UGFpciBmcm9tIFwiLi9rZXktcGFpclwiXG5cbnRvQnl0ZXMgPSAoc3RyaW5nKSAtPiBjb252ZXJ0IGZyb206IFwiYmFzZTY0XCIsIHRvOiBcImJ5dGVzXCIsIHN0cmluZ1xuXG5zaWduYXR1cmVLZXlQYWlyID0gKHtyYW5kb21CeXRlc30pIC0+XG4gIGNsYXNzIFNpZ25hdHVyZUtleVBhaXIgZXh0ZW5kcyBLZXlQYWlyXG5cbiAgICBAY3JlYXRlOiAtPlxuICAgICAgaW5wdXQgPSBhd2FpdCByYW5kb21CeXRlcyBuYWNsLnNpZ24uc2VlZExlbmd0aFxuICAgICAgcGFpciA9IG5hY2wuc2lnbi5rZXlQYWlyLmZyb21TZWVkIGlucHV0XG4gICAgICBuZXcgU2lnbmF0dXJlS2V5UGFpclxuICAgICAgICBwcml2YXRlS2V5OiBwYWlyLnNlY3JldEtleVxuICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5XG5cbiAgICBAZnJvbTogKGhpbnQsIHZhbHVlKSAtPlxuICAgICAgbmV3IFNpZ25hdHVyZUtleVBhaXIgZG8gLT5cbiAgICAgICAgdmFsdWUgPVxuICAgICAgICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgICAgICAgIGZyb21KU09OIHZhbHVlXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJvbUpTT04gY29udmVydCBmcm9tOiBoaW50LCB0bzogXCJ1dGY4XCIsIHZhbHVlXG5cbiAgICAgICAgcHJpdmF0ZUtleTogdG9CeXRlcyB2YWx1ZS5wcml2YXRlS2V5XG4gICAgICAgIHB1YmxpY0tleTogdG9CeXRlcyB2YWx1ZS5wdWJsaWNLZXlcblxuICAgIEBpc1R5cGU6IGlzVHlwZSBAXG4gICAgQGFyZVR5cGU6IGFyZVR5cGUgQGlzVHlwZVxuXG5leHBvcnQgZGVmYXVsdCBzaWduYXR1cmVLZXlQYWlyXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/signature.coffee
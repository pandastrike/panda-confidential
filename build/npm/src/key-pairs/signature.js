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
          value = hint === "utf8" ? JSON.parse(value) : JSON.parse((0, _utils.convert)({
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
    return SignatureKeyPair;
  }.call(this);
};

var _default = signatureKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMvc2lnbmF0dXJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFIQSxJQUFBLGdCQUFBLEVBQUEsT0FBQTs7QUFLQSxPQUFBLEdBQVUsVUFBQSxNQUFBLEVBQUE7U0FBWSxvQkFBUTtBQUFBLElBQUEsSUFBQSxFQUFBLFFBQUE7QUFBZ0IsSUFBQSxFQUFBLEVBQUk7QUFBcEIsR0FBUixFQUFBLE1BQUEsQztBQUFaLENBQVY7O0FBRUEsZ0JBQUEsR0FBbUIsVUFBQztBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7QUFDakIsTUFBQSxnQkFBQTtTQUFNLGdCQUFBLEdBQUEsWUFBQTtBQUFOLFVBQUEsZ0JBQUEsU0FBK0IsZ0JBQS9CLENBQUE7QUFFVyxtQkFBUixNQUFRLEdBQUE7QUFDUCxZQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsUUFBQSxLQUFBLEdBQVEsTUFBTSxXQUFBLENBQVksbUJBQUssSUFBTCxDQUFsQixVQUFNLENBQWQ7QUFDQSxRQUFBLElBQUEsR0FBTyxtQkFBSyxJQUFMLENBQVUsT0FBVixDQUFBLFFBQUEsQ0FBQSxLQUFBLENBQVA7ZUFDQSxJQUFBLGdCQUFBLENBQ0U7QUFBQSxVQUFBLFVBQUEsRUFBWSxJQUFJLENBQWhCLFNBQUE7QUFDQSxVQUFBLFNBQUEsRUFBVyxJQUFJLENBQUM7QUFEaEIsU0FERixDO0FBSE87O0FBT0YsYUFBTixJQUFNLENBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQTtlQUNMLElBQUEsZ0JBQUEsQ0FBd0IsWUFBQTtBQUN0QixVQUFBLEtBQUEsR0FDSyxJQUFBLEtBQUgsTUFBRyxHQUNELElBQUksQ0FBSixLQUFBLENBREYsS0FDRSxDQURDLEdBR0QsSUFBSSxDQUFKLEtBQUEsQ0FBVyxvQkFBUTtBQUFBLFlBQUEsSUFBQSxFQUFBLElBQUE7QUFBWSxZQUFBLEVBQUEsRUFBSTtBQUFoQixXQUFSLEVBQVgsS0FBVyxDQUFYLENBSko7aUJBTUE7QUFBQSxZQUFBLFVBQUEsRUFBWSxPQUFBLENBQVEsS0FBSyxDQUF6QixVQUFZLENBQVo7QUFDQSxZQUFBLFNBQUEsRUFBVyxPQUFBLENBQVEsS0FBSyxDQUFiLFNBQUE7QUFEWCxXO0FBUEYsU0FBd0IsRUFBeEIsQztBQURLOztBQVRUOztBQUFBO0FBb0JFLElBQUEsZ0JBQUMsQ0FBRCxNQUFBLEdBQVMsNEJBQUEsZ0JBQUEsQ0FBVDs7R0FwQkksQyxJQUFBLEMsSUFBQSxDO0FBRFcsQ0FBbkI7O2VBdUJlLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZX0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge2NvbnZlcnR9IGZyb20gXCIuLi91dGlsc1wiXG5pbXBvcnQgS2V5UGFpciBmcm9tIFwiLi9rZXktcGFpclwiXG5cbnRvQnl0ZXMgPSAoc3RyaW5nKSAtPiBjb252ZXJ0IGZyb206IFwiYmFzZTY0XCIsIHRvOiBcImJ5dGVzXCIsIHN0cmluZ1xuXG5zaWduYXR1cmVLZXlQYWlyID0gKHtyYW5kb21CeXRlc30pIC0+XG4gIGNsYXNzIFNpZ25hdHVyZUtleVBhaXIgZXh0ZW5kcyBLZXlQYWlyXG5cbiAgICBAY3JlYXRlOiAtPlxuICAgICAgaW5wdXQgPSBhd2FpdCByYW5kb21CeXRlcyBuYWNsLnNpZ24uc2VlZExlbmd0aFxuICAgICAgcGFpciA9IG5hY2wuc2lnbi5rZXlQYWlyLmZyb21TZWVkIGlucHV0XG4gICAgICBuZXcgU2lnbmF0dXJlS2V5UGFpclxuICAgICAgICBwcml2YXRlS2V5OiBwYWlyLnNlY3JldEtleVxuICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5XG5cbiAgICBAZnJvbTogKGhpbnQsIHZhbHVlKSAtPlxuICAgICAgbmV3IFNpZ25hdHVyZUtleVBhaXIgZG8gLT5cbiAgICAgICAgdmFsdWUgPVxuICAgICAgICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgICAgICAgIEpTT04ucGFyc2UgdmFsdWVcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBKU09OLnBhcnNlIGNvbnZlcnQgZnJvbTogaGludCwgdG86IFwidXRmOFwiLCB2YWx1ZVxuXG4gICAgICAgIHByaXZhdGVLZXk6IHRvQnl0ZXMgdmFsdWUucHJpdmF0ZUtleVxuICAgICAgICBwdWJsaWNLZXk6IHRvQnl0ZXMgdmFsdWUucHVibGljS2V5XG5cbiAgICBAaXNUeXBlOiBpc1R5cGUgQFxuXG5leHBvcnQgZGVmYXVsdCBzaWduYXR1cmVLZXlQYWlyXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/signature.coffee
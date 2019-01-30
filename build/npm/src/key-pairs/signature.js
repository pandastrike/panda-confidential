"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _utils = require("../utils");

var _keyPair = _interopRequireDefault(require("./key-pair"));

var _public = _interopRequireDefault(require("../keys/public"));

var _private = _interopRequireDefault(require("../keys/private"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signatureKeyPair;

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
          privateKey: _private.default.from("bytes", pair.secretKey),
          publicKey: _public.default.from("bytes", pair.publicKey)
        });
      }

      static from(hint, value) {
        return new SignatureKeyPair(function () {
          var privateKey, publicKey;
          ({
            privateKey,
            publicKey
          } = hint === "utf8" ? (0, _pandaParchment.fromJSON)(value) : (0, _pandaParchment.fromJSON)((0, _utils.convert)({
            from: hint,
            to: "utf8"
          }, value)));
          return {
            privateKey: _private.default.from("base64", privateKey),
            publicKey: _public.default.from("base64", publicKey)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9zaWduYXR1cmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUxBLElBQUEsZ0JBQUE7O0FBT0EsZ0JBQUEsR0FBbUIsVUFBQztBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7QUFDakIsTUFBQSxnQkFBQTtTQUFNLGdCQUFBLEdBQUEsWUFBQTtBQUFOLFVBQUEsZ0JBQUEsU0FBK0IsZ0JBQS9CLENBQUE7QUFFVyxtQkFBUixNQUFRLEdBQUE7QUFDUCxZQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsUUFBQSxLQUFBLEdBQVEsTUFBTSxXQUFBLENBQVksbUJBQUssSUFBTCxDQUFsQixVQUFNLENBQWQ7QUFDQSxRQUFBLElBQUEsR0FBTyxtQkFBSyxJQUFMLENBQVUsT0FBVixDQUFBLFFBQUEsQ0FBQSxLQUFBLENBQVA7ZUFDQSxJQUFBLGdCQUFBLENBQ0U7QUFBQSxVQUFBLFVBQUEsRUFBWSxpQkFBQSxJQUFBLENBQUEsT0FBQSxFQUF5QixJQUFJLENBQXpDLFNBQVksQ0FBWjtBQUNBLFVBQUEsU0FBQSxFQUFXLGdCQUFBLElBQUEsQ0FBQSxPQUFBLEVBQXdCLElBQUksQ0FBNUIsU0FBQTtBQURYLFNBREYsQztBQUhPOztBQU9GLGFBQU4sSUFBTSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7ZUFDTCxJQUFBLGdCQUFBLENBQXdCLFlBQUE7QUFDdEIsY0FBQSxVQUFBLEVBQUEsU0FBQTtBQUFBLFdBQUE7QUFBQSxZQUFBLFVBQUE7QUFBQSxZQUFBO0FBQUEsY0FDSyxJQUFBLEtBQUgsTUFBRyxHQUNELDhCQURGLEtBQ0UsQ0FEQyxHQUdELDhCQUFTLG9CQUFRO0FBQUEsWUFBQSxJQUFBLEVBQUEsSUFBQTtBQUFZLFlBQUEsRUFBQSxFQUFJO0FBQWhCLFdBQVIsRUFKYixLQUlhLENBQVQsQ0FKSjtpQkFNQTtBQUFBLFlBQUEsVUFBQSxFQUFZLGlCQUFBLElBQUEsQ0FBQSxRQUFBLEVBQVosVUFBWSxDQUFaO0FBQ0EsWUFBQSxTQUFBLEVBQVcsZ0JBQUEsSUFBQSxDQUFBLFFBQUEsRUFBQSxTQUFBO0FBRFgsVztBQVBGLFNBQXdCLEVBQXhCLEM7QUFESzs7QUFUVDs7QUFBQTtBQW9CRSxJQUFBLGdCQUFDLENBQUQsTUFBQSxHQUFTLDRCQUFBLGdCQUFBLENBQVQ7QUFDQSxJQUFBLGdCQUFDLENBQUQsT0FBQSxHQUFVLG9CQUFRLGdCQUFDLENBQVQsTUFBQSxDQUFWOztHQXJCSSxDLElBQUEsQyxJQUFBLEM7QUFEVyxDQUFuQjs7ZUF3QmUsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcbmltcG9ydCB7aXNUeXBlLCBmcm9tSlNPTn0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge2NvbnZlcnQsIGFyZVR5cGV9IGZyb20gXCIuLi91dGlsc1wiXG5pbXBvcnQgS2V5UGFpciBmcm9tIFwiLi9rZXktcGFpclwiXG5pbXBvcnQgUHVibGljS2V5IGZyb20gXCIuLi9rZXlzL3B1YmxpY1wiXG5pbXBvcnQgUHJpdmF0ZUtleSBmcm9tIFwiLi4va2V5cy9wcml2YXRlXCJcblxuc2lnbmF0dXJlS2V5UGFpciA9ICh7cmFuZG9tQnl0ZXN9KSAtPlxuICBjbGFzcyBTaWduYXR1cmVLZXlQYWlyIGV4dGVuZHMgS2V5UGFpclxuXG4gICAgQGNyZWF0ZTogLT5cbiAgICAgIGlucHV0ID0gYXdhaXQgcmFuZG9tQnl0ZXMgbmFjbC5zaWduLnNlZWRMZW5ndGhcbiAgICAgIHBhaXIgPSBuYWNsLnNpZ24ua2V5UGFpci5mcm9tU2VlZCBpbnB1dFxuICAgICAgbmV3IFNpZ25hdHVyZUtleVBhaXJcbiAgICAgICAgcHJpdmF0ZUtleTogUHJpdmF0ZUtleS5mcm9tIFwiYnl0ZXNcIiwgcGFpci5zZWNyZXRLZXlcbiAgICAgICAgcHVibGljS2V5OiBQdWJsaWNLZXkuZnJvbSBcImJ5dGVzXCIsIHBhaXIucHVibGljS2V5XG5cbiAgICBAZnJvbTogKGhpbnQsIHZhbHVlKSAtPlxuICAgICAgbmV3IFNpZ25hdHVyZUtleVBhaXIgZG8gLT5cbiAgICAgICAge3ByaXZhdGVLZXksIHB1YmxpY0tleX0gPVxuICAgICAgICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgICAgICAgIGZyb21KU09OIHZhbHVlXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJvbUpTT04gY29udmVydCBmcm9tOiBoaW50LCB0bzogXCJ1dGY4XCIsIHZhbHVlXG5cbiAgICAgICAgcHJpdmF0ZUtleTogUHJpdmF0ZUtleS5mcm9tIFwiYmFzZTY0XCIsIHByaXZhdGVLZXlcbiAgICAgICAgcHVibGljS2V5OiBQdWJsaWNLZXkuZnJvbSBcImJhc2U2NFwiLCBwdWJsaWNLZXlcblxuICAgIEBpc1R5cGU6IGlzVHlwZSBAXG4gICAgQGFyZVR5cGU6IGFyZVR5cGUgQGlzVHlwZVxuXG5leHBvcnQgZGVmYXVsdCBzaWduYXR1cmVLZXlQYWlyXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/signature.coffee
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _keyPair = _interopRequireDefault(require("./key-pair"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encryptionKeyPair, toBytes;

toBytes = function (string) {
  return convert({
    from: "base64",
    to: "bytes"
  }, string);
};

encryptionKeyPair = function ({
  randomBytes
}) {
  var EncryptionKeyPair;
  return EncryptionKeyPair = function () {
    class EncryptionKeyPair extends _keyPair.default {
      static async create() {
        var input, pair;
        input = await randomBytes(_tweetnacl.default.box.secretKeyLength);
        pair = _tweetnacl.default.box.keyPair.fromSecretKey(input);
        return new EncryptionKeyPair({
          privateKey: pair.secretKey,
          publicKey: pair.publicKey
        });
      }

      static from(hint, value) {
        return new EncryptionKeyPair(function () {
          value = hint === "utf8" ? JSON.parse(value) : JSON.parse(convert({
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
    EncryptionKeyPair.isType = (0, _pandaParchment.isType)(EncryptionKeyPair);
    return EncryptionKeyPair;
  }.call(this);
};

var _default = encryptionKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMvZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRkEsSUFBQSxpQkFBQSxFQUFBLE9BQUE7O0FBSUEsT0FBQSxHQUFVLFVBQUEsTUFBQSxFQUFBO1NBQVksT0FBQSxDQUFRO0FBQUEsSUFBQSxJQUFBLEVBQUEsUUFBQTtBQUFnQixJQUFBLEVBQUEsRUFBSTtBQUFwQixHQUFSLEVBQUEsTUFBQSxDO0FBQVosQ0FBVjs7QUFFQSxpQkFBQSxHQUFvQixVQUFDO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtBQUNsQixNQUFBLGlCQUFBO1NBQU0saUJBQUEsR0FBQSxZQUFBO0FBQU4sVUFBQSxpQkFBQSxTQUFnQyxnQkFBaEMsQ0FBQTtBQUVXLG1CQUFSLE1BQVEsR0FBQTtBQUNQLFlBQUEsS0FBQSxFQUFBLElBQUE7QUFBQSxRQUFBLEtBQUEsR0FBUSxNQUFNLFdBQUEsQ0FBWSxtQkFBSyxHQUFMLENBQWxCLGVBQU0sQ0FBZDtBQUNBLFFBQUEsSUFBQSxHQUFPLG1CQUFLLEdBQUwsQ0FBUyxPQUFULENBQUEsYUFBQSxDQUFBLEtBQUEsQ0FBUDtlQUNBLElBQUEsaUJBQUEsQ0FDRTtBQUFBLFVBQUEsVUFBQSxFQUFZLElBQUksQ0FBaEIsU0FBQTtBQUNBLFVBQUEsU0FBQSxFQUFXLElBQUksQ0FBQztBQURoQixTQURGLEM7QUFITzs7QUFPRixhQUFOLElBQU0sQ0FBQSxJQUFBLEVBQUEsS0FBQSxFQUFBO2VBQ0wsSUFBQSxpQkFBQSxDQUF5QixZQUFBO0FBQ3ZCLFVBQUEsS0FBQSxHQUNLLElBQUEsS0FBSCxNQUFHLEdBQ0QsSUFBSSxDQUFKLEtBQUEsQ0FERixLQUNFLENBREMsR0FHRCxJQUFJLENBQUosS0FBQSxDQUFXLE9BQUEsQ0FBUTtBQUFBLFlBQUEsSUFBQSxFQUFBLElBQUE7QUFBWSxZQUFBLEVBQUEsRUFBSTtBQUFoQixXQUFSLEVBQVgsS0FBVyxDQUFYLENBSko7aUJBTUE7QUFBQSxZQUFBLFVBQUEsRUFBWSxPQUFBLENBQVEsS0FBSyxDQUF6QixVQUFZLENBQVo7QUFDQSxZQUFBLFNBQUEsRUFBVyxPQUFBLENBQVEsS0FBSyxDQUFiLFNBQUE7QUFEWCxXO0FBUEYsU0FBeUIsRUFBekIsQztBQURLOztBQVRUOztBQUFBO0FBb0JFLElBQUEsaUJBQUMsQ0FBRCxNQUFBLEdBQVMsNEJBQUEsaUJBQUEsQ0FBVDs7R0FwQkksQyxJQUFBLEMsSUFBQSxDO0FBRFksQ0FBcEI7O2VBd0JlLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZX0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQgS2V5UGFpciBmcm9tIFwiLi9rZXktcGFpclwiXG5cbnRvQnl0ZXMgPSAoc3RyaW5nKSAtPiBjb252ZXJ0IGZyb206IFwiYmFzZTY0XCIsIHRvOiBcImJ5dGVzXCIsIHN0cmluZ1xuXG5lbmNyeXB0aW9uS2V5UGFpciA9ICh7cmFuZG9tQnl0ZXN9KSAtPlxuICBjbGFzcyBFbmNyeXB0aW9uS2V5UGFpciBleHRlbmRzIEtleVBhaXJcblxuICAgIEBjcmVhdGU6IC0+XG4gICAgICBpbnB1dCA9IGF3YWl0IHJhbmRvbUJ5dGVzIG5hY2wuYm94LnNlY3JldEtleUxlbmd0aFxuICAgICAgcGFpciA9IG5hY2wuYm94LmtleVBhaXIuZnJvbVNlY3JldEtleSBpbnB1dFxuICAgICAgbmV3IEVuY3J5cHRpb25LZXlQYWlyXG4gICAgICAgIHByaXZhdGVLZXk6IHBhaXIuc2VjcmV0S2V5XG4gICAgICAgIHB1YmxpY0tleTogcGFpci5wdWJsaWNLZXlcblxuICAgIEBmcm9tOiAoaGludCwgdmFsdWUpIC0+XG4gICAgICBuZXcgRW5jcnlwdGlvbktleVBhaXIgZG8gLT5cbiAgICAgICAgdmFsdWUgPVxuICAgICAgICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgICAgICAgIEpTT04ucGFyc2UgdmFsdWVcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBKU09OLnBhcnNlIGNvbnZlcnQgZnJvbTogaGludCwgdG86IFwidXRmOFwiLCB2YWx1ZVxuXG4gICAgICAgIHByaXZhdGVLZXk6IHRvQnl0ZXMgdmFsdWUucHJpdmF0ZUtleVxuICAgICAgICBwdWJsaWNLZXk6IHRvQnl0ZXMgdmFsdWUucHVibGljS2V5XG5cbiAgICBAaXNUeXBlOiBpc1R5cGUgQFxuXG5cbmV4cG9ydCBkZWZhdWx0IGVuY3J5cHRpb25LZXlQYWlyXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/encryption.coffee
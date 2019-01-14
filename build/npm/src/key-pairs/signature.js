"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _keyPair = _interopRequireDefault(require("./key-pair"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signatureKeyPair, toBytes;

toBytes = function (string) {
  return convert({
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
    SignatureKeyPair.isType = (0, _pandaParchment.isType)(SignatureKeyPair);
    return SignatureKeyPair;
  }.call(this);
};

var _default = signatureKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMvc2lnbmF0dXJlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFGQSxJQUFBLGdCQUFBLEVBQUEsT0FBQTs7QUFJQSxPQUFBLEdBQVUsVUFBQSxNQUFBLEVBQUE7U0FBWSxPQUFBLENBQVE7QUFBQSxJQUFBLElBQUEsRUFBQSxRQUFBO0FBQWdCLElBQUEsRUFBQSxFQUFJO0FBQXBCLEdBQVIsRUFBQSxNQUFBLEM7QUFBWixDQUFWOztBQUVBLGdCQUFBLEdBQW1CLFVBQUM7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO0FBQ2pCLE1BQUEsZ0JBQUE7U0FBTSxnQkFBQSxHQUFBLFlBQUE7QUFBTixVQUFBLGdCQUFBLFNBQStCLGdCQUEvQixDQUFBO0FBRVcsbUJBQVIsTUFBUSxHQUFBO0FBQ1AsWUFBQSxLQUFBLEVBQUEsSUFBQTtBQUFBLFFBQUEsS0FBQSxHQUFRLE1BQU0sV0FBQSxDQUFZLG1CQUFLLElBQUwsQ0FBbEIsVUFBTSxDQUFkO0FBQ0EsUUFBQSxJQUFBLEdBQU8sbUJBQUssSUFBTCxDQUFVLE9BQVYsQ0FBQSxRQUFBLENBQUEsS0FBQSxDQUFQO2VBQ0EsSUFBQSxnQkFBQSxDQUNFO0FBQUEsVUFBQSxVQUFBLEVBQVksSUFBSSxDQUFoQixTQUFBO0FBQ0EsVUFBQSxTQUFBLEVBQVcsSUFBSSxDQUFDO0FBRGhCLFNBREYsQztBQUhPOztBQU9GLGFBQU4sSUFBTSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7ZUFDTCxJQUFBLGdCQUFBLENBQXdCLFlBQUE7QUFDdEIsVUFBQSxLQUFBLEdBQ0ssSUFBQSxLQUFILE1BQUcsR0FDRCxJQUFJLENBQUosS0FBQSxDQURGLEtBQ0UsQ0FEQyxHQUdELElBQUksQ0FBSixLQUFBLENBQVcsT0FBQSxDQUFRO0FBQUEsWUFBQSxJQUFBLEVBQUEsSUFBQTtBQUFZLFlBQUEsRUFBQSxFQUFJO0FBQWhCLFdBQVIsRUFBWCxLQUFXLENBQVgsQ0FKSjtpQkFNQTtBQUFBLFlBQUEsVUFBQSxFQUFZLE9BQUEsQ0FBUSxLQUFLLENBQXpCLFVBQVksQ0FBWjtBQUNBLFlBQUEsU0FBQSxFQUFXLE9BQUEsQ0FBUSxLQUFLLENBQWIsU0FBQTtBQURYLFc7QUFQRixTQUF3QixFQUF4QixDO0FBREs7O0FBVFQ7O0FBQUE7QUFvQkUsSUFBQSxnQkFBQyxDQUFELE1BQUEsR0FBUyw0QkFBQSxnQkFBQSxDQUFUOztHQXBCSSxDLElBQUEsQyxJQUFBLEM7QUFEVyxDQUFuQjs7ZUF3QmUsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcbmltcG9ydCB7aXNUeXBlfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCBLZXlQYWlyIGZyb20gXCIuL2tleS1wYWlyXCJcblxudG9CeXRlcyA9IChzdHJpbmcpIC0+IGNvbnZlcnQgZnJvbTogXCJiYXNlNjRcIiwgdG86IFwiYnl0ZXNcIiwgc3RyaW5nXG5cbnNpZ25hdHVyZUtleVBhaXIgPSAoe3JhbmRvbUJ5dGVzfSkgLT5cbiAgY2xhc3MgU2lnbmF0dXJlS2V5UGFpciBleHRlbmRzIEtleVBhaXJcblxuICAgIEBjcmVhdGU6IC0+XG4gICAgICBpbnB1dCA9IGF3YWl0IHJhbmRvbUJ5dGVzIG5hY2wuc2lnbi5zZWVkTGVuZ3RoXG4gICAgICBwYWlyID0gbmFjbC5zaWduLmtleVBhaXIuZnJvbVNlZWQgaW5wdXRcbiAgICAgIG5ldyBTaWduYXR1cmVLZXlQYWlyXG4gICAgICAgIHByaXZhdGVLZXk6IHBhaXIuc2VjcmV0S2V5XG4gICAgICAgIHB1YmxpY0tleTogcGFpci5wdWJsaWNLZXlcblxuICAgIEBmcm9tOiAoaGludCwgdmFsdWUpIC0+XG4gICAgICBuZXcgU2lnbmF0dXJlS2V5UGFpciBkbyAtPlxuICAgICAgICB2YWx1ZSA9XG4gICAgICAgICAgaWYgaGludCA9PSBcInV0ZjhcIlxuICAgICAgICAgICAgSlNPTi5wYXJzZSB2YWx1ZVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIEpTT04ucGFyc2UgY29udmVydCBmcm9tOiBoaW50LCB0bzogXCJ1dGY4XCIsIHZhbHVlXG5cbiAgICAgICAgcHJpdmF0ZUtleTogdG9CeXRlcyB2YWx1ZS5wcml2YXRlS2V5XG4gICAgICAgIHB1YmxpY0tleTogdG9CeXRlcyB2YWx1ZS5wdWJsaWNLZXlcblxuICAgIEBpc1R5cGU6IGlzVHlwZSBAXG5cblxuZXhwb3J0IGRlZmF1bHQgc2lnbmF0dXJlS2V5UGFpclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/signature.coffee
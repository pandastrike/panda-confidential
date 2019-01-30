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

var encryptionKeyPair, toBytes;

toBytes = function (string) {
  return (0, _utils.convert)({
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
    EncryptionKeyPair.isType = (0, _pandaParchment.isType)(EncryptionKeyPair);
    EncryptionKeyPair.areType = (0, _utils.areType)(EncryptionKeyPair.isType);
    return EncryptionKeyPair;
  }.call(this);
};

var _default = encryptionKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFIQSxJQUFBLGlCQUFBLEVBQUEsT0FBQTs7QUFLQSxPQUFBLEdBQVUsVUFBQSxNQUFBLEVBQUE7U0FBWSxvQkFBUTtBQUFBLElBQUEsSUFBQSxFQUFBLFFBQUE7QUFBZ0IsSUFBQSxFQUFBLEVBQUk7QUFBcEIsR0FBUixFQUFBLE1BQUEsQztBQUFaLENBQVY7O0FBRUEsaUJBQUEsR0FBb0IsVUFBQztBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7QUFDbEIsTUFBQSxpQkFBQTtTQUFNLGlCQUFBLEdBQUEsWUFBQTtBQUFOLFVBQUEsaUJBQUEsU0FBZ0MsZ0JBQWhDLENBQUE7QUFFVyxtQkFBUixNQUFRLEdBQUE7QUFDUCxZQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsUUFBQSxLQUFBLEdBQVEsTUFBTSxXQUFBLENBQVksbUJBQUssR0FBTCxDQUFsQixlQUFNLENBQWQ7QUFDQSxRQUFBLElBQUEsR0FBTyxtQkFBSyxHQUFMLENBQVMsT0FBVCxDQUFBLGFBQUEsQ0FBQSxLQUFBLENBQVA7ZUFDQSxJQUFBLGlCQUFBLENBQ0U7QUFBQSxVQUFBLFVBQUEsRUFBWSxJQUFJLENBQWhCLFNBQUE7QUFDQSxVQUFBLFNBQUEsRUFBVyxJQUFJLENBQUM7QUFEaEIsU0FERixDO0FBSE87O0FBT0YsYUFBTixJQUFNLENBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQTtlQUNMLElBQUEsaUJBQUEsQ0FBeUIsWUFBQTtBQUN2QixVQUFBLEtBQUEsR0FDSyxJQUFBLEtBQUgsTUFBRyxHQUNELDhCQURGLEtBQ0UsQ0FEQyxHQUdELDhCQUFTLG9CQUFRO0FBQUEsWUFBQSxJQUFBLEVBQUEsSUFBQTtBQUFZLFlBQUEsRUFBQSxFQUFJO0FBQWhCLFdBQVIsRUFBVCxLQUFTLENBQVQsQ0FKSjtpQkFNQTtBQUFBLFlBQUEsVUFBQSxFQUFZLE9BQUEsQ0FBUSxLQUFLLENBQXpCLFVBQVksQ0FBWjtBQUNBLFlBQUEsU0FBQSxFQUFXLE9BQUEsQ0FBUSxLQUFLLENBQWIsU0FBQTtBQURYLFc7QUFQRixTQUF5QixFQUF6QixDO0FBREs7O0FBVFQ7O0FBQUE7QUFvQkUsSUFBQSxpQkFBQyxDQUFELE1BQUEsR0FBUyw0QkFBQSxpQkFBQSxDQUFUO0FBQ0EsSUFBQSxpQkFBQyxDQUFELE9BQUEsR0FBVSxvQkFBUSxpQkFBQyxDQUFULE1BQUEsQ0FBVjs7R0FyQkksQyxJQUFBLEMsSUFBQSxDO0FBRFksQ0FBcEI7O2VBd0JlLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZSwgZnJvbUpTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtjb252ZXJ0LCBhcmVUeXBlfSBmcm9tIFwiLi4vdXRpbHNcIlxuaW1wb3J0IEtleVBhaXIgZnJvbSBcIi4va2V5LXBhaXJcIlxuXG50b0J5dGVzID0gKHN0cmluZykgLT4gY29udmVydCBmcm9tOiBcImJhc2U2NFwiLCB0bzogXCJieXRlc1wiLCBzdHJpbmdcblxuZW5jcnlwdGlvbktleVBhaXIgPSAoe3JhbmRvbUJ5dGVzfSkgLT5cbiAgY2xhc3MgRW5jcnlwdGlvbktleVBhaXIgZXh0ZW5kcyBLZXlQYWlyXG5cbiAgICBAY3JlYXRlOiAtPlxuICAgICAgaW5wdXQgPSBhd2FpdCByYW5kb21CeXRlcyBuYWNsLmJveC5zZWNyZXRLZXlMZW5ndGhcbiAgICAgIHBhaXIgPSBuYWNsLmJveC5rZXlQYWlyLmZyb21TZWNyZXRLZXkgaW5wdXRcbiAgICAgIG5ldyBFbmNyeXB0aW9uS2V5UGFpclxuICAgICAgICBwcml2YXRlS2V5OiBwYWlyLnNlY3JldEtleVxuICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5XG5cbiAgICBAZnJvbTogKGhpbnQsIHZhbHVlKSAtPlxuICAgICAgbmV3IEVuY3J5cHRpb25LZXlQYWlyIGRvIC0+XG4gICAgICAgIHZhbHVlID1cbiAgICAgICAgICBpZiBoaW50ID09IFwidXRmOFwiXG4gICAgICAgICAgICBmcm9tSlNPTiB2YWx1ZVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyb21KU09OIGNvbnZlcnQgZnJvbTogaGludCwgdG86IFwidXRmOFwiLCB2YWx1ZVxuXG4gICAgICAgIHByaXZhdGVLZXk6IHRvQnl0ZXMgdmFsdWUucHJpdmF0ZUtleVxuICAgICAgICBwdWJsaWNLZXk6IHRvQnl0ZXMgdmFsdWUucHVibGljS2V5XG5cbiAgICBAaXNUeXBlOiBpc1R5cGUgQFxuICAgIEBhcmVUeXBlOiBhcmVUeXBlIEBpc1R5cGVcblxuZXhwb3J0IGRlZmF1bHQgZW5jcnlwdGlvbktleVBhaXJcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/encryption.coffee
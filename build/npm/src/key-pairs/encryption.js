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
    return EncryptionKeyPair;
  }.call(this);
};

var _default = encryptionKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMvZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxpQkFBQSxFQUFBLE9BQUE7O0FBS0EsT0FBQSxHQUFVLFVBQUEsTUFBQSxFQUFBO1NBQVksb0JBQVE7QUFBQSxJQUFBLElBQUEsRUFBQSxRQUFBO0FBQWdCLElBQUEsRUFBQSxFQUFJO0FBQXBCLEdBQVIsRUFBQSxNQUFBLEM7QUFBWixDQUFWOztBQUVBLGlCQUFBLEdBQW9CLFVBQUM7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO0FBQ2xCLE1BQUEsaUJBQUE7U0FBTSxpQkFBQSxHQUFBLFlBQUE7QUFBTixVQUFBLGlCQUFBLFNBQWdDLGdCQUFoQyxDQUFBO0FBRVcsbUJBQVIsTUFBUSxHQUFBO0FBQ1AsWUFBQSxLQUFBLEVBQUEsSUFBQTtBQUFBLFFBQUEsS0FBQSxHQUFRLE1BQU0sV0FBQSxDQUFZLG1CQUFLLEdBQUwsQ0FBbEIsZUFBTSxDQUFkO0FBQ0EsUUFBQSxJQUFBLEdBQU8sbUJBQUssR0FBTCxDQUFTLE9BQVQsQ0FBQSxhQUFBLENBQUEsS0FBQSxDQUFQO2VBQ0EsSUFBQSxpQkFBQSxDQUNFO0FBQUEsVUFBQSxVQUFBLEVBQVksSUFBSSxDQUFoQixTQUFBO0FBQ0EsVUFBQSxTQUFBLEVBQVcsSUFBSSxDQUFDO0FBRGhCLFNBREYsQztBQUhPOztBQU9GLGFBQU4sSUFBTSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7ZUFDTCxJQUFBLGlCQUFBLENBQXlCLFlBQUE7QUFDdkIsVUFBQSxLQUFBLEdBQ0ssSUFBQSxLQUFILE1BQUcsR0FDRCw4QkFERixLQUNFLENBREMsR0FHRCw4QkFBUyxvQkFBUTtBQUFBLFlBQUEsSUFBQSxFQUFBLElBQUE7QUFBWSxZQUFBLEVBQUEsRUFBSTtBQUFoQixXQUFSLEVBQVQsS0FBUyxDQUFULENBSko7aUJBTUE7QUFBQSxZQUFBLFVBQUEsRUFBWSxPQUFBLENBQVEsS0FBSyxDQUF6QixVQUFZLENBQVo7QUFDQSxZQUFBLFNBQUEsRUFBVyxPQUFBLENBQVEsS0FBSyxDQUFiLFNBQUE7QUFEWCxXO0FBUEYsU0FBeUIsRUFBekIsQztBQURLOztBQVRUOztBQUFBO0FBb0JFLElBQUEsaUJBQUMsQ0FBRCxNQUFBLEdBQVMsNEJBQUEsaUJBQUEsQ0FBVDs7R0FwQkksQyxJQUFBLEMsSUFBQSxDO0FBRFksQ0FBcEI7O2VBdUJlLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZSwgZnJvbUpTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtjb252ZXJ0fSBmcm9tIFwiLi4vdXRpbHNcIlxuaW1wb3J0IEtleVBhaXIgZnJvbSBcIi4va2V5LXBhaXJcIlxuXG50b0J5dGVzID0gKHN0cmluZykgLT4gY29udmVydCBmcm9tOiBcImJhc2U2NFwiLCB0bzogXCJieXRlc1wiLCBzdHJpbmdcblxuZW5jcnlwdGlvbktleVBhaXIgPSAoe3JhbmRvbUJ5dGVzfSkgLT5cbiAgY2xhc3MgRW5jcnlwdGlvbktleVBhaXIgZXh0ZW5kcyBLZXlQYWlyXG5cbiAgICBAY3JlYXRlOiAtPlxuICAgICAgaW5wdXQgPSBhd2FpdCByYW5kb21CeXRlcyBuYWNsLmJveC5zZWNyZXRLZXlMZW5ndGhcbiAgICAgIHBhaXIgPSBuYWNsLmJveC5rZXlQYWlyLmZyb21TZWNyZXRLZXkgaW5wdXRcbiAgICAgIG5ldyBFbmNyeXB0aW9uS2V5UGFpclxuICAgICAgICBwcml2YXRlS2V5OiBwYWlyLnNlY3JldEtleVxuICAgICAgICBwdWJsaWNLZXk6IHBhaXIucHVibGljS2V5XG5cbiAgICBAZnJvbTogKGhpbnQsIHZhbHVlKSAtPlxuICAgICAgbmV3IEVuY3J5cHRpb25LZXlQYWlyIGRvIC0+XG4gICAgICAgIHZhbHVlID1cbiAgICAgICAgICBpZiBoaW50ID09IFwidXRmOFwiXG4gICAgICAgICAgICBmcm9tSlNPTiB2YWx1ZVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyb21KU09OIGNvbnZlcnQgZnJvbTogaGludCwgdG86IFwidXRmOFwiLCB2YWx1ZVxuXG4gICAgICAgIHByaXZhdGVLZXk6IHRvQnl0ZXMgdmFsdWUucHJpdmF0ZUtleVxuICAgICAgICBwdWJsaWNLZXk6IHRvQnl0ZXMgdmFsdWUucHVibGljS2V5XG5cbiAgICBAaXNUeXBlOiBpc1R5cGUgQFxuXG5leHBvcnQgZGVmYXVsdCBlbmNyeXB0aW9uS2V5UGFpclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/encryption.coffee
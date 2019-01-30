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

var encryptionKeyPair;

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
          privateKey: _private.default.from("bytes", pair.secretKey),
          publicKey: _public.default.from("bytes", pair.publicKey)
        });
      }

      static from(hint, value) {
        return new EncryptionKeyPair(function () {
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
    EncryptionKeyPair.isType = (0, _pandaParchment.isType)(EncryptionKeyPair);
    EncryptionKeyPair.areType = (0, _utils.areType)(EncryptionKeyPair.isType);
    return EncryptionKeyPair;
  }.call(this);
};

var _default = encryptionKeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFMQSxJQUFBLGlCQUFBOztBQU9BLGlCQUFBLEdBQW9CLFVBQUM7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO0FBQ2xCLE1BQUEsaUJBQUE7U0FBTSxpQkFBQSxHQUFBLFlBQUE7QUFBTixVQUFBLGlCQUFBLFNBQWdDLGdCQUFoQyxDQUFBO0FBRVcsbUJBQVIsTUFBUSxHQUFBO0FBQ1AsWUFBQSxLQUFBLEVBQUEsSUFBQTtBQUFBLFFBQUEsS0FBQSxHQUFRLE1BQU0sV0FBQSxDQUFZLG1CQUFLLEdBQUwsQ0FBbEIsZUFBTSxDQUFkO0FBQ0EsUUFBQSxJQUFBLEdBQU8sbUJBQUssR0FBTCxDQUFTLE9BQVQsQ0FBQSxhQUFBLENBQUEsS0FBQSxDQUFQO2VBQ0EsSUFBQSxpQkFBQSxDQUNFO0FBQUEsVUFBQSxVQUFBLEVBQVksaUJBQUEsSUFBQSxDQUFBLE9BQUEsRUFBeUIsSUFBSSxDQUF6QyxTQUFZLENBQVo7QUFDQSxVQUFBLFNBQUEsRUFBVyxnQkFBQSxJQUFBLENBQUEsT0FBQSxFQUF3QixJQUFJLENBQTVCLFNBQUE7QUFEWCxTQURGLEM7QUFITzs7QUFPRixhQUFOLElBQU0sQ0FBQSxJQUFBLEVBQUEsS0FBQSxFQUFBO2VBQ0wsSUFBQSxpQkFBQSxDQUF5QixZQUFBO0FBQ3ZCLGNBQUEsVUFBQSxFQUFBLFNBQUE7QUFBQSxXQUFBO0FBQUEsWUFBQSxVQUFBO0FBQUEsWUFBQTtBQUFBLGNBQ0ssSUFBQSxLQUFILE1BQUcsR0FDRCw4QkFERixLQUNFLENBREMsR0FHRCw4QkFBUyxvQkFBUTtBQUFBLFlBQUEsSUFBQSxFQUFBLElBQUE7QUFBWSxZQUFBLEVBQUEsRUFBSTtBQUFoQixXQUFSLEVBSmIsS0FJYSxDQUFULENBSko7aUJBTUE7QUFBQSxZQUFBLFVBQUEsRUFBWSxpQkFBQSxJQUFBLENBQUEsUUFBQSxFQUFaLFVBQVksQ0FBWjtBQUNBLFlBQUEsU0FBQSxFQUFXLGdCQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUEsU0FBQTtBQURYLFc7QUFQRixTQUF5QixFQUF6QixDO0FBREs7O0FBVFQ7O0FBQUE7QUFvQkUsSUFBQSxpQkFBQyxDQUFELE1BQUEsR0FBUyw0QkFBQSxpQkFBQSxDQUFUO0FBQ0EsSUFBQSxpQkFBQyxDQUFELE9BQUEsR0FBVSxvQkFBUSxpQkFBQyxDQUFULE1BQUEsQ0FBVjs7R0FyQkksQyxJQUFBLEMsSUFBQSxDO0FBRFksQ0FBcEI7O2VBd0JlLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZSwgZnJvbUpTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtjb252ZXJ0LCBhcmVUeXBlfSBmcm9tIFwiLi4vdXRpbHNcIlxuaW1wb3J0IEtleVBhaXIgZnJvbSBcIi4va2V5LXBhaXJcIlxuaW1wb3J0IFB1YmxpY0tleSBmcm9tIFwiLi4va2V5cy9wdWJsaWNcIlxuaW1wb3J0IFByaXZhdGVLZXkgZnJvbSBcIi4uL2tleXMvcHJpdmF0ZVwiXG5cbmVuY3J5cHRpb25LZXlQYWlyID0gKHtyYW5kb21CeXRlc30pIC0+XG4gIGNsYXNzIEVuY3J5cHRpb25LZXlQYWlyIGV4dGVuZHMgS2V5UGFpclxuXG4gICAgQGNyZWF0ZTogLT5cbiAgICAgIGlucHV0ID0gYXdhaXQgcmFuZG9tQnl0ZXMgbmFjbC5ib3guc2VjcmV0S2V5TGVuZ3RoXG4gICAgICBwYWlyID0gbmFjbC5ib3gua2V5UGFpci5mcm9tU2VjcmV0S2V5IGlucHV0XG4gICAgICBuZXcgRW5jcnlwdGlvbktleVBhaXJcbiAgICAgICAgcHJpdmF0ZUtleTogUHJpdmF0ZUtleS5mcm9tIFwiYnl0ZXNcIiwgcGFpci5zZWNyZXRLZXlcbiAgICAgICAgcHVibGljS2V5OiBQdWJsaWNLZXkuZnJvbSBcImJ5dGVzXCIsIHBhaXIucHVibGljS2V5XG5cbiAgICBAZnJvbTogKGhpbnQsIHZhbHVlKSAtPlxuICAgICAgbmV3IEVuY3J5cHRpb25LZXlQYWlyIGRvIC0+XG4gICAgICAgIHtwcml2YXRlS2V5LCBwdWJsaWNLZXl9ID1cbiAgICAgICAgICBpZiBoaW50ID09IFwidXRmOFwiXG4gICAgICAgICAgICBmcm9tSlNPTiB2YWx1ZVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyb21KU09OIGNvbnZlcnQgZnJvbTogaGludCwgdG86IFwidXRmOFwiLCB2YWx1ZVxuXG4gICAgICAgIHByaXZhdGVLZXk6IFByaXZhdGVLZXkuZnJvbSBcImJhc2U2NFwiLCBwcml2YXRlS2V5XG4gICAgICAgIHB1YmxpY0tleTogUHVibGljS2V5LmZyb20gXCJiYXNlNjRcIiwgcHVibGljS2V5XG5cbiAgICBAaXNUeXBlOiBpc1R5cGUgQFxuICAgIEBhcmVUeXBlOiBhcmVUeXBlIEBpc1R5cGVcblxuZXhwb3J0IGRlZmF1bHQgZW5jcnlwdGlvbktleVBhaXJcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/encryption.coffee
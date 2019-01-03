"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEncryptionKeyPair = exports.encryptionKeyPair = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _keyPair = require("./key-pair");

var _keys = require("../keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EncryptionKeyPair, encryptionKeyPair, isEncryptionKeyPair;
exports.isEncryptionKeyPair = isEncryptionKeyPair;
exports.encryptionKeyPair = encryptionKeyPair;
EncryptionKeyPair = class EncryptionKeyPair extends _keyPair.KeyPair {};
exports.isEncryptionKeyPair = isEncryptionKeyPair = (0, _pandaParchment.isType)(EncryptionKeyPair);

exports.encryptionKeyPair = encryptionKeyPair = function (randomBytes) {
  var getPair; // Generate a random input to generate a pair. Length comes from TweetNaCl.

  getPair = _pandaGenerics.Method.create({
    default: async function () {
      var input, pair;
      input = await randomBytes(_tweetnacl.default.box.secretKeyLength);
      pair = _tweetnacl.default.box.keyPair.fromSecretKey(input);
      return new EncryptionKeyPair({
        privateKey: (0, _keys.privateKey)(pair.secretKey),
        publicKey: (0, _keys.publicKey)(pair.publicKey)
      });
    }
  });

  _pandaGenerics.Method.define(getPair, _pandaParchment.isObject, function (o) {
    return new EncryptionKeyPair(o);
  });

  return getPair;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleS1wYWlycy9lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFKQSxJQUFBLGlCQUFBLEVBQUEsaUJBQUEsRUFBQSxtQkFBQTs7O0FBTU0saUJBQUEsR0FBTixNQUFBLGlCQUFBLFNBQWdDLGdCQUFoQyxDQUFBLEVBQU07QUFFTiw4QkFBQSxtQkFBQSxHQUFzQiw0QkFBQSxpQkFBQSxDQUF0Qjs7QUFFQSw0QkFBQSxpQkFBQSxHQUFvQixVQUFBLFdBQUEsRUFBQTtBQUVsQixNQUFBLE9BQUEsQ0FGa0IsQzs7QUFFbEIsRUFBQSxPQUFBLEdBQVUsc0JBQUEsTUFBQSxDQUNSO0FBQUEsSUFBQSxPQUFBLEVBQVMsa0JBQUE7QUFDUCxVQUFBLEtBQUEsRUFBQSxJQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsTUFBTSxXQUFBLENBQVksbUJBQUssR0FBTCxDQUFsQixlQUFNLENBQWQ7QUFDQSxNQUFBLElBQUEsR0FBTyxtQkFBSyxHQUFMLENBQVMsT0FBVCxDQUFBLGFBQUEsQ0FBQSxLQUFBLENBQVA7YUFDQSxJQUFBLGlCQUFBLENBQ0U7QUFBQSxRQUFBLFVBQUEsRUFBWSxzQkFBVyxJQUFJLENBQTNCLFNBQVksQ0FBWjtBQUNBLFFBQUEsU0FBQSxFQUFXLHFCQUFVLElBQUksQ0FBZCxTQUFBO0FBRFgsT0FERixDO0FBSE87QUFBVCxHQURRLENBQVY7O0FBUUEsd0JBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQSx3QkFBQSxFQUFpQyxVQUFBLENBQUEsRUFBQTtXQUFPLElBQUEsaUJBQUEsQ0FBQSxDQUFBLEM7QUFBeEMsR0FBQTs7U0FDQSxPO0FBWGtCLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZSwgaXNPYmplY3R9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5pbXBvcnQge0tleVBhaXJ9IGZyb20gXCIuL2tleS1wYWlyXCJcbmltcG9ydCB7cHJpdmF0ZUtleSwgcHVibGljS2V5fSBmcm9tIFwiLi4va2V5c1wiXG5cbmNsYXNzIEVuY3J5cHRpb25LZXlQYWlyIGV4dGVuZHMgS2V5UGFpclxuXG5pc0VuY3J5cHRpb25LZXlQYWlyID0gaXNUeXBlIEVuY3J5cHRpb25LZXlQYWlyXG5cbmVuY3J5cHRpb25LZXlQYWlyID0gKHJhbmRvbUJ5dGVzKSAtPlxuICAjIEdlbmVyYXRlIGEgcmFuZG9tIGlucHV0IHRvIGdlbmVyYXRlIGEgcGFpci4gTGVuZ3RoIGNvbWVzIGZyb20gVHdlZXROYUNsLlxuICBnZXRQYWlyID0gTWV0aG9kLmNyZWF0ZVxuICAgIGRlZmF1bHQ6IC0+XG4gICAgICBpbnB1dCA9IGF3YWl0IHJhbmRvbUJ5dGVzIG5hY2wuYm94LnNlY3JldEtleUxlbmd0aFxuICAgICAgcGFpciA9IG5hY2wuYm94LmtleVBhaXIuZnJvbVNlY3JldEtleSBpbnB1dFxuICAgICAgbmV3IEVuY3J5cHRpb25LZXlQYWlyXG4gICAgICAgIHByaXZhdGVLZXk6IHByaXZhdGVLZXkgcGFpci5zZWNyZXRLZXlcbiAgICAgICAgcHVibGljS2V5OiBwdWJsaWNLZXkgcGFpci5wdWJsaWNLZXlcblxuICBNZXRob2QuZGVmaW5lIGdldFBhaXIsIGlzT2JqZWN0LCAobykgLT4gbmV3IEVuY3J5cHRpb25LZXlQYWlyIG9cbiAgZ2V0UGFpclxuXG5cbmV4cG9ydCB7ZW5jcnlwdGlvbktleVBhaXIsIGlzRW5jcnlwdGlvbktleVBhaXJ9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=key-pairs/encryption.coffee
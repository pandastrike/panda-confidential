"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sundog = _interopRequireDefault(require("sundog"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = _interopRequireDefault(require("panda-generics"));

var _kmsKey = require("./kms-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kms;

// Extend Confidential with KMS via sundog.
kms = function (confidential, SDK) {
  var decode, encode, isData, kmsDecrypt, kmsEncrypt, nacl, randomBytes, randomKey;
  ({
    randomKey,
    encrypt: kmsEncrypt,
    decrypt: kmsDecrypt
  } = (0, _sundog.default)(SDK).AWS.KMS());

  confidential.randomBytes = async function (length) {
    return await randomKey(length, "buffer");
  };

  ({
    encode,
    decode,
    isData,
    randomBytes,
    nacl
  } = confidential); // Extension to Symmetric Encryption that encrypts the key with KMS.

  _pandaGenerics.default.define(confidential.encrypt, _kmsKey.isKMSKeyID, isData, async function ({
    id
  }, plaintext) {
    var ciphertext, key, length, lockedKey, nonce, r;
    length = nacl.secretbox.nonceLength + nacl.secretbox.keyLength;
    r = await randomBytes(length);
    key = r.slice(0, nacl.secretbox.keyLength);
    nonce = r.slice(nacl.secretbox.keyLength);
    ciphertext = nacl.secretbox(plaintext, nonce, key);
    lockedKey = await kmsEncrypt(id, key, "buffer");
    return encode({
      lockedKey: lockedKey,
      // Already base64
      ciphertext: encode("base64", ciphertext),
      nonce: encode("base64", nonce)
    });
  });

  _pandaGenerics.default.define(confidential.encrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, _pandaParchment.isString, function (key, plaintext, encoding) {
    return confidential.encrypt(key, decode(encoding, plaintext));
  });

  _pandaGenerics.default.define(confidential.encrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, function (key, plaintext) {
    return confidential.encrypt(key, decode("utf8", plaintext));
  }); // Extension to Symmetric Decryption that encrypts the key with KMS.


  _pandaGenerics.default.define(confidential.decrypt, _kmsKey.isKMSKeyID, isData, _pandaParchment.isString, async function ({
    id
  }, blob, encoding) {
    var ciphertext, key, lockedKey, nonce;
    ({
      ciphertext,
      nonce,
      lockedKey
    } = JSON.parse(encode("utf8", blob)));
    ciphertext = decode("base64", ciphertext);
    nonce = decode("base64", nonce);
    key = await kmsDecrypt(lockedKey, "buffer");
    return encode(encoding, nacl.secretbox.open(ciphertext, nonce, key));
  });

  _pandaGenerics.default.define(confidential.decrypt, _kmsKey.isKMSKeyID, isData, function (key, blob) {
    return confidential.decrypt(key, blob, "utf8");
  });

  _pandaGenerics.default.define(confidential.decrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, _pandaParchment.isString, function (key, blob, encoding) {
    return confidential.decrypt(key, decode("base64", blob), encoding);
  });

  _pandaGenerics.default.define(confidential.decrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, function (key, blob) {
    return confidential.decrypt(key, decode("base64", blob), "utf8");
  });

  return confidential;
};

var _default = kms;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9rbXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsR0FBQTs7O0FBTUEsR0FBQSxHQUFNLFVBQUEsWUFBQSxFQUFBLEdBQUEsRUFBQTtBQUNKLE1BQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxJQUFBLEVBQUEsV0FBQSxFQUFBLFNBQUE7QUFBQSxHQUFBO0FBQUEsSUFBQSxTQUFBO0FBQVksSUFBQSxPQUFBLEVBQVosVUFBQTtBQUFnQyxJQUFBLE9BQUEsRUFBUTtBQUF4QyxNQUF1RCxxQkFBRCxHQUFDLENBQUQsQ0FBYSxHQUFiLENBQXRELEdBQXNELEVBQXREOztBQUVBLEVBQUEsWUFBWSxDQUFaLFdBQUEsR0FBMkIsZ0JBQUEsTUFBQSxFQUFBO0FBQVksV0FBQSxNQUFNLFNBQUEsQ0FBQSxNQUFBLEVBQU4sUUFBTSxDQUFOO0FBQVosR0FBM0I7O0FBQ0EsR0FBQTtBQUFBLElBQUEsTUFBQTtBQUFBLElBQUEsTUFBQTtBQUFBLElBQUEsTUFBQTtBQUFBLElBQUEsV0FBQTtBQUFBLElBQUE7QUFBQSxNQUhBLFlBR0EsRUFKSSxDOztBQU9KLHlCQUFBLE1BQUEsQ0FBYyxZQUFZLENBQTFCLE9BQUEsRUFBQSxrQkFBQSxFQUFBLE1BQUEsRUFDRSxnQkFBQztBQUFELElBQUE7QUFBQyxHQUFELEVBQUEsU0FBQSxFQUFBO0FBQ0UsUUFBQSxVQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLENBQUE7QUFBQSxJQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBTCxDQUFBLFdBQUEsR0FBNkIsSUFBSSxDQUFDLFNBQUwsQ0FBZSxTQUFyRDtBQUNBLElBQUEsQ0FBQSxHQUFJLE1BQU0sV0FBQSxDQUFOLE1BQU0sQ0FBVjtBQUNBLElBQUEsR0FBQSxHQUFNLENBQUMsQ0FBRCxLQUFBLENBQUEsQ0FBQSxFQUFXLElBQUksQ0FBQyxTQUFMLENBQVgsU0FBQSxDQUFOO0FBQ0EsSUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFELEtBQUEsQ0FBUSxJQUFJLENBQUMsU0FBTCxDQUFSLFNBQUEsQ0FBUjtBQUVBLElBQUEsVUFBQSxHQUFhLElBQUksQ0FBSixTQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLENBQWI7QUFDQSxJQUFBLFNBQUEsR0FBWSxNQUFNLFVBQUEsQ0FBQSxFQUFBLEVBQUEsR0FBQSxFQUFOLFFBQU0sQ0FBbEI7V0FDQSxNQUFBLENBQ0U7QUFBQSxNQUFBLFNBQUEsRUFBQSxTQUFBO0FBQUE7QUFDQSxNQUFBLFVBQUEsRUFBWSxNQUFBLENBQUEsUUFBQSxFQURaLFVBQ1ksQ0FEWjtBQUVBLE1BQUEsS0FBQSxFQUFPLE1BQUEsQ0FBQSxRQUFBLEVBQUEsS0FBQTtBQUZQLEtBREYsQztBQVRKLEdBQUE7O0FBY0EseUJBQUEsTUFBQSxDQUFjLFlBQVksQ0FBMUIsT0FBQSxFQUFBLGtCQUFBLEVBQUEsd0JBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsR0FBQSxFQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUE7V0FDRSxZQUFZLENBQVosT0FBQSxDQUFBLEdBQUEsRUFBMEIsTUFBQSxDQUFBLFFBQUEsRUFBMUIsU0FBMEIsQ0FBMUIsQztBQUZKLEdBQUE7O0FBR0EseUJBQUEsTUFBQSxDQUFjLFlBQVksQ0FBMUIsT0FBQSxFQUFBLGtCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEdBQUEsRUFBQSxTQUFBLEVBQUE7V0FDRSxZQUFZLENBQVosT0FBQSxDQUFBLEdBQUEsRUFBMEIsTUFBQSxDQUFBLE1BQUEsRUFBMUIsU0FBMEIsQ0FBMUIsQztBQXpCSixHQXVCQSxFQXhCSSxDOzs7QUE2QkoseUJBQUEsTUFBQSxDQUFjLFlBQVksQ0FBMUIsT0FBQSxFQUFBLGtCQUFBLEVBQUEsTUFBQSxFQUFBLHdCQUFBLEVBQ0UsZ0JBQUM7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUE7QUFDRSxRQUFBLFVBQUEsRUFBQSxHQUFBLEVBQUEsU0FBQSxFQUFBLEtBQUE7QUFBQSxLQUFBO0FBQUEsTUFBQSxVQUFBO0FBQUEsTUFBQSxLQUFBO0FBQUEsTUFBQTtBQUFBLFFBQWlDLElBQUksQ0FBSixLQUFBLENBQVcsTUFBQSxDQUFBLE1BQUEsRUFBNUMsSUFBNEMsQ0FBWCxDQUFqQztBQUNBLElBQUEsVUFBQSxHQUFhLE1BQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxDQUFiO0FBQ0EsSUFBQSxLQUFBLEdBQVEsTUFBQSxDQUFBLFFBQUEsRUFBQSxLQUFBLENBQVI7QUFDQSxJQUFBLEdBQUEsR0FBTSxNQUFNLFVBQUEsQ0FBQSxTQUFBLEVBQU4sUUFBTSxDQUFaO1dBQ0EsTUFBQSxDQUFBLFFBQUEsRUFBaUIsSUFBSSxDQUFDLFNBQUwsQ0FBQSxJQUFBLENBQUEsVUFBQSxFQUFBLEtBQUEsRUFBakIsR0FBaUIsQ0FBakIsQztBQU5KLEdBQUE7O0FBT0EseUJBQUEsTUFBQSxDQUFjLFlBQVksQ0FBMUIsT0FBQSxFQUFBLGtCQUFBLEVBQUEsTUFBQSxFQUNFLFVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtXQUNFLFlBQVksQ0FBWixPQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEM7QUFGSixHQUFBOztBQUdBLHlCQUFBLE1BQUEsQ0FBYyxZQUFZLENBQTFCLE9BQUEsRUFBQSxrQkFBQSxFQUFBLHdCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBO1dBQ0UsWUFBWSxDQUFaLE9BQUEsQ0FBQSxHQUFBLEVBQTBCLE1BQUEsQ0FBQSxRQUFBLEVBQTFCLElBQTBCLENBQTFCLEVBQUEsUUFBQSxDO0FBRkosR0FBQTs7QUFHQSx5QkFBQSxNQUFBLENBQWMsWUFBWSxDQUExQixPQUFBLEVBQUEsa0JBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtXQUNFLFlBQVksQ0FBWixPQUFBLENBQUEsR0FBQSxFQUEwQixNQUFBLENBQUEsUUFBQSxFQUExQixJQUEwQixDQUExQixFQUFBLE1BQUEsQztBQUZKLEdBQUE7O1NBSUEsWTtBQTlDSSxDQUFOOztlQWdEZSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN1bmRvZyBmcm9tIFwic3VuZG9nXCJcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IE1ldGhvZCBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuaW1wb3J0IHtpc0tNU0tleUlEfSBmcm9tIFwiLi9rbXMta2V5XCJcblxuIyBFeHRlbmQgQ29uZmlkZW50aWFsIHdpdGggS01TIHZpYSBzdW5kb2cuXG5rbXMgPSAoY29uZmlkZW50aWFsLCBTREspIC0+XG4gIHtyYW5kb21LZXksIGVuY3J5cHQ6a21zRW5jcnlwdCwgZGVjcnlwdDprbXNEZWNyeXB0fSA9IChTdW5kb2cgU0RLKS5BV1MuS01TKClcblxuICBjb25maWRlbnRpYWwucmFuZG9tQnl0ZXMgPSAobGVuZ3RoKSAtPiBhd2FpdCByYW5kb21LZXkgbGVuZ3RoLCBcImJ1ZmZlclwiXG4gIHtlbmNvZGUsIGRlY29kZSwgaXNEYXRhLCByYW5kb21CeXRlcywgbmFjbH0gPSBjb25maWRlbnRpYWxcblxuICAjIEV4dGVuc2lvbiB0byBTeW1tZXRyaWMgRW5jcnlwdGlvbiB0aGF0IGVuY3J5cHRzIHRoZSBrZXkgd2l0aCBLTVMuXG4gIE1ldGhvZC5kZWZpbmUgY29uZmlkZW50aWFsLmVuY3J5cHQsIGlzS01TS2V5SUQsIGlzRGF0YSxcbiAgICAoe2lkfSwgcGxhaW50ZXh0KSAtPlxuICAgICAgbGVuZ3RoID0gbmFjbC5zZWNyZXRib3gubm9uY2VMZW5ndGggKyBuYWNsLnNlY3JldGJveC5rZXlMZW5ndGhcbiAgICAgIHIgPSBhd2FpdCByYW5kb21CeXRlcyBsZW5ndGhcbiAgICAgIGtleSA9IHIuc2xpY2UgMCwgbmFjbC5zZWNyZXRib3gua2V5TGVuZ3RoXG4gICAgICBub25jZSA9IHIuc2xpY2UgbmFjbC5zZWNyZXRib3gua2V5TGVuZ3RoXG5cbiAgICAgIGNpcGhlcnRleHQgPSBuYWNsLnNlY3JldGJveCBwbGFpbnRleHQsIG5vbmNlLCBrZXlcbiAgICAgIGxvY2tlZEtleSA9IGF3YWl0IGttc0VuY3J5cHQgaWQsIGtleSwgXCJidWZmZXJcIlxuICAgICAgZW5jb2RlXG4gICAgICAgIGxvY2tlZEtleTogbG9ja2VkS2V5ICMgQWxyZWFkeSBiYXNlNjRcbiAgICAgICAgY2lwaGVydGV4dDogZW5jb2RlIFwiYmFzZTY0XCIsIGNpcGhlcnRleHRcbiAgICAgICAgbm9uY2U6IGVuY29kZSBcImJhc2U2NFwiLCBub25jZVxuXG4gIE1ldGhvZC5kZWZpbmUgY29uZmlkZW50aWFsLmVuY3J5cHQsIGlzS01TS2V5SUQsIGlzU3RyaW5nLCBpc1N0cmluZyxcbiAgICAoa2V5LCBwbGFpbnRleHQsIGVuY29kaW5nKSAtPlxuICAgICAgY29uZmlkZW50aWFsLmVuY3J5cHQga2V5LCBkZWNvZGUoZW5jb2RpbmcsIHBsYWludGV4dClcbiAgTWV0aG9kLmRlZmluZSBjb25maWRlbnRpYWwuZW5jcnlwdCwgaXNLTVNLZXlJRCwgaXNTdHJpbmcsXG4gICAgKGtleSwgcGxhaW50ZXh0KSAtPlxuICAgICAgY29uZmlkZW50aWFsLmVuY3J5cHQga2V5LCBkZWNvZGUoXCJ1dGY4XCIsIHBsYWludGV4dClcblxuICAjIEV4dGVuc2lvbiB0byBTeW1tZXRyaWMgRGVjcnlwdGlvbiB0aGF0IGVuY3J5cHRzIHRoZSBrZXkgd2l0aCBLTVMuXG4gIE1ldGhvZC5kZWZpbmUgY29uZmlkZW50aWFsLmRlY3J5cHQsIGlzS01TS2V5SUQsIGlzRGF0YSwgaXNTdHJpbmcsXG4gICAgKHtpZH0sIGJsb2IsIGVuY29kaW5nKSAtPlxuICAgICAge2NpcGhlcnRleHQsIG5vbmNlLCBsb2NrZWRLZXl9ID0gSlNPTi5wYXJzZSBlbmNvZGUgXCJ1dGY4XCIsIGJsb2JcbiAgICAgIGNpcGhlcnRleHQgPSBkZWNvZGUgXCJiYXNlNjRcIiwgY2lwaGVydGV4dFxuICAgICAgbm9uY2UgPSBkZWNvZGUgXCJiYXNlNjRcIiwgbm9uY2VcbiAgICAgIGtleSA9IGF3YWl0IGttc0RlY3J5cHQgbG9ja2VkS2V5LCBcImJ1ZmZlclwiXG4gICAgICBlbmNvZGUgZW5jb2RpbmcsIG5hY2wuc2VjcmV0Ym94Lm9wZW4gY2lwaGVydGV4dCwgbm9uY2UsIGtleVxuICBNZXRob2QuZGVmaW5lIGNvbmZpZGVudGlhbC5kZWNyeXB0LCBpc0tNU0tleUlELCBpc0RhdGEsXG4gICAgKGtleSwgYmxvYikgLT5cbiAgICAgIGNvbmZpZGVudGlhbC5kZWNyeXB0IGtleSwgYmxvYiwgXCJ1dGY4XCJcbiAgTWV0aG9kLmRlZmluZSBjb25maWRlbnRpYWwuZGVjcnlwdCwgaXNLTVNLZXlJRCwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAgIChrZXksIGJsb2IsIGVuY29kaW5nKSAtPlxuICAgICAgY29uZmlkZW50aWFsLmRlY3J5cHQga2V5LCBkZWNvZGUoXCJiYXNlNjRcIiwgYmxvYiksIGVuY29kaW5nXG4gIE1ldGhvZC5kZWZpbmUgY29uZmlkZW50aWFsLmRlY3J5cHQsIGlzS01TS2V5SUQsIGlzU3RyaW5nLFxuICAgIChrZXksIGJsb2IpIC0+XG4gICAgICBjb25maWRlbnRpYWwuZGVjcnlwdCBrZXksIGRlY29kZShcImJhc2U2NFwiLCBibG9iKSwgXCJ1dGY4XCJcblxuICBjb25maWRlbnRpYWxcblxuZXhwb3J0IGRlZmF1bHQga21zXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/kms.coffee
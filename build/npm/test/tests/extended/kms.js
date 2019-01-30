"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sundog = _interopRequireDefault(require("sundog"));

var _pandaParchment = require("panda-parchment");

var _fairmontMultimethods = require("fairmont-multimethods");

var _kmsKey = require("./kms-key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kms;

// Extend Confidential with KMS via sundog.
kms = function (confidential, SDK) {
  var decode, encode, isData, kmsDecrypt, kmsEncrypt, nacl, randomBytes, randomKey;
  ({
    AWS: {
      KMS: {
        randomKey,
        encrypt: kmsEncrypt,
        decrypt: kmsDecrypt
      }
    }
  } = (0, _sundog.default)(SDK));

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

  _fairmontMultimethods.Method.define(confidential.encrypt, _kmsKey.isKMSKeyID, isData, async function ({
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

  _fairmontMultimethods.Method.define(confidential.encrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, _pandaParchment.isString, function (key, plaintext, encoding) {
    return confidential.encrypt(key, decode(encoding, plaintext));
  });

  _fairmontMultimethods.Method.define(confidential.encrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, function (key, plaintext) {
    return confidential.encrypt(key, decode("utf8", plaintext));
  }); // Extension to Symmetric Decryption that encrypts the key with KMS.


  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, isData, _pandaParchment.isString, async function ({
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

  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, isData, function (key, blob) {
    return confidential.decrypt(key, blob, "utf8");
  });

  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, _pandaParchment.isString, function (key, blob, encoding) {
    return confidential.decrypt(key, decode("base64", blob), encoding);
  });

  _fairmontMultimethods.Method.define(confidential.decrypt, _kmsKey.isKMSKeyID, _pandaParchment.isString, function (key, blob) {
    return confidential.decrypt(key, decode("base64", blob), "utf8");
  });

  return confidential;
};

var _default = kms;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9rbXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsR0FBQTs7O0FBTUEsR0FBQSxHQUFNLFVBQUEsWUFBQSxFQUFBLEdBQUEsRUFBQTtBQUNKLE1BQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxJQUFBLEVBQUEsV0FBQSxFQUFBLFNBQUE7QUFBQSxHQUFBO0FBQUMsSUFBQSxHQUFBLEVBQUk7QUFBQSxNQUFBLEdBQUEsRUFBSTtBQUFBLFFBQUEsU0FBQTtBQUFZLFFBQUEsT0FBQSxFQUFaLFVBQUE7QUFBZ0MsUUFBQSxPQUFBLEVBQVE7QUFBeEM7QUFBSjtBQUFMLE1BQWdFLHFCQUFoRSxHQUFnRSxDQUFoRTs7QUFFQSxFQUFBLFlBQVksQ0FBWixXQUFBLEdBQTJCLGdCQUFBLE1BQUEsRUFBQTtBQUFZLFdBQUEsTUFBTSxTQUFBLENBQUEsTUFBQSxFQUFOLFFBQU0sQ0FBTjtBQUFaLEdBQTNCOztBQUNBLEdBQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLFdBQUE7QUFBQSxJQUFBO0FBQUEsTUFIQSxZQUdBLEVBSkksQzs7QUFPSiwrQkFBQSxNQUFBLENBQWMsWUFBWSxDQUExQixPQUFBLEVBQUEsa0JBQUEsRUFBQSxNQUFBLEVBQ0UsZ0JBQUM7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBLFNBQUEsRUFBQTtBQUNFLFFBQUEsVUFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxDQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQUwsQ0FBQSxXQUFBLEdBQTZCLElBQUksQ0FBQyxTQUFMLENBQWUsU0FBckQ7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T0FBQSxFQUFBLGtCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7V0FDRSxZQUFZLENBQVosT0FBQSxDQUFBLEdBQUEsRUFBMEIsTUFBQSxDQUFBLFFBQUEsRUFBMUIsSUFBMEIsQ0FBMUIsRUFBQSxNQUFBLEM7QUFGSixHQUFBOztTQUlBLFk7QUE5Q0ksQ0FBTjs7ZUFnRGUsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdW5kb2cgZnJvbSBcInN1bmRvZ1wiXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwiZmFpcm1vbnQtbXVsdGltZXRob2RzXCJcbmltcG9ydCB7aXNLTVNLZXlJRH0gZnJvbSBcIi4va21zLWtleVwiXG5cbiMgRXh0ZW5kIENvbmZpZGVudGlhbCB3aXRoIEtNUyB2aWEgc3VuZG9nLlxua21zID0gKGNvbmZpZGVudGlhbCwgU0RLKSAtPlxuICB7QVdTOktNUzp7cmFuZG9tS2V5LCBlbmNyeXB0Omttc0VuY3J5cHQsIGRlY3J5cHQ6a21zRGVjcnlwdH19ID0gU3VuZG9nIFNES1xuXG4gIGNvbmZpZGVudGlhbC5yYW5kb21CeXRlcyA9IChsZW5ndGgpIC0+IGF3YWl0IHJhbmRvbUtleSBsZW5ndGgsIFwiYnVmZmVyXCJcbiAge2VuY29kZSwgZGVjb2RlLCBpc0RhdGEsIHJhbmRvbUJ5dGVzLCBuYWNsfSA9IGNvbmZpZGVudGlhbFxuXG4gICMgRXh0ZW5zaW9uIHRvIFN5bW1ldHJpYyBFbmNyeXB0aW9uIHRoYXQgZW5jcnlwdHMgdGhlIGtleSB3aXRoIEtNUy5cbiAgTWV0aG9kLmRlZmluZSBjb25maWRlbnRpYWwuZW5jcnlwdCwgaXNLTVNLZXlJRCwgaXNEYXRhLFxuICAgICh7aWR9LCBwbGFpbnRleHQpIC0+XG4gICAgICBsZW5ndGggPSBuYWNsLnNlY3JldGJveC5ub25jZUxlbmd0aCArIG5hY2wuc2VjcmV0Ym94LmtleUxlbmd0aFxuICAgICAgciA9IGF3YWl0IHJhbmRvbUJ5dGVzIGxlbmd0aFxuICAgICAga2V5ID0gci5zbGljZSAwLCBuYWNsLnNlY3JldGJveC5rZXlMZW5ndGhcbiAgICAgIG5vbmNlID0gci5zbGljZSBuYWNsLnNlY3JldGJveC5rZXlMZW5ndGhcblxuICAgICAgY2lwaGVydGV4dCA9IG5hY2wuc2VjcmV0Ym94IHBsYWludGV4dCwgbm9uY2UsIGtleVxuICAgICAgbG9ja2VkS2V5ID0gYXdhaXQga21zRW5jcnlwdCBpZCwga2V5LCBcImJ1ZmZlclwiXG4gICAgICBlbmNvZGVcbiAgICAgICAgbG9ja2VkS2V5OiBsb2NrZWRLZXkgIyBBbHJlYWR5IGJhc2U2NFxuICAgICAgICBjaXBoZXJ0ZXh0OiBlbmNvZGUgXCJiYXNlNjRcIiwgY2lwaGVydGV4dFxuICAgICAgICBub25jZTogZW5jb2RlIFwiYmFzZTY0XCIsIG5vbmNlXG5cbiAgTWV0aG9kLmRlZmluZSBjb25maWRlbnRpYWwuZW5jcnlwdCwgaXNLTVNLZXlJRCwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAgIChrZXksIHBsYWludGV4dCwgZW5jb2RpbmcpIC0+XG4gICAgICBjb25maWRlbnRpYWwuZW5jcnlwdCBrZXksIGRlY29kZShlbmNvZGluZywgcGxhaW50ZXh0KVxuICBNZXRob2QuZGVmaW5lIGNvbmZpZGVudGlhbC5lbmNyeXB0LCBpc0tNU0tleUlELCBpc1N0cmluZyxcbiAgICAoa2V5LCBwbGFpbnRleHQpIC0+XG4gICAgICBjb25maWRlbnRpYWwuZW5jcnlwdCBrZXksIGRlY29kZShcInV0ZjhcIiwgcGxhaW50ZXh0KVxuXG4gICMgRXh0ZW5zaW9uIHRvIFN5bW1ldHJpYyBEZWNyeXB0aW9uIHRoYXQgZW5jcnlwdHMgdGhlIGtleSB3aXRoIEtNUy5cbiAgTWV0aG9kLmRlZmluZSBjb25maWRlbnRpYWwuZGVjcnlwdCwgaXNLTVNLZXlJRCwgaXNEYXRhLCBpc1N0cmluZyxcbiAgICAoe2lkfSwgYmxvYiwgZW5jb2RpbmcpIC0+XG4gICAgICB7Y2lwaGVydGV4dCwgbm9uY2UsIGxvY2tlZEtleX0gPSBKU09OLnBhcnNlIGVuY29kZSBcInV0ZjhcIiwgYmxvYlxuICAgICAgY2lwaGVydGV4dCA9IGRlY29kZSBcImJhc2U2NFwiLCBjaXBoZXJ0ZXh0XG4gICAgICBub25jZSA9IGRlY29kZSBcImJhc2U2NFwiLCBub25jZVxuICAgICAga2V5ID0gYXdhaXQga21zRGVjcnlwdCBsb2NrZWRLZXksIFwiYnVmZmVyXCJcbiAgICAgIGVuY29kZSBlbmNvZGluZywgbmFjbC5zZWNyZXRib3gub3BlbiBjaXBoZXJ0ZXh0LCBub25jZSwga2V5XG4gIE1ldGhvZC5kZWZpbmUgY29uZmlkZW50aWFsLmRlY3J5cHQsIGlzS01TS2V5SUQsIGlzRGF0YSxcbiAgICAoa2V5LCBibG9iKSAtPlxuICAgICAgY29uZmlkZW50aWFsLmRlY3J5cHQga2V5LCBibG9iLCBcInV0ZjhcIlxuICBNZXRob2QuZGVmaW5lIGNvbmZpZGVudGlhbC5kZWNyeXB0LCBpc0tNU0tleUlELCBpc1N0cmluZywgaXNTdHJpbmcsXG4gICAgKGtleSwgYmxvYiwgZW5jb2RpbmcpIC0+XG4gICAgICBjb25maWRlbnRpYWwuZGVjcnlwdCBrZXksIGRlY29kZShcImJhc2U2NFwiLCBibG9iKSwgZW5jb2RpbmdcbiAgTWV0aG9kLmRlZmluZSBjb25maWRlbnRpYWwuZGVjcnlwdCwgaXNLTVNLZXlJRCwgaXNTdHJpbmcsXG4gICAgKGtleSwgYmxvYikgLT5cbiAgICAgIGNvbmZpZGVudGlhbC5kZWNyeXB0IGtleSwgZGVjb2RlKFwiYmFzZTY0XCIsIGJsb2IpLCBcInV0ZjhcIlxuXG4gIGNvbmZpZGVudGlhbFxuXG5leHBvcnQgZGVmYXVsdCBrbXNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/kms.coffee
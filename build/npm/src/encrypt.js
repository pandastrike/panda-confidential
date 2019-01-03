"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _utils = require("./utils");

var _keys = require("./keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Encrypt;

Encrypt = function (randomBytes) {
  var encrypt; // Define a multimethod to export.

  encrypt = _pandaGenerics.Method.create(); // Symmetric Encryption

  _pandaGenerics.Method.define(encrypt, _keys.isSymmetricKey, _utils.isData, async function ({
    key
  }, plaintext) {
    var ciphertext, nonce;
    nonce = await randomBytes(_tweetnacl.default.secretbox.nonceLength);
    ciphertext = _tweetnacl.default.secretbox(plaintext, nonce, key);
    return (0, _utils.encode)({
      ciphertext: (0, _utils.encode)("base64", ciphertext),
      nonce: (0, _utils.encode)("base64", nonce)
    });
  });

  _pandaGenerics.Method.define(encrypt, _keys.isSymmetricKey, _pandaParchment.isString, _pandaParchment.isString, function (key, plaintext, encoding) {
    return encrypt(key, (0, _utils.decode)(encoding, plaintext));
  });

  _pandaGenerics.Method.define(encrypt, _keys.isSymmetricKey, _pandaParchment.isString, function (key, plaintext) {
    return encrypt(key, (0, _utils.decode)("utf8", plaintext));
  }); // Asymmetric Encryption via shared key.


  _pandaGenerics.Method.define(encrypt, _keys.isSharedKey, _utils.isData, async function ({
    key
  }, plaintext) {
    var ciphertext, nonce;
    nonce = await randomBytes(_tweetnacl.default.box.nonceLength);
    ciphertext = _tweetnacl.default.box.after(plaintext, nonce, key);
    return (0, _utils.encode)({
      ciphertext: (0, _utils.encode)("base64", ciphertext),
      nonce: (0, _utils.encode)("base64", nonce)
    });
  });

  _pandaGenerics.Method.define(encrypt, _keys.isSharedKey, _pandaParchment.isString, _pandaParchment.isString, function (key, plaintext, encoding) {
    return encrypt(key, (0, _utils.decode)(encoding, plaintext));
  });

  _pandaGenerics.Method.define(encrypt, _keys.isSharedKey, _pandaParchment.isString, function (key, plaintext) {
    return encrypt(key, (0, _utils.decode)("utf8", plaintext));
  }); // Return the multimethod.


  return encrypt;
};

var _default = Encrypt;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuY3J5cHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUxBLElBQUEsT0FBQTs7QUFPQSxPQUFBLEdBQVUsVUFBQSxXQUFBLEVBQUE7QUFFUixNQUFBLE9BQUEsQ0FGUSxDOztBQUVSLEVBQUEsT0FBQSxHQUFVLHNCQUFWLE1BQVUsRUFBVixDQUZRLEM7O0FBS1Isd0JBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQSxvQkFBQSxFQUFBLGFBQUEsRUFDRSxnQkFBQztBQUFELElBQUE7QUFBQyxHQUFELEVBQUEsU0FBQSxFQUFBO0FBQ0UsUUFBQSxVQUFBLEVBQUEsS0FBQTtBQUFBLElBQUEsS0FBQSxHQUFRLE1BQU0sV0FBQSxDQUFZLG1CQUFLLFNBQUwsQ0FBbEIsV0FBTSxDQUFkO0FBQ0EsSUFBQSxVQUFBLEdBQWEsbUJBQUEsU0FBQSxDQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxDQUFiO1dBQ0EsbUJBQ0U7QUFBQSxNQUFBLFVBQUEsRUFBWSxtQkFBQSxRQUFBLEVBQVosVUFBWSxDQUFaO0FBQ0EsTUFBQSxLQUFBLEVBQU8sbUJBQUEsUUFBQSxFQUFBLEtBQUE7QUFEUCxLQURGLEM7QUFKSixHQUFBOztBQVFBLHdCQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUEsRUFBQSx3QkFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQSxHQUFBLEVBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQTtXQUE4QixPQUFBLENBQUEsR0FBQSxFQUFhLG1CQUFBLFFBQUEsRUFBYixTQUFhLENBQWIsQztBQURoQyxHQUFBOztBQUVBLHdCQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsR0FBQSxFQUFBLFNBQUEsRUFBQTtXQUFvQixPQUFBLENBQUEsR0FBQSxFQUFhLG1CQUFBLE1BQUEsRUFBYixTQUFhLENBQWIsQztBQWR0QixHQWFBLEVBZlEsQzs7O0FBbUJSLHdCQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQUEsaUJBQUEsRUFBQSxhQUFBLEVBQ0UsZ0JBQUM7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBLFNBQUEsRUFBQTtBQUNFLFFBQUEsVUFBQSxFQUFBLEtBQUE7QUFBQSxJQUFBLEtBQUEsR0FBUSxNQUFNLFdBQUEsQ0FBWSxtQkFBSyxHQUFMLENBQWxCLFdBQU0sQ0FBZDtBQUNBLElBQUEsVUFBQSxHQUFhLG1CQUFLLEdBQUwsQ0FBQSxLQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLENBQWI7V0FDQSxtQkFDRTtBQUFBLE1BQUEsVUFBQSxFQUFZLG1CQUFBLFFBQUEsRUFBWixVQUFZLENBQVo7QUFDQSxNQUFBLEtBQUEsRUFBTyxtQkFBQSxRQUFBLEVBQUEsS0FBQTtBQURQLEtBREYsQztBQUpKLEdBQUE7O0FBUUEsd0JBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQSxpQkFBQSxFQUFBLHdCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEdBQUEsRUFBQSxTQUFBLEVBQUEsUUFBQSxFQUFBO1dBQThCLE9BQUEsQ0FBQSxHQUFBLEVBQWEsbUJBQUEsUUFBQSxFQUFiLFNBQWEsQ0FBYixDO0FBRGhDLEdBQUE7O0FBRUEsd0JBQUEsTUFBQSxDQUFBLE9BQUEsRUFBQSxpQkFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQSxHQUFBLEVBQUEsU0FBQSxFQUFBO1dBQW9CLE9BQUEsQ0FBQSxHQUFBLEVBQWEsbUJBQUEsTUFBQSxFQUFiLFNBQWEsQ0FBYixDO0FBNUJ0QixHQTJCQSxFQTdCUSxDOzs7U0FpQ1IsTztBQWpDUSxDQUFWOztlQW1DZSxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuXG5pbXBvcnQge2RlY29kZSwgZW5jb2RlLCBpc0RhdGF9IGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCB7aXNTeW1tZXRyaWNLZXksIGlzU2hhcmVkS2V5fSBmcm9tIFwiLi9rZXlzXCJcblxuRW5jcnlwdCA9IChyYW5kb21CeXRlcykgLT5cbiAgIyBEZWZpbmUgYSBtdWx0aW1ldGhvZCB0byBleHBvcnQuXG4gIGVuY3J5cHQgPSBNZXRob2QuY3JlYXRlKClcblxuICAjIFN5bW1ldHJpYyBFbmNyeXB0aW9uXG4gIE1ldGhvZC5kZWZpbmUgZW5jcnlwdCwgaXNTeW1tZXRyaWNLZXksIGlzRGF0YSxcbiAgICAoe2tleX0sIHBsYWludGV4dCkgLT5cbiAgICAgIG5vbmNlID0gYXdhaXQgcmFuZG9tQnl0ZXMgbmFjbC5zZWNyZXRib3gubm9uY2VMZW5ndGhcbiAgICAgIGNpcGhlcnRleHQgPSBuYWNsLnNlY3JldGJveCBwbGFpbnRleHQsIG5vbmNlLCBrZXlcbiAgICAgIGVuY29kZVxuICAgICAgICBjaXBoZXJ0ZXh0OiBlbmNvZGUgXCJiYXNlNjRcIiwgY2lwaGVydGV4dFxuICAgICAgICBub25jZTogZW5jb2RlIFwiYmFzZTY0XCIsIG5vbmNlXG5cbiAgTWV0aG9kLmRlZmluZSBlbmNyeXB0LCBpc1N5bW1ldHJpY0tleSwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAgIChrZXksIHBsYWludGV4dCwgZW5jb2RpbmcpIC0+IGVuY3J5cHQga2V5LCBkZWNvZGUoZW5jb2RpbmcsIHBsYWludGV4dClcbiAgTWV0aG9kLmRlZmluZSBlbmNyeXB0LCBpc1N5bW1ldHJpY0tleSwgaXNTdHJpbmcsXG4gICAgKGtleSwgcGxhaW50ZXh0KSAtPiBlbmNyeXB0IGtleSwgZGVjb2RlKFwidXRmOFwiLCBwbGFpbnRleHQpXG5cbiAgIyBBc3ltbWV0cmljIEVuY3J5cHRpb24gdmlhIHNoYXJlZCBrZXkuXG4gIE1ldGhvZC5kZWZpbmUgZW5jcnlwdCwgaXNTaGFyZWRLZXksIGlzRGF0YSxcbiAgICAoe2tleX0sIHBsYWludGV4dCkgLT5cbiAgICAgIG5vbmNlID0gYXdhaXQgcmFuZG9tQnl0ZXMgbmFjbC5ib3gubm9uY2VMZW5ndGhcbiAgICAgIGNpcGhlcnRleHQgPSBuYWNsLmJveC5hZnRlciBwbGFpbnRleHQsIG5vbmNlLCBrZXlcbiAgICAgIGVuY29kZVxuICAgICAgICBjaXBoZXJ0ZXh0OiBlbmNvZGUgXCJiYXNlNjRcIiwgY2lwaGVydGV4dFxuICAgICAgICBub25jZTogZW5jb2RlIFwiYmFzZTY0XCIsIG5vbmNlXG5cbiAgTWV0aG9kLmRlZmluZSBlbmNyeXB0LCBpc1NoYXJlZEtleSwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAgIChrZXksIHBsYWludGV4dCwgZW5jb2RpbmcpIC0+IGVuY3J5cHQga2V5LCBkZWNvZGUoZW5jb2RpbmcsIHBsYWludGV4dClcbiAgTWV0aG9kLmRlZmluZSBlbmNyeXB0LCBpc1NoYXJlZEtleSwgaXNTdHJpbmcsXG4gICAgKGtleSwgcGxhaW50ZXh0KSAtPiBlbmNyeXB0IGtleSwgZGVjb2RlKFwidXRmOFwiLCBwbGFpbnRleHQpXG5cbiAgIyBSZXR1cm4gdGhlIG11bHRpbWV0aG9kLlxuICBlbmNyeXB0XG5cbmV4cG9ydCBkZWZhdWx0IEVuY3J5cHRcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=encrypt.coffee
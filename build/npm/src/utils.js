"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAllowedHint = exports.isBytes = exports.convert = void 0;

var _tweetnaclUtil = _interopRequireDefault(require("tweetnacl-util"));

var _pandaGarden = require("panda-garden");

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowedHints,
    convert,
    decode,
    decodeBase64,
    decodeUTF8,
    encode,
    encodeBase64,
    encodeUTF8,
    hint,
    isAllowedHint,
    isBytes,
    isHint,
    indexOf = [].indexOf;
exports.isBytes = isBytes;
exports.isAllowedHint = isAllowedHint;
exports.convert = convert;
({
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8
} = _tweetnaclUtil.default);
exports.isBytes = isBytes = (0, _pandaParchment.isType)(Uint8Array);
allowedHints = ["bytes", "utf8", "base64", "safe-base64"];

exports.isAllowedHint = isAllowedHint = function (x) {
  return indexOf.call(allowedHints, x) >= 0;
};

hint = {
  isBytes: (0, _pandaParchment.eq)("bytes"),
  isUTF8: (0, _pandaParchment.eq)("utf8"),
  isBase64: (0, _pandaParchment.eq)("base64"),
  isSafeBase64: (0, _pandaParchment.eq)("safe-base64")
}; // decode takes an input and breaks it down to a byte array.

decode = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert::decode - Confirm your data type matches the hint. No matches on ${(0, _pandaParchment.toJSON)(args)}`);
  }
});

_pandaGenerics.Method.define(decode, hint.isBytes, isBytes, function (_, bytes) {
  return bytes; // no op, but enforcing bytes type
});

_pandaGenerics.Method.define(decode, hint.isUTF8, _pandaParchment.isString, function (_, string) {
  return decodeUTF8(string);
});

_pandaGenerics.Method.define(decode, hint.isBase64, _pandaParchment.isString, function (_, string) {
  return decodeBase64(string);
});

_pandaGenerics.Method.define(decode, hint.isSafeBase64, _pandaParchment.isString, function (_, string) {
  var padding; // Based on RFC 4648's "base64url" mapping:
  // https://tools.ietf.org/html/rfc4648#section-5

  padding = function () {
    switch (string.length % 4) {
      case 3:
        return "=";

      case 2:
        return "==";

      default:
        return "";
    }
  }();

  return decodeBase64(string.replace(/\-/g, '+').replace(/\_/g, '/') + padding);
}); // encode takes a byte array and formats it according to the hint.


encode = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert::encode - Confirm your data type matches the hint. No matches on ${(0, _pandaParchment.toJSON)(args)}`);
  }
});

_pandaGenerics.Method.define(encode, hint.isBytes, isBytes, function (_, bytes) {
  return bytes; // no op, but enforcing bytes type
});

_pandaGenerics.Method.define(encode, hint.isUTF8, isBytes, function (_, bytes) {
  return encodeUTF8(bytes);
});

_pandaGenerics.Method.define(encode, hint.isBase64, isBytes, function (_, bytes) {
  return encodeBase64(bytes);
});

_pandaGenerics.Method.define(encode, hint.isSafeBase64, isBytes, function (_, bytes) {
  // Based on RFC 4648's "base64url" mapping:
  // https://tools.ietf.org/html/rfc4648#section-5
  return encode("base64", bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
});

isHint = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert:: - invalid hint: no matches on ${(0, _pandaParchment.toJSON)(args)}`);
  }
});

_pandaGenerics.Method.define(isHint, isAllowedHint, isAllowedHint, function () {
  return true;
});

_pandaGenerics.Method.define(isHint, _pandaParchment.eq, function (_from, to) {
  throw new Error(`panda-confidential::convert - 'from' (${_from}) and 'to' (${to}) hints cannot be identical.`);
});

_pandaGenerics.Method.define(isHint, _pandaParchment.isObject, function ({
  from: _from,
  to
}) {
  return isHint(_from, to);
}); // convert takes a piece of data and converts it by using decode to get bytes,
// then encode to get the final format.


exports.convert = convert = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert:: - no matches on ${(0, _pandaParchment.toJSON)(args)}`);
  }
});

_pandaGenerics.Method.define(convert, (0, _pandaGarden.unary)(isHint), _pandaParchment.isDefined, function ({
  from: _from,
  to
}, value) {
  return encode(to, decode(_from, value));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy91dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxhQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7O0FBS0EsQ0FBQTtBQUFBLEVBQUEsWUFBQTtBQUFBLEVBQUEsVUFBQTtBQUFBLEVBQUEsWUFBQTtBQUFBLEVBQUE7QUFBQSxJQUFBLHNCQUFBO0FBRUEsa0JBQUEsT0FBQSxHQUFVLDRCQUFBLFVBQUEsQ0FBVjtBQUVBLFlBQUEsR0FBZSxDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLGFBQUEsQ0FBZjs7QUFDQSx3QkFBQSxhQUFBLEdBQWdCLFVBQUEsQ0FBQSxFQUFBO1NBQU8sT0FBQSxDQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxLQUFBLEM7QUFBUCxDQUFoQjs7QUFFQSxJQUFBLEdBQ0U7QUFBQSxFQUFBLE9BQUEsRUFBUyx3QkFBVCxPQUFTLENBQVQ7QUFDQSxFQUFBLE1BQUEsRUFBUSx3QkFEUixNQUNRLENBRFI7QUFFQSxFQUFBLFFBQUEsRUFBVSx3QkFGVixRQUVVLENBRlY7QUFHQSxFQUFBLFlBQUEsRUFBYyx3QkFBQSxhQUFBO0FBSGQsQ0FERixDOztBQVFBLE1BQUEsR0FBUyxzQkFBQSxNQUFBLENBQWM7QUFBQSxFQUFBLE9BQUEsRUFBUyxVQUFBLEdBQUEsSUFBQSxFQUFBO0FBQzlCLFVBQU0sSUFBQSxLQUFBLENBQVUsZ0dB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QUNFLFFBQU0sSUFBQSxLQUFBLENBQVUseUNBQUEsS0FBQSxlQUFBLEVBQVYsOEJBQUEsQ0FBTjtBQUZKLENBQUE7O0FBS0Esc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWEsRUFBQTtBQUFiLENBQUQsRUFBQTtTQUFzQixNQUFBLENBQUEsS0FBQSxFQUFBLEVBQUEsQztBQXJGeEIsQ0FvRkEsRTs7OztBQUtBLGtCQUFBLE9BQUEsR0FBVSxzQkFBQSxNQUFBLENBQWM7QUFBQSxFQUFBLE9BQUEsRUFBUyxVQUFBLEdBQUEsSUFBQSxFQUFBO0FBQy9CLFVBQU0sSUFBQSxLQUFBLENBQVUsaURBQ0UsNEJBREYsSUFDRSxDQURaLEVBQUEsQ0FBTjtBQUQrQjtBQUFULENBQWQsQ0FBVjs7QUFJQSxzQkFBQSxNQUFBLENBQUEsT0FBQSxFQUF3Qix3QkFBeEIsTUFBd0IsQ0FBeEIsRUFBQSx5QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWMsRUFBQTtBQUFkLENBQUQsRUFBQSxLQUFBLEVBQUE7U0FBOEIsTUFBQSxDQUFBLEVBQUEsRUFBVyxNQUFBLENBQUEsS0FBQSxFQUFYLEtBQVcsQ0FBWCxDO0FBRGhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsLXV0aWxcIlxuaW1wb3J0IHt1bmFyeX0gZnJvbSBcInBhbmRhLWdhcmRlblwiXG5pbXBvcnQge2lzVHlwZSwgaXNPYmplY3QsIGlzU3RyaW5nLCBlcSwgaXNEZWZpbmVkLCB0b0pTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5cbntkZWNvZGVCYXNlNjQsIGRlY29kZVVURjgsIGVuY29kZUJhc2U2NCwgZW5jb2RlVVRGOH0gPSBuYWNsXG5cbmlzQnl0ZXMgPSBpc1R5cGUgVWludDhBcnJheVxuXG5hbGxvd2VkSGludHMgPSBbXCJieXRlc1wiLCBcInV0ZjhcIiwgXCJiYXNlNjRcIiwgXCJzYWZlLWJhc2U2NFwiXVxuaXNBbGxvd2VkSGludCA9ICh4KSAtPiB4IGluIGFsbG93ZWRIaW50c1xuXG5oaW50ID1cbiAgaXNCeXRlczogZXEgXCJieXRlc1wiXG4gIGlzVVRGODogZXEgXCJ1dGY4XCJcbiAgaXNCYXNlNjQ6IGVxIFwiYmFzZTY0XCJcbiAgaXNTYWZlQmFzZTY0OiBlcSBcInNhZmUtYmFzZTY0XCJcblxuXG4jIGRlY29kZSB0YWtlcyBhbiBpbnB1dCBhbmQgYnJlYWtzIGl0IGRvd24gdG8gYSBieXRlIGFycmF5LlxuZGVjb2RlID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjpkZWNvZGUgLVxuICAgIENvbmZpcm0geW91ciBkYXRhIHR5cGUgbWF0Y2hlcyB0aGUgaGludC5cbiAgICBObyBtYXRjaGVzIG9uICN7dG9KU09OIGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNCeXRlcywgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiBieXRlcyAgIyBubyBvcCwgYnV0IGVuZm9yY2luZyBieXRlcyB0eXBlXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzVVRGOCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZVVURjggc3RyaW5nXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzQmFzZTY0LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT4gZGVjb2RlQmFzZTY0IHN0cmluZ1xuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc1NhZmVCYXNlNjQsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPlxuICAgICMgQmFzZWQgb24gUkZDIDQ2NDgncyBcImJhc2U2NHVybFwiIG1hcHBpbmc6XG4gICAgIyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNDY0OCNzZWN0aW9uLTVcbiAgICBwYWRkaW5nID1cbiAgICAgIHN3aXRjaCBzdHJpbmcubGVuZ3RoICUgNFxuICAgICAgICB3aGVuIDMgdGhlbiBcIj1cIlxuICAgICAgICB3aGVuIDIgdGhlbiBcIj09XCJcbiAgICAgICAgZWxzZSBcIlwiXG4gICAgZGVjb2RlQmFzZTY0IHN0cmluZy5yZXBsYWNlKC9cXC0vZywgJysnKS5yZXBsYWNlKC9cXF8vZywgJy8nKSArIHBhZGRpbmdcblxuXG4jIGVuY29kZSB0YWtlcyBhIGJ5dGUgYXJyYXkgYW5kIGZvcm1hdHMgaXQgYWNjb3JkaW5nIHRvIHRoZSBoaW50LlxuZW5jb2RlID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjplbmNvZGUgLVxuICAgIENvbmZpcm0geW91ciBkYXRhIHR5cGUgbWF0Y2hlcyB0aGUgaGludC5cbiAgICBObyBtYXRjaGVzIG9uICN7dG9KU09OIGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNCeXRlcywgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiBieXRlcyAgIyBubyBvcCwgYnV0IGVuZm9yY2luZyBieXRlcyB0eXBlXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzVVRGOCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlVVRGOCBieXRlc1xuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0Jhc2U2NCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlQmFzZTY0IGJ5dGVzXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPlxuICAgICMgQmFzZWQgb24gUkZDIDQ2NDgncyBcImJhc2U2NHVybFwiIG1hcHBpbmc6XG4gICAgIyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNDY0OCNzZWN0aW9uLTVcbiAgICBlbmNvZGUgXCJiYXNlNjRcIiwgYnl0ZXNcbiAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAucmVwbGFjZSgvXFw9KyQvLCAnJylcblxuXG5cbmlzSGludCA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6IC0gaW52YWxpZCBoaW50OlxuICAgIG5vIG1hdGNoZXMgb24gI3t0b0pTT04gYXJnc31cIlxuXG5NZXRob2QuZGVmaW5lIGlzSGludCwgaXNBbGxvd2VkSGludCwgaXNBbGxvd2VkSGludCxcbiAgLT4gdHJ1ZVxuXG5NZXRob2QuZGVmaW5lIGlzSGludCwgZXEsXG4gIChfZnJvbSwgdG8pIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0IC1cbiAgICAgICdmcm9tJyAoI3tfZnJvbX0pIGFuZCAndG8nICgje3RvfSkgaGludHMgY2Fubm90IGJlIGlkZW50aWNhbC5cIlxuXG5NZXRob2QuZGVmaW5lIGlzSGludCwgaXNPYmplY3QsXG4gICh7ZnJvbTpfZnJvbSwgdG99KSAtPiBpc0hpbnQgX2Zyb20sIHRvXG5cbiMgY29udmVydCB0YWtlcyBhIHBpZWNlIG9mIGRhdGEgYW5kIGNvbnZlcnRzIGl0IGJ5IHVzaW5nIGRlY29kZSB0byBnZXQgYnl0ZXMsXG4jIHRoZW4gZW5jb2RlIHRvIGdldCB0aGUgZmluYWwgZm9ybWF0LlxuY29udmVydCA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6IC1cbiAgICBubyBtYXRjaGVzIG9uICN7dG9KU09OIGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBjb252ZXJ0LCAodW5hcnkgaXNIaW50KSwgaXNEZWZpbmVkLFxuICAoe2Zyb206IF9mcm9tLCB0b30sIHZhbHVlKSAtPiBlbmNvZGUgdG8sIGRlY29kZSBfZnJvbSwgdmFsdWVcblxuXG5leHBvcnQge1xuICBjb252ZXJ0XG4gIGlzQnl0ZXNcbiAgaXNBbGxvd2VkSGludFxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/utils.coffee
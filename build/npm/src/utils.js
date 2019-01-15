"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBytes = exports.convert = void 0;

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
exports.convert = convert;
({
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8
} = _tweetnaclUtil.default);
exports.isBytes = isBytes = (0, _pandaParchment.isType)(Uint8Array);
allowedHints = ["bytes", "utf8", "base64", "safe-base64"];

isAllowedHint = function (x) {
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
    throw new Error(`panda-confidential::convert::decode - Confirm your data type matches the hint. No matches on ${JSON.stringify(args)}`);
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

  return decodeBase64(string.replace(/\-/g, '+').replace(/\_/ / g, '/') + padding);
}); // encode takes a byte array and formats it according to the hint.


encode = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert::encode - Confirm your data type matches the hint. No matches on ${JSON.stringify(args)}`);
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
    throw new Error(`panda-confidential::convert:: - invalid hint: no matches on ${JSON.stringify(args)}`);
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
    throw new Error(`panda-confidential::convert:: - no matches on ${JSON.stringify(args)}`);
  }
});

_pandaGenerics.Method.define(convert, (0, _pandaGarden.unary)(isHint), _pandaParchment.isDefined, function ({
  from: _from,
  to
}, value) {
  return encode(to, decode(_from, value));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy91dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxhQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7QUFLQSxDQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQSxVQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQTtBQUFBLElBQUEsc0JBQUE7QUFFQSxrQkFBQSxPQUFBLEdBQVUsNEJBQUEsVUFBQSxDQUFWO0FBRUEsWUFBQSxHQUFlLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxDQUFmOztBQUNBLGFBQUEsR0FBZ0IsVUFBQSxDQUFBLEVBQUE7U0FBTyxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLEtBQUEsQztBQUFQLENBQWhCOztBQUVBLElBQUEsR0FDRTtBQUFBLEVBQUEsT0FBQSxFQUFTLHdCQUFULE9BQVMsQ0FBVDtBQUNBLEVBQUEsTUFBQSxFQUFRLHdCQURSLE1BQ1EsQ0FEUjtBQUVBLEVBQUEsUUFBQSxFQUFVLHdCQUZWLFFBRVUsQ0FGVjtBQUdBLEVBQUEsWUFBQSxFQUFjLHdCQUFBLGFBQUE7QUFIZCxDQURGLEM7O0FBUUEsTUFBQSxHQUFTLHNCQUFBLE1BQUEsQ0FBYztBQUFBLEVBQUEsT0FBQSxFQUFTLFVBQUEsR0FBQSxJQUFBLEVBQUE7QUFDOUIsVUFBTSxJQUFBLEtBQUEsQ0FBVSxnR0FFRSxJQUFJ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RUFBQSxrQkFBQSxFQUNFLFVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQTtBQUNFLFFBQU0sSUFBQSxLQUFBLENBQVUseUNBQUEsS0FBQSxlQUFBLEVBQVYsOEJBQUEsQ0FBTjtBQUZKLENBQUE7O0FBS0Esc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWEsRUFBQTtBQUFiLENBQUQsRUFBQTtTQUFzQixNQUFBLENBQUEsS0FBQSxFQUFBLEVBQUEsQztBQXJGeEIsQ0FvRkEsRTs7OztBQUtBLGtCQUFBLE9BQUEsR0FBVSxzQkFBQSxNQUFBLENBQWM7QUFBQSxFQUFBLE9BQUEsRUFBUyxVQUFBLEdBQUEsSUFBQSxFQUFBO0FBQy9CLFVBQU0sSUFBQSxLQUFBLENBQVUsaURBQ0UsSUFBSSxDQUFKLFNBQUEsQ0FERixJQUNFLENBRFosRUFBQSxDQUFOO0FBRCtCO0FBQVQsQ0FBZCxDQUFWOztBQUlBLHNCQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQXdCLHdCQUF4QixNQUF3QixDQUF4QixFQUFBLHlCQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsSUFBQSxFQUFELEtBQUE7QUFBYyxFQUFBO0FBQWQsQ0FBRCxFQUFBLEtBQUEsRUFBQTtTQUE4QixNQUFBLENBQUEsRUFBQSxFQUFXLE1BQUEsQ0FBQSxLQUFBLEVBQVgsS0FBVyxDQUFYLEM7QUFEaEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuYWNsIGZyb20gXCJ0d2VldG5hY2wtdXRpbFwiXG5pbXBvcnQge3VuYXJ5fSBmcm9tIFwicGFuZGEtZ2FyZGVuXCJcbmltcG9ydCB7aXNUeXBlLCBpc09iamVjdCwgaXNTdHJpbmcsIGVxLCBpc0RlZmluZWR9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5cbntkZWNvZGVCYXNlNjQsIGRlY29kZVVURjgsIGVuY29kZUJhc2U2NCwgZW5jb2RlVVRGOH0gPSBuYWNsXG5cbmlzQnl0ZXMgPSBpc1R5cGUgVWludDhBcnJheVxuXG5hbGxvd2VkSGludHMgPSBbXCJieXRlc1wiLCBcInV0ZjhcIiwgXCJiYXNlNjRcIiwgXCJzYWZlLWJhc2U2NFwiXVxuaXNBbGxvd2VkSGludCA9ICh4KSAtPiB4IGluIGFsbG93ZWRIaW50c1xuXG5oaW50ID1cbiAgaXNCeXRlczogZXEgXCJieXRlc1wiXG4gIGlzVVRGODogZXEgXCJ1dGY4XCJcbiAgaXNCYXNlNjQ6IGVxIFwiYmFzZTY0XCJcbiAgaXNTYWZlQmFzZTY0OiBlcSBcInNhZmUtYmFzZTY0XCJcblxuXG4jIGRlY29kZSB0YWtlcyBhbiBpbnB1dCBhbmQgYnJlYWtzIGl0IGRvd24gdG8gYSBieXRlIGFycmF5LlxuZGVjb2RlID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjpkZWNvZGUgLVxuICAgIENvbmZpcm0geW91ciBkYXRhIHR5cGUgbWF0Y2hlcyB0aGUgaGludC5cbiAgICBObyBtYXRjaGVzIG9uICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNVVEY4LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT4gZGVjb2RlVVRGOCBzdHJpbmdcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNCYXNlNjQsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPiBkZWNvZGVCYXNlNjQgc3RyaW5nXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIHBhZGRpbmcgPVxuICAgICAgc3dpdGNoIHN0cmluZy5sZW5ndGggJSA0XG4gICAgICAgIHdoZW4gMyB0aGVuIFwiPVwiXG4gICAgICAgIHdoZW4gMiB0aGVuIFwiPT1cIlxuICAgICAgICBlbHNlIFwiXCJcbiAgICBkZWNvZGVCYXNlNjQgc3RyaW5nLnJlcGxhY2UoL1xcLS9nLCAnKycpLnJlcGxhY2UoL1xcXy8vZywgJy8nKSArIHBhZGRpbmdcblxuXG4jIGVuY29kZSB0YWtlcyBhIGJ5dGUgYXJyYXkgYW5kIGZvcm1hdHMgaXQgYWNjb3JkaW5nIHRvIHRoZSBoaW50LlxuZW5jb2RlID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjplbmNvZGUgLVxuICAgIENvbmZpcm0geW91ciBkYXRhIHR5cGUgbWF0Y2hlcyB0aGUgaGludC5cbiAgICBObyBtYXRjaGVzIG9uICN7SlNPTi5zdHJpbmdpZnkgYXJnc31cIlxuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNVVEY4LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+ICBlbmNvZGVVVEY4IGJ5dGVzXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+ICBlbmNvZGVCYXNlNjQgYnl0ZXNcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIGVuY29kZSBcImJhc2U2NFwiLCBieXRlc1xuICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgIC5yZXBsYWNlKC9cXD0rJC8sICcnKVxuXG5cblxuaXNIaW50ID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjogLSBpbnZhbGlkIGhpbnQ6XG4gICAgbm8gbWF0Y2hlcyBvbiAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBpc0hpbnQsIGlzQWxsb3dlZEhpbnQsIGlzQWxsb3dlZEhpbnQsXG4gIC0+IHRydWVcblxuTWV0aG9kLmRlZmluZSBpc0hpbnQsIGVxLFxuICAoX2Zyb20sIHRvKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydCAtXG4gICAgICAnZnJvbScgKCN7X2Zyb219KSBhbmQgJ3RvJyAoI3t0b30pIGhpbnRzIGNhbm5vdCBiZSBpZGVudGljYWwuXCJcblxuTWV0aG9kLmRlZmluZSBpc0hpbnQsIGlzT2JqZWN0LFxuICAoe2Zyb206X2Zyb20sIHRvfSkgLT4gaXNIaW50IF9mcm9tLCB0b1xuXG4jIGNvbnZlcnQgdGFrZXMgYSBwaWVjZSBvZiBkYXRhIGFuZCBjb252ZXJ0cyBpdCBieSB1c2luZyBkZWNvZGUgdG8gZ2V0IGJ5dGVzLFxuIyB0aGVuIGVuY29kZSB0byBnZXQgdGhlIGZpbmFsIGZvcm1hdC5cbmNvbnZlcnQgPSBNZXRob2QuY3JlYXRlIGRlZmF1bHQ6IChhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQ6OiAtXG4gICAgbm8gbWF0Y2hlcyBvbiAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBjb252ZXJ0LCAodW5hcnkgaXNIaW50KSwgaXNEZWZpbmVkLFxuICAoe2Zyb206IF9mcm9tLCB0b30sIHZhbHVlKSAtPiBlbmNvZGUgdG8sIGRlY29kZSBfZnJvbSwgdmFsdWVcblxuXG5leHBvcnQge1xuICBjb252ZXJ0XG4gIGlzQnl0ZXNcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/Repositories/panda-confidential/src/utils.coffee
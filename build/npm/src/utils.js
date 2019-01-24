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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy91dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxhQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7QUFLQSxDQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQSxVQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQTtBQUFBLElBQUEsc0JBQUE7QUFFQSxrQkFBQSxPQUFBLEdBQVUsNEJBQUEsVUFBQSxDQUFWO0FBRUEsWUFBQSxHQUFlLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxDQUFmOztBQUNBLGFBQUEsR0FBZ0IsVUFBQSxDQUFBLEVBQUE7U0FBTyxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLEtBQUEsQztBQUFQLENBQWhCOztBQUVBLElBQUEsR0FDRTtBQUFBLEVBQUEsT0FBQSxFQUFTLHdCQUFULE9BQVMsQ0FBVDtBQUNBLEVBQUEsTUFBQSxFQUFRLHdCQURSLE1BQ1EsQ0FEUjtBQUVBLEVBQUEsUUFBQSxFQUFVLHdCQUZWLFFBRVUsQ0FGVjtBQUdBLEVBQUEsWUFBQSxFQUFjLHdCQUFBLGFBQUE7QUFIZCxDQURGLEM7O0FBUUEsTUFBQSxHQUFTLHNCQUFBLE1BQUEsQ0FBYztBQUFBLEVBQUEsT0FBQSxFQUFTLFVBQUEsR0FBQSxJQUFBLEVBQUE7QUFDOUIsVUFBTSxJQUFBLEtBQUEsQ0FBVSxnR0FFRSw0QkFG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TSxJQUFBLEtBQUEsQ0FBVSx5Q0FBQSxLQUFBLGVBQUEsRUFBViw4QkFBQSxDQUFOO0FBRkosQ0FBQTs7QUFLQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsSUFBQSxFQUFELEtBQUE7QUFBYSxFQUFBO0FBQWIsQ0FBRCxFQUFBO1NBQXNCLE1BQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxDO0FBckZ4QixDQW9GQSxFOzs7O0FBS0Esa0JBQUEsT0FBQSxHQUFVLHNCQUFBLE1BQUEsQ0FBYztBQUFBLEVBQUEsT0FBQSxFQUFTLFVBQUEsR0FBQSxJQUFBLEVBQUE7QUFDL0IsVUFBTSxJQUFBLEtBQUEsQ0FBVSxpREFDRSw0QkFERixJQUNFLENBRFosRUFBQSxDQUFOO0FBRCtCO0FBQVQsQ0FBZCxDQUFWOztBQUlBLHNCQUFBLE1BQUEsQ0FBQSxPQUFBLEVBQXdCLHdCQUF4QixNQUF3QixDQUF4QixFQUFBLHlCQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsSUFBQSxFQUFELEtBQUE7QUFBYyxFQUFBO0FBQWQsQ0FBRCxFQUFBLEtBQUEsRUFBQTtTQUE4QixNQUFBLENBQUEsRUFBQSxFQUFXLE1BQUEsQ0FBQSxLQUFBLEVBQVgsS0FBVyxDQUFYLEM7QUFEaEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuYWNsIGZyb20gXCJ0d2VldG5hY2wtdXRpbFwiXG5pbXBvcnQge3VuYXJ5fSBmcm9tIFwicGFuZGEtZ2FyZGVuXCJcbmltcG9ydCB7aXNUeXBlLCBpc09iamVjdCwgaXNTdHJpbmcsIGVxLCBpc0RlZmluZWQsIHRvSlNPTn0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge01ldGhvZH0gZnJvbSBcInBhbmRhLWdlbmVyaWNzXCJcblxue2RlY29kZUJhc2U2NCwgZGVjb2RlVVRGOCwgZW5jb2RlQmFzZTY0LCBlbmNvZGVVVEY4fSA9IG5hY2xcblxuaXNCeXRlcyA9IGlzVHlwZSBVaW50OEFycmF5XG5cbmFsbG93ZWRIaW50cyA9IFtcImJ5dGVzXCIsIFwidXRmOFwiLCBcImJhc2U2NFwiLCBcInNhZmUtYmFzZTY0XCJdXG5pc0FsbG93ZWRIaW50ID0gKHgpIC0+IHggaW4gYWxsb3dlZEhpbnRzXG5cbmhpbnQgPVxuICBpc0J5dGVzOiBlcSBcImJ5dGVzXCJcbiAgaXNVVEY4OiBlcSBcInV0ZjhcIlxuICBpc0Jhc2U2NDogZXEgXCJiYXNlNjRcIlxuICBpc1NhZmVCYXNlNjQ6IGVxIFwic2FmZS1iYXNlNjRcIlxuXG5cbiMgZGVjb2RlIHRha2VzIGFuIGlucHV0IGFuZCBicmVha3MgaXQgZG93biB0byBhIGJ5dGUgYXJyYXkuXG5kZWNvZGUgPSBNZXRob2QuY3JlYXRlIGRlZmF1bHQ6IChhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQ6OmRlY29kZSAtXG4gICAgQ29uZmlybSB5b3VyIGRhdGEgdHlwZSBtYXRjaGVzIHRoZSBoaW50LlxuICAgIE5vIG1hdGNoZXMgb24gI3t0b0pTT04gYXJnc31cIlxuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNVVEY4LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT4gZGVjb2RlVVRGOCBzdHJpbmdcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNCYXNlNjQsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPiBkZWNvZGVCYXNlNjQgc3RyaW5nXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIHBhZGRpbmcgPVxuICAgICAgc3dpdGNoIHN0cmluZy5sZW5ndGggJSA0XG4gICAgICAgIHdoZW4gMyB0aGVuIFwiPVwiXG4gICAgICAgIHdoZW4gMiB0aGVuIFwiPT1cIlxuICAgICAgICBlbHNlIFwiXCJcbiAgICBkZWNvZGVCYXNlNjQgc3RyaW5nLnJlcGxhY2UoL1xcLS9nLCAnKycpLnJlcGxhY2UoL1xcXy9nLCAnLycpICsgcGFkZGluZ1xuXG5cbiMgZW5jb2RlIHRha2VzIGEgYnl0ZSBhcnJheSBhbmQgZm9ybWF0cyBpdCBhY2NvcmRpbmcgdG8gdGhlIGhpbnQuXG5lbmNvZGUgPSBNZXRob2QuY3JlYXRlIGRlZmF1bHQ6IChhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQ6OmVuY29kZSAtXG4gICAgQ29uZmlybSB5b3VyIGRhdGEgdHlwZSBtYXRjaGVzIHRoZSBoaW50LlxuICAgIE5vIG1hdGNoZXMgb24gI3t0b0pTT04gYXJnc31cIlxuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNVVEY4LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+ICBlbmNvZGVVVEY4IGJ5dGVzXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+ICBlbmNvZGVCYXNlNjQgYnl0ZXNcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIGVuY29kZSBcImJhc2U2NFwiLCBieXRlc1xuICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgIC5yZXBsYWNlKC9cXD0rJC8sICcnKVxuXG5cblxuaXNIaW50ID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjogLSBpbnZhbGlkIGhpbnQ6XG4gICAgbm8gbWF0Y2hlcyBvbiAje3RvSlNPTiBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc0FsbG93ZWRIaW50LCBpc0FsbG93ZWRIaW50LFxuICAtPiB0cnVlXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBlcSxcbiAgKF9mcm9tLCB0bykgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQgLVxuICAgICAgJ2Zyb20nICgje19mcm9tfSkgYW5kICd0bycgKCN7dG99KSBoaW50cyBjYW5ub3QgYmUgaWRlbnRpY2FsLlwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc09iamVjdCxcbiAgKHtmcm9tOl9mcm9tLCB0b30pIC0+IGlzSGludCBfZnJvbSwgdG9cblxuIyBjb252ZXJ0IHRha2VzIGEgcGllY2Ugb2YgZGF0YSBhbmQgY29udmVydHMgaXQgYnkgdXNpbmcgZGVjb2RlIHRvIGdldCBieXRlcyxcbiMgdGhlbiBlbmNvZGUgdG8gZ2V0IHRoZSBmaW5hbCBmb3JtYXQuXG5jb252ZXJ0ID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjogLVxuICAgIG5vIG1hdGNoZXMgb24gI3t0b0pTT04gYXJnc31cIlxuXG5NZXRob2QuZGVmaW5lIGNvbnZlcnQsICh1bmFyeSBpc0hpbnQpLCBpc0RlZmluZWQsXG4gICh7ZnJvbTogX2Zyb20sIHRvfSwgdmFsdWUpIC0+IGVuY29kZSB0bywgZGVjb2RlIF9mcm9tLCB2YWx1ZVxuXG5cbmV4cG9ydCB7XG4gIGNvbnZlcnRcbiAgaXNCeXRlc1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/utils.coffee
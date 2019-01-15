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

_pandaGenerics.Method.define(isHint, isAllowedHint, isAllowedHint, function (_from, to) {
  if (_from === to) {
    throw new Error(`panda-confidential::convert - 'from' (${_from}) and 'to' (${to}) hints cannot be identical.`);
  } else {
    return true;
  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy91dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxhQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7QUFLQSxDQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQSxVQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQTtBQUFBLElBQUEsc0JBQUE7QUFFQSxrQkFBQSxPQUFBLEdBQVUsNEJBQUEsVUFBQSxDQUFWO0FBRUEsWUFBQSxHQUFlLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxDQUFmOztBQUNBLGFBQUEsR0FBZ0IsVUFBQSxDQUFBLEVBQUE7U0FBTyxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLEtBQUEsQztBQUFQLENBQWhCOztBQUVBLElBQUEsR0FDRTtBQUFBLEVBQUEsT0FBQSxFQUFTLHdCQUFULE9BQVMsQ0FBVDtBQUNBLEVBQUEsTUFBQSxFQUFRLHdCQURSLE1BQ1EsQ0FEUjtBQUVBLEVBQUEsUUFBQSxFQUFVLHdCQUZWLFFBRVUsQ0FGVjtBQUdBLEVBQUEsWUFBQSxFQUFjLHdCQUFBLGFBQUE7QUFIZCxDQURGLEM7O0FBUUEsTUFBQSxHQUFTLHNCQUFBLE1BQUEsQ0FBYztBQUFBLEVBQUEsT0FBQSxFQUFTLFVBQUEsR0FBQSxJQUFBLEVBQUE7QUFDOUIsVUFBTSxJQUFBLEtBQUEsQ0FBVSxnR0FFRSxJQUFJ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LEVBQUE7QUFDRSxVQUFNLElBQUEsS0FBQSxDQUFVLHlDQUFBLEtBQUEsZUFBQSxFQURsQiw4QkFDUSxDQUFOO0FBREYsR0FBQSxNQUFBO1dBQUEsSTs7QUFGSixDQUFBOztBQVFBLHNCQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFDO0FBQUMsRUFBQSxJQUFBLEVBQUQsS0FBQTtBQUFhLEVBQUE7QUFBYixDQUFELEVBQUE7U0FBc0IsTUFBQSxDQUFBLEtBQUEsRUFBQSxFQUFBLEM7QUFyRnhCLENBb0ZBLEU7Ozs7QUFLQSxrQkFBQSxPQUFBLEdBQVUsc0JBQUEsTUFBQSxDQUFjO0FBQUEsRUFBQSxPQUFBLEVBQVMsVUFBQSxHQUFBLElBQUEsRUFBQTtBQUMvQixVQUFNLElBQUEsS0FBQSxDQUFVLGlEQUNFLElBQUksQ0FBSixTQUFBLENBREYsSUFDRSxDQURaLEVBQUEsQ0FBTjtBQUQrQjtBQUFULENBQWQsQ0FBVjs7QUFJQSxzQkFBQSxNQUFBLENBQUEsT0FBQSxFQUF3Qix3QkFBeEIsTUFBd0IsQ0FBeEIsRUFBQSx5QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWMsRUFBQTtBQUFkLENBQUQsRUFBQSxLQUFBLEVBQUE7U0FBOEIsTUFBQSxDQUFBLEVBQUEsRUFBVyxNQUFBLENBQUEsS0FBQSxFQUFYLEtBQVcsQ0FBWCxDO0FBRGhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsLXV0aWxcIlxuaW1wb3J0IHt1bmFyeX0gZnJvbSBcInBhbmRhLWdhcmRlblwiXG5pbXBvcnQge2lzVHlwZSwgaXNPYmplY3QsIGlzU3RyaW5nLCBlcSwgaXNEZWZpbmVkfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuXG57ZGVjb2RlQmFzZTY0LCBkZWNvZGVVVEY4LCBlbmNvZGVCYXNlNjQsIGVuY29kZVVURjh9ID0gbmFjbFxuXG5pc0J5dGVzID0gaXNUeXBlIFVpbnQ4QXJyYXlcblxuYWxsb3dlZEhpbnRzID0gW1wiYnl0ZXNcIiwgXCJ1dGY4XCIsIFwiYmFzZTY0XCIsIFwic2FmZS1iYXNlNjRcIl1cbmlzQWxsb3dlZEhpbnQgPSAoeCkgLT4geCBpbiBhbGxvd2VkSGludHNcblxuaGludCA9XG4gIGlzQnl0ZXM6IGVxIFwiYnl0ZXNcIlxuICBpc1VURjg6IGVxIFwidXRmOFwiXG4gIGlzQmFzZTY0OiBlcSBcImJhc2U2NFwiXG4gIGlzU2FmZUJhc2U2NDogZXEgXCJzYWZlLWJhc2U2NFwiXG5cblxuIyBkZWNvZGUgdGFrZXMgYW4gaW5wdXQgYW5kIGJyZWFrcyBpdCBkb3duIHRvIGEgYnl0ZSBhcnJheS5cbmRlY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZGVjb2RlIC1cbiAgICBDb25maXJtIHlvdXIgZGF0YSB0eXBlIG1hdGNoZXMgdGhlIGhpbnQuXG4gICAgTm8gbWF0Y2hlcyBvbiAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNCeXRlcywgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiBieXRlcyAgIyBubyBvcCwgYnV0IGVuZm9yY2luZyBieXRlcyB0eXBlXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzVVRGOCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZVVURjggc3RyaW5nXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzQmFzZTY0LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT4gZGVjb2RlQmFzZTY0IHN0cmluZ1xuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc1NhZmVCYXNlNjQsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPlxuICAgICMgQmFzZWQgb24gUkZDIDQ2NDgncyBcImJhc2U2NHVybFwiIG1hcHBpbmc6XG4gICAgIyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNDY0OCNzZWN0aW9uLTVcbiAgICBwYWRkaW5nID1cbiAgICAgIHN3aXRjaCBzdHJpbmcubGVuZ3RoICUgNFxuICAgICAgICB3aGVuIDMgdGhlbiBcIj1cIlxuICAgICAgICB3aGVuIDIgdGhlbiBcIj09XCJcbiAgICAgICAgZWxzZSBcIlwiXG4gICAgZGVjb2RlQmFzZTY0IHN0cmluZy5yZXBsYWNlKC9cXC0vZywgJysnKS5yZXBsYWNlKC9cXF8vL2csICcvJykgKyBwYWRkaW5nXG5cblxuIyBlbmNvZGUgdGFrZXMgYSBieXRlIGFycmF5IGFuZCBmb3JtYXRzIGl0IGFjY29yZGluZyB0byB0aGUgaGludC5cbmVuY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZW5jb2RlIC1cbiAgICBDb25maXJtIHlvdXIgZGF0YSB0eXBlIG1hdGNoZXMgdGhlIGhpbnQuXG4gICAgTm8gbWF0Y2hlcyBvbiAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNCeXRlcywgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiBieXRlcyAgIyBubyBvcCwgYnV0IGVuZm9yY2luZyBieXRlcyB0eXBlXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzVVRGOCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlVVRGOCBieXRlc1xuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0Jhc2U2NCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlQmFzZTY0IGJ5dGVzXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPlxuICAgICMgQmFzZWQgb24gUkZDIDQ2NDgncyBcImJhc2U2NHVybFwiIG1hcHBpbmc6XG4gICAgIyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNDY0OCNzZWN0aW9uLTVcbiAgICBlbmNvZGUgXCJiYXNlNjRcIiwgYnl0ZXNcbiAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAucmVwbGFjZSgvXFw9KyQvLCAnJylcblxuXG5cbmlzSGludCA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6IC0gaW52YWxpZCBoaW50OlxuICAgIG5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc0FsbG93ZWRIaW50LCBpc0FsbG93ZWRIaW50LFxuICAoX2Zyb20sIHRvKSAtPlxuICAgIGlmIF9mcm9tID09IHRvXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQgLVxuICAgICAgICAnZnJvbScgKCN7X2Zyb219KSBhbmQgJ3RvJyAoI3t0b30pIGhpbnRzIGNhbm5vdCBiZSBpZGVudGljYWwuXCJcbiAgICBlbHNlXG4gICAgICB0cnVlXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc09iamVjdCxcbiAgKHtmcm9tOl9mcm9tLCB0b30pIC0+IGlzSGludCBfZnJvbSwgdG9cblxuIyBjb252ZXJ0IHRha2VzIGEgcGllY2Ugb2YgZGF0YSBhbmQgY29udmVydHMgaXQgYnkgdXNpbmcgZGVjb2RlIHRvIGdldCBieXRlcyxcbiMgdGhlbiBlbmNvZGUgdG8gZ2V0IHRoZSBmaW5hbCBmb3JtYXQuXG5jb252ZXJ0ID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjogLVxuICAgIG5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgY29udmVydCwgKHVuYXJ5IGlzSGludCksIGlzRGVmaW5lZCxcbiAgKHtmcm9tOiBfZnJvbSwgdG99LCB2YWx1ZSkgLT4gZW5jb2RlIHRvLCBkZWNvZGUgX2Zyb20sIHZhbHVlXG5cblxuZXhwb3J0IHtcbiAgY29udmVydFxuICBpc0J5dGVzXG59XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/src/utils.coffee
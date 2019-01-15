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

  return decodeBase64(string.replace(/\-/g, '+').replace(/\_/g, '/') + padding);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy91dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxhQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7QUFLQSxDQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQSxVQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQTtBQUFBLElBQUEsc0JBQUE7QUFFQSxrQkFBQSxPQUFBLEdBQVUsNEJBQUEsVUFBQSxDQUFWO0FBRUEsWUFBQSxHQUFlLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxDQUFmOztBQUNBLGFBQUEsR0FBZ0IsVUFBQSxDQUFBLEVBQUE7U0FBTyxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLEtBQUEsQztBQUFQLENBQWhCOztBQUVBLElBQUEsR0FDRTtBQUFBLEVBQUEsT0FBQSxFQUFTLHdCQUFULE9BQVMsQ0FBVDtBQUNBLEVBQUEsTUFBQSxFQUFRLHdCQURSLE1BQ1EsQ0FEUjtBQUVBLEVBQUEsUUFBQSxFQUFVLHdCQUZWLFFBRVUsQ0FGVjtBQUdBLEVBQUEsWUFBQSxFQUFjLHdCQUFBLGFBQUE7QUFIZCxDQURGLEM7O0FBUUEsTUFBQSxHQUFTLHNCQUFBLE1BQUEsQ0FBYztBQUFBLEVBQUEsT0FBQSxFQUFTLFVBQUEsR0FBQSxJQUFBLEVBQUE7QUFDOUIsVUFBTSxJQUFBLEtBQUEsQ0FBVSxnR0FFRSxJQUFJ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QUFBLEVBQ0UsVUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0UsUUFBTSxJQUFBLEtBQUEsQ0FBVSx5Q0FBQSxLQUFBLGVBQUEsRUFBViw4QkFBQSxDQUFOO0FBRkosQ0FBQTs7QUFLQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsSUFBQSxFQUFELEtBQUE7QUFBYSxFQUFBO0FBQWIsQ0FBRCxFQUFBO1NBQXNCLE1BQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxDO0FBckZ4QixDQW9GQSxFOzs7O0FBS0Esa0JBQUEsT0FBQSxHQUFVLHNCQUFBLE1BQUEsQ0FBYztBQUFBLEVBQUEsT0FBQSxFQUFTLFVBQUEsR0FBQSxJQUFBLEVBQUE7QUFDL0IsVUFBTSxJQUFBLEtBQUEsQ0FBVSxpREFDRSxJQUFJLENBQUosU0FBQSxDQURGLElBQ0UsQ0FEWixFQUFBLENBQU47QUFEK0I7QUFBVCxDQUFkLENBQVY7O0FBSUEsc0JBQUEsTUFBQSxDQUFBLE9BQUEsRUFBd0Isd0JBQXhCLE1BQXdCLENBQXhCLEVBQUEseUJBQUEsRUFDRSxVQUFDO0FBQUMsRUFBQSxJQUFBLEVBQUQsS0FBQTtBQUFjLEVBQUE7QUFBZCxDQUFELEVBQUEsS0FBQSxFQUFBO1NBQThCLE1BQUEsQ0FBQSxFQUFBLEVBQVcsTUFBQSxDQUFBLEtBQUEsRUFBWCxLQUFXLENBQVgsQztBQURoQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbC11dGlsXCJcbmltcG9ydCB7dW5hcnl9IGZyb20gXCJwYW5kYS1nYXJkZW5cIlxuaW1wb3J0IHtpc1R5cGUsIGlzT2JqZWN0LCBpc1N0cmluZywgZXEsIGlzRGVmaW5lZH0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge01ldGhvZH0gZnJvbSBcInBhbmRhLWdlbmVyaWNzXCJcblxue2RlY29kZUJhc2U2NCwgZGVjb2RlVVRGOCwgZW5jb2RlQmFzZTY0LCBlbmNvZGVVVEY4fSA9IG5hY2xcblxuaXNCeXRlcyA9IGlzVHlwZSBVaW50OEFycmF5XG5cbmFsbG93ZWRIaW50cyA9IFtcImJ5dGVzXCIsIFwidXRmOFwiLCBcImJhc2U2NFwiLCBcInNhZmUtYmFzZTY0XCJdXG5pc0FsbG93ZWRIaW50ID0gKHgpIC0+IHggaW4gYWxsb3dlZEhpbnRzXG5cbmhpbnQgPVxuICBpc0J5dGVzOiBlcSBcImJ5dGVzXCJcbiAgaXNVVEY4OiBlcSBcInV0ZjhcIlxuICBpc0Jhc2U2NDogZXEgXCJiYXNlNjRcIlxuICBpc1NhZmVCYXNlNjQ6IGVxIFwic2FmZS1iYXNlNjRcIlxuXG5cbiMgZGVjb2RlIHRha2VzIGFuIGlucHV0IGFuZCBicmVha3MgaXQgZG93biB0byBhIGJ5dGUgYXJyYXkuXG5kZWNvZGUgPSBNZXRob2QuY3JlYXRlIGRlZmF1bHQ6IChhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQ6OmRlY29kZSAtXG4gICAgQ29uZmlybSB5b3VyIGRhdGEgdHlwZSBtYXRjaGVzIHRoZSBoaW50LlxuICAgIE5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzQnl0ZXMsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gYnl0ZXMgICMgbm8gb3AsIGJ1dCBlbmZvcmNpbmcgYnl0ZXMgdHlwZVxuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc1VURjgsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPiBkZWNvZGVVVEY4IHN0cmluZ1xuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0Jhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZUJhc2U2NCBzdHJpbmdcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT5cbiAgICAjIEJhc2VkIG9uIFJGQyA0NjQ4J3MgXCJiYXNlNjR1cmxcIiBtYXBwaW5nOlxuICAgICMgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQ2NDgjc2VjdGlvbi01XG4gICAgcGFkZGluZyA9XG4gICAgICBzd2l0Y2ggc3RyaW5nLmxlbmd0aCAlIDRcbiAgICAgICAgd2hlbiAzIHRoZW4gXCI9XCJcbiAgICAgICAgd2hlbiAyIHRoZW4gXCI9PVwiXG4gICAgICAgIGVsc2UgXCJcIlxuICAgIGRlY29kZUJhc2U2NCBzdHJpbmcucmVwbGFjZSgvXFwtL2csICcrJykucmVwbGFjZSgvXFxfL2csICcvJykgKyBwYWRkaW5nXG5cblxuIyBlbmNvZGUgdGFrZXMgYSBieXRlIGFycmF5IGFuZCBmb3JtYXRzIGl0IGFjY29yZGluZyB0byB0aGUgaGludC5cbmVuY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZW5jb2RlIC1cbiAgICBDb25maXJtIHlvdXIgZGF0YSB0eXBlIG1hdGNoZXMgdGhlIGhpbnQuXG4gICAgTm8gbWF0Y2hlcyBvbiAje0pTT04uc3RyaW5naWZ5IGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNCeXRlcywgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiBieXRlcyAgIyBubyBvcCwgYnV0IGVuZm9yY2luZyBieXRlcyB0eXBlXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzVVRGOCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlVVRGOCBieXRlc1xuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0Jhc2U2NCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlQmFzZTY0IGJ5dGVzXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPlxuICAgICMgQmFzZWQgb24gUkZDIDQ2NDgncyBcImJhc2U2NHVybFwiIG1hcHBpbmc6XG4gICAgIyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNDY0OCNzZWN0aW9uLTVcbiAgICBlbmNvZGUgXCJiYXNlNjRcIiwgYnl0ZXNcbiAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAucmVwbGFjZSgvXFw9KyQvLCAnJylcblxuXG5cbmlzSGludCA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6IC0gaW52YWxpZCBoaW50OlxuICAgIG5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc0FsbG93ZWRIaW50LCBpc0FsbG93ZWRIaW50LFxuICAtPiB0cnVlXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBlcSxcbiAgKF9mcm9tLCB0bykgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQgLVxuICAgICAgJ2Zyb20nICgje19mcm9tfSkgYW5kICd0bycgKCN7dG99KSBoaW50cyBjYW5ub3QgYmUgaWRlbnRpY2FsLlwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc09iamVjdCxcbiAgKHtmcm9tOl9mcm9tLCB0b30pIC0+IGlzSGludCBfZnJvbSwgdG9cblxuIyBjb252ZXJ0IHRha2VzIGEgcGllY2Ugb2YgZGF0YSBhbmQgY29udmVydHMgaXQgYnkgdXNpbmcgZGVjb2RlIHRvIGdldCBieXRlcyxcbiMgdGhlbiBlbmNvZGUgdG8gZ2V0IHRoZSBmaW5hbCBmb3JtYXQuXG5jb252ZXJ0ID0gTWV0aG9kLmNyZWF0ZSBkZWZhdWx0OiAoYXJncy4uLikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0OjogLVxuICAgIG5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgY29udmVydCwgKHVuYXJ5IGlzSGludCksIGlzRGVmaW5lZCxcbiAgKHtmcm9tOiBfZnJvbSwgdG99LCB2YWx1ZSkgLT4gZW5jb2RlIHRvLCBkZWNvZGUgX2Zyb20sIHZhbHVlXG5cblxuZXhwb3J0IHtcbiAgY29udmVydFxuICBpc0J5dGVzXG59XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/src/utils.coffee
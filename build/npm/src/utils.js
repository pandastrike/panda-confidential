"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areType = exports.isAllowedHint = exports.isBytes = exports.convert = void 0;

var _pandaGarden = require("panda-garden");

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = _interopRequireDefault(require("panda-generics"));

var _utf = require("@stablelib/utf8");

var _base = require("@stablelib/base64");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowedHints,
    areType,
    convert,
    decode,
    encode,
    hint,
    isAllowedHint,
    isBytes,
    isHint,
    indexOf = [].indexOf;
exports.isBytes = isBytes;
exports.isAllowedHint = isAllowedHint;
exports.convert = convert;
exports.areType = areType;
// Apply isType to a collection.
exports.areType = areType = (0, _pandaGarden.curry)(function (typeCheck, array) {
  var i, item, len;

  if (!(0, _pandaParchment.isArray)(array)) {
    return false;
  }

  for (i = 0, len = array.length; i < len; i++) {
    item = array[i];

    if (!typeCheck(item)) {
      return false;
    }
  }

  return true;
});
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

decode = _pandaGenerics.default.create({
  name: "decode",
  description: "Uses an encoding hint to decode a given string into a byte array. NoOp on bytes."
});

_pandaGenerics.default.define(decode, hint.isBytes, isBytes, function (_, bytes) {
  return bytes; // no op, but enforcing bytes type
});

_pandaGenerics.default.define(decode, hint.isUTF8, _pandaParchment.isString, function (_, string) {
  return (0, _utf.encode)(string);
});

_pandaGenerics.default.define(decode, hint.isBase64, _pandaParchment.isString, function (_, string) {
  return (0, _base.decode)(string);
});

_pandaGenerics.default.define(decode, hint.isSafeBase64, _pandaParchment.isString, function (_, string) {
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

  return (0, _base.decode)(string.replace(/\-/g, '+').replace(/\_/g, '/') + padding);
}); // encode takes a byte array and formats it according to the hint.


encode = _pandaGenerics.default.create({
  name: "encode",
  description: "Encodes a given byte array using an encoding hint."
});

_pandaGenerics.default.define(encode, hint.isBytes, isBytes, function (_, bytes) {
  return bytes; // no op, but enforcing bytes type
});

_pandaGenerics.default.define(encode, hint.isUTF8, isBytes, function (_, bytes) {
  return (0, _utf.decode)(bytes);
});

_pandaGenerics.default.define(encode, hint.isBase64, isBytes, function (_, bytes) {
  return (0, _base.encode)(bytes);
});

_pandaGenerics.default.define(encode, hint.isSafeBase64, isBytes, function (_, bytes) {
  // Based on RFC 4648's "base64url" mapping:
  // https://tools.ietf.org/html/rfc4648#section-5
  return encode("base64", bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
});

isHint = _pandaGenerics.default.create({
  name: "isHint",
  description: "Checks to see if the arugment is a valid hint."
});

_pandaGenerics.default.define(isHint, isAllowedHint, isAllowedHint, function () {
  return true;
});

_pandaGenerics.default.define(isHint, _pandaParchment.eq, function (_from, to) {
  throw new Error(`panda-confidential::convert - 'from' (${_from}) and 'to' (${to}) hints cannot be identical.`);
});

_pandaGenerics.default.define(isHint, _pandaParchment.isObject, function ({
  from: _from,
  to
}) {
  return isHint(_from, to);
}); // convert takes a piece of data and converts it by using decode to get bytes,
// then encode to get the final format.


exports.convert = convert = _pandaGenerics.default.create({
  name: "convert",
  description: "Converts data from one form to another according to a hint."
});

_pandaGenerics.default.define(convert, (0, _pandaGarden.unary)(isHint), _pandaParchment.isDefined, function ({
  from: _from,
  to
}, value) {
  return encode(to, decode(_from, value));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL3V0aWxzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBQ0E7Ozs7QUFQQSxJQUFBLFlBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBLGFBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLE9BQUEsR0FBQSxHQUFBLE9BQUE7Ozs7OztBQVVBLGtCQUFBLE9BQUEsR0FBVSx3QkFBTSxVQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUE7QUFDZCxNQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQTs7QUFBQSxNQUFBLENBQW9CLDZCQUFwQixLQUFvQixDQUFwQixFQUFBO0FBQUEsV0FBQSxLQUFBOzs7QUFDQSxPQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7O0FBQ0UsUUFBQSxDQUFvQixTQUFBLENBQXBCLElBQW9CLENBQXBCLEVBQUE7QUFBQSxhQUFBLEtBQUE7O0FBREY7O1NBRUEsSTtBQUpRLENBQUEsQ0FBVjtBQU1BLGtCQUFBLE9BQUEsR0FBVSw0QkFBQSxVQUFBLENBQVY7QUFFQSxZQUFBLEdBQWUsQ0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxhQUFBLENBQWY7O0FBQ0Esd0JBQUEsYUFBQSxHQUFnQixVQUFBLENBQUEsRUFBQTtTQUFPLE9BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLENBQUEsS0FBQSxDO0FBQVAsQ0FBaEI7O0FBRUEsSUFBQSxHQUNFO0FBQUEsRUFBQSxPQUFBLEVBQVMsd0JBQVQsT0FBUyxDQUFUO0FBQ0EsRUFBQSxN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QSxFQUFBO0FBQ0UsUUFBTSxJQUFBLEtBQUEsQ0FBVSx5Q0FBQSxLQUFBLGVBQUEsRUFBViw4QkFBQSxDQUFOO0FBRkosQ0FBQTs7QUFLQSx1QkFBQSxNQUFBLENBQUEsTUFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsSUFBQSxFQUFELEtBQUE7QUFBYSxFQUFBO0FBQWIsQ0FBRCxFQUFBO1NBQXNCLE1BQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxDO0FBN0Z4QixDQTRGQSxFOzs7O0FBS0Esa0JBQUEsT0FBQSxHQUFVLHVCQUFBLE1BQUEsQ0FDUjtBQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUE7QUFDQSxFQUFBLFdBQUEsRUFBYTtBQURiLENBRFEsQ0FBVjs7QUFJQSx1QkFBQSxNQUFBLENBQUEsT0FBQSxFQUF3Qix3QkFBeEIsTUFBd0IsQ0FBeEIsRUFBQSx5QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWMsRUFBQTtBQUFkLENBQUQsRUFBQSxLQUFBLEVBQUE7U0FBOEIsTUFBQSxDQUFBLEVBQUEsRUFBVyxNQUFBLENBQUEsS0FBQSxFQUFYLEtBQVcsQ0FBWCxDO0FBRGhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VuYXJ5LCBjdXJyeX0gZnJvbSBcInBhbmRhLWdhcmRlblwiXG5pbXBvcnQge2lzVHlwZSwgaXNPYmplY3QsIGlzU3RyaW5nLCBpc0FycmF5LCBlcSwgaXNEZWZpbmVkLCB0b0pTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IE1ldGhvZCBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuXG4jIFRoZSBhdXRob3Igb2YgdHdlZXRuYWNsLWpzIHN0cm9uZ2x5IHJlY29tbWVuZHMgaGlzIHN0YWJsZWxpYiBtb2R1bGVzLCBidXRcbiMgYmUgY2FyZWZ1bCB3aXRoIHRoZSBlbmNvZGUtZGVjb2RlIG5hbWUgY29udmVudGlvbi5cbmltcG9ydCB7ZW5jb2RlIGFzIGRlY29kZVVURjgsIGRlY29kZSBhcyBlbmNvZGVVVEY4fSBmcm9tIFwiQHN0YWJsZWxpYi91dGY4XCJcbmltcG9ydCB7ZGVjb2RlIGFzIGRlY29kZUJhc2U2NCwgZW5jb2RlIGFzIGVuY29kZUJhc2U2NH0gZnJvbSBcIkBzdGFibGVsaWIvYmFzZTY0XCJcblxuIyBBcHBseSBpc1R5cGUgdG8gYSBjb2xsZWN0aW9uLlxuYXJlVHlwZSA9IGN1cnJ5ICh0eXBlQ2hlY2ssIGFycmF5KSAtPlxuICByZXR1cm4gZmFsc2UgdW5sZXNzIGlzQXJyYXkgYXJyYXlcbiAgZm9yIGl0ZW0gaW4gYXJyYXlcbiAgICByZXR1cm4gZmFsc2UgdW5sZXNzIHR5cGVDaGVjayBpdGVtXG4gIHRydWVcblxuaXNCeXRlcyA9IGlzVHlwZSBVaW50OEFycmF5XG5cbmFsbG93ZWRIaW50cyA9IFtcImJ5dGVzXCIsIFwidXRmOFwiLCBcImJhc2U2NFwiLCBcInNhZmUtYmFzZTY0XCJdXG5pc0FsbG93ZWRIaW50ID0gKHgpIC0+IHggaW4gYWxsb3dlZEhpbnRzXG5cbmhpbnQgPVxuICBpc0J5dGVzOiBlcSBcImJ5dGVzXCJcbiAgaXNVVEY4OiBlcSBcInV0ZjhcIlxuICBpc0Jhc2U2NDogZXEgXCJiYXNlNjRcIlxuICBpc1NhZmVCYXNlNjQ6IGVxIFwic2FmZS1iYXNlNjRcIlxuXG5cbiMgZGVjb2RlIHRha2VzIGFuIGlucHV0IGFuZCBicmVha3MgaXQgZG93biB0byBhIGJ5dGUgYXJyYXkuXG5kZWNvZGUgPSBNZXRob2QuY3JlYXRlXG4gIG5hbWU6IFwiZGVjb2RlXCJcbiAgZGVzY3JpcHRpb246IFwiVXNlcyBhbiBlbmNvZGluZyBoaW50IHRvIGRlY29kZSBhIGdpdmVuIHN0cmluZyBpbnRvIGFcbiAgICBieXRlIGFycmF5LiBOb09wIG9uIGJ5dGVzLlwiXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzQnl0ZXMsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gYnl0ZXMgICMgbm8gb3AsIGJ1dCBlbmZvcmNpbmcgYnl0ZXMgdHlwZVxuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc1VURjgsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPiBkZWNvZGVVVEY4IHN0cmluZ1xuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0Jhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZUJhc2U2NCBzdHJpbmdcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT5cbiAgICAjIEJhc2VkIG9uIFJGQyA0NjQ4J3MgXCJiYXNlNjR1cmxcIiBtYXBwaW5nOlxuICAgICMgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQ2NDgjc2VjdGlvbi01XG4gICAgcGFkZGluZyA9XG4gICAgICBzd2l0Y2ggc3RyaW5nLmxlbmd0aCAlIDRcbiAgICAgICAgd2hlbiAzIHRoZW4gXCI9XCJcbiAgICAgICAgd2hlbiAyIHRoZW4gXCI9PVwiXG4gICAgICAgIGVsc2UgXCJcIlxuICAgIGRlY29kZUJhc2U2NCBzdHJpbmcucmVwbGFjZSgvXFwtL2csICcrJykucmVwbGFjZSgvXFxfL2csICcvJykgKyBwYWRkaW5nXG5cblxuIyBlbmNvZGUgdGFrZXMgYSBieXRlIGFycmF5IGFuZCBmb3JtYXRzIGl0IGFjY29yZGluZyB0byB0aGUgaGludC5cbmVuY29kZSA9IE1ldGhvZC5jcmVhdGVcbiAgbmFtZTogXCJlbmNvZGVcIlxuICBkZXNjcmlwdGlvbjogXCJFbmNvZGVzIGEgZ2l2ZW4gYnl0ZSBhcnJheSB1c2luZyBhbiBlbmNvZGluZyBoaW50LlwiXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzQnl0ZXMsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gYnl0ZXMgICMgbm8gb3AsIGJ1dCBlbmZvcmNpbmcgYnl0ZXMgdHlwZVxuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc1VURjgsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gIGVuY29kZVVURjggYnl0ZXNcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNCYXNlNjQsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gIGVuY29kZUJhc2U2NCBieXRlc1xuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc1NhZmVCYXNlNjQsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT5cbiAgICAjIEJhc2VkIG9uIFJGQyA0NjQ4J3MgXCJiYXNlNjR1cmxcIiBtYXBwaW5nOlxuICAgICMgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQ2NDgjc2VjdGlvbi01XG4gICAgZW5jb2RlIFwiYmFzZTY0XCIsIGJ5dGVzXG4gICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgLnJlcGxhY2UoL1xcPSskLywgJycpXG5cblxuXG5pc0hpbnQgPSBNZXRob2QuY3JlYXRlXG4gIG5hbWU6IFwiaXNIaW50XCJcbiAgZGVzY3JpcHRpb246IFwiQ2hlY2tzIHRvIHNlZSBpZiB0aGUgYXJ1Z21lbnQgaXMgYSB2YWxpZCBoaW50LlwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc0FsbG93ZWRIaW50LCBpc0FsbG93ZWRIaW50LFxuICAtPiB0cnVlXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBlcSxcbiAgKF9mcm9tLCB0bykgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQgLVxuICAgICAgJ2Zyb20nICgje19mcm9tfSkgYW5kICd0bycgKCN7dG99KSBoaW50cyBjYW5ub3QgYmUgaWRlbnRpY2FsLlwiXG5cbk1ldGhvZC5kZWZpbmUgaXNIaW50LCBpc09iamVjdCxcbiAgKHtmcm9tOl9mcm9tLCB0b30pIC0+IGlzSGludCBfZnJvbSwgdG9cblxuIyBjb252ZXJ0IHRha2VzIGEgcGllY2Ugb2YgZGF0YSBhbmQgY29udmVydHMgaXQgYnkgdXNpbmcgZGVjb2RlIHRvIGdldCBieXRlcyxcbiMgdGhlbiBlbmNvZGUgdG8gZ2V0IHRoZSBmaW5hbCBmb3JtYXQuXG5jb252ZXJ0ID0gTWV0aG9kLmNyZWF0ZVxuICBuYW1lOiBcImNvbnZlcnRcIlxuICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0cyBkYXRhIGZyb20gb25lIGZvcm0gdG8gYW5vdGhlciBhY2NvcmRpbmcgdG8gYSBoaW50LlwiXG5cbk1ldGhvZC5kZWZpbmUgY29udmVydCwgKHVuYXJ5IGlzSGludCksIGlzRGVmaW5lZCxcbiAgKHtmcm9tOiBfZnJvbSwgdG99LCB2YWx1ZSkgLT4gZW5jb2RlIHRvLCBkZWNvZGUgX2Zyb20sIHZhbHVlXG5cblxuZXhwb3J0IHtcbiAgY29udmVydFxuICBpc0J5dGVzXG4gIGlzQWxsb3dlZEhpbnRcbiAgYXJlVHlwZVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/repos/panda-confidential/src/utils.coffee
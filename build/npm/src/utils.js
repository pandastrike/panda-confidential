"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areType = exports.isAllowedHint = exports.isBytes = exports.convert = void 0;

var _garden = require("@pandastrike/garden");

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
exports.areType = areType = (0, _garden.curry)(function (typeCheck, array) {
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

_pandaGenerics.default.define(convert, (0, _garden.unary)(isHint), _pandaParchment.isDefined, function ({
  from: _from,
  to
}, value) {
  return encode(to, decode(_from, value));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL3V0aWxzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBQ0E7Ozs7QUFQQSxJQUFBLFlBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBLGFBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE1BQUE7QUFBQSxJQUFBLE9BQUEsR0FBQSxHQUFBLE9BQUE7Ozs7OztBQVVBLGtCQUFBLE9BQUEsR0FBVSxtQkFBTSxVQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUE7QUFDZCxNQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQTs7QUFBQSxNQUFBLENBQW9CLDZCQUFwQixLQUFvQixDQUFwQixFQUFBO0FBQUEsV0FBQSxLQUFBOzs7QUFDQSxPQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7O0FBQ0UsUUFBQSxDQUFvQixTQUFBLENBQXBCLElBQW9CLENBQXBCLEVBQUE7QUFBQSxhQUFBLEtBQUE7O0FBREY7O1NBRUEsSTtBQUpRLENBQUEsQ0FBVjtBQU1BLGtCQUFBLE9BQUEsR0FBVSw0QkFBQSxVQUFBLENBQVY7QUFFQSxZQUFBLEdBQWUsQ0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxhQUFBLENBQWY7O0FBQ0Esd0JBQUEsYUFBQSxHQUFnQixVQUFBLENBQUEsRUFBQTtTQUFPLE9BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLENBQUEsS0FBQSxDO0FBQVAsQ0FBaEI7O0FBRUEsSUFBQSxHQUNFO0FBQUEsRUFBQSxPQUFBLEVBQVMsd0JBQVQsT0FBUyxDQUFUO0FBQ0EsRUFBQSxN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QSxFQUFBO0FBQ0UsUUFBTSxJQUFBLEtBQUEsQ0FBVSx5Q0FBQSxLQUFBLGVBQUEsRUFBViw4QkFBQSxDQUFOO0FBRkosQ0FBQTs7QUFLQSx1QkFBQSxNQUFBLENBQUEsTUFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsSUFBQSxFQUFELEtBQUE7QUFBYSxFQUFBO0FBQWIsQ0FBRCxFQUFBO1NBQXNCLE1BQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxDO0FBN0Z4QixDQTRGQSxFOzs7O0FBS0Esa0JBQUEsT0FBQSxHQUFVLHVCQUFBLE1BQUEsQ0FDUjtBQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUE7QUFDQSxFQUFBLFdBQUEsRUFBYTtBQURiLENBRFEsQ0FBVjs7QUFJQSx1QkFBQSxNQUFBLENBQUEsT0FBQSxFQUF3QixtQkFBeEIsTUFBd0IsQ0FBeEIsRUFBQSx5QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWMsRUFBQTtBQUFkLENBQUQsRUFBQSxLQUFBLEVBQUE7U0FBOEIsTUFBQSxDQUFBLEVBQUEsRUFBVyxNQUFBLENBQUEsS0FBQSxFQUFYLEtBQVcsQ0FBWCxDO0FBRGhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VuYXJ5LCBjdXJyeX0gZnJvbSBcIkBwYW5kYXN0cmlrZS9nYXJkZW5cIlxuaW1wb3J0IHtpc1R5cGUsIGlzT2JqZWN0LCBpc1N0cmluZywgaXNBcnJheSwgZXEsIGlzRGVmaW5lZCwgdG9KU09OfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCBNZXRob2QgZnJvbSBcInBhbmRhLWdlbmVyaWNzXCJcblxuIyBUaGUgYXV0aG9yIG9mIHR3ZWV0bmFjbC1qcyBzdHJvbmdseSByZWNvbW1lbmRzIGhpcyBzdGFibGVsaWIgbW9kdWxlcywgYnV0XG4jIGJlIGNhcmVmdWwgd2l0aCB0aGUgZW5jb2RlLWRlY29kZSBuYW1lIGNvbnZlbnRpb24uXG5pbXBvcnQge2VuY29kZSBhcyBkZWNvZGVVVEY4LCBkZWNvZGUgYXMgZW5jb2RlVVRGOH0gZnJvbSBcIkBzdGFibGVsaWIvdXRmOFwiXG5pbXBvcnQge2RlY29kZSBhcyBkZWNvZGVCYXNlNjQsIGVuY29kZSBhcyBlbmNvZGVCYXNlNjR9IGZyb20gXCJAc3RhYmxlbGliL2Jhc2U2NFwiXG5cbiMgQXBwbHkgaXNUeXBlIHRvIGEgY29sbGVjdGlvbi5cbmFyZVR5cGUgPSBjdXJyeSAodHlwZUNoZWNrLCBhcnJheSkgLT5cbiAgcmV0dXJuIGZhbHNlIHVubGVzcyBpc0FycmF5IGFycmF5XG4gIGZvciBpdGVtIGluIGFycmF5XG4gICAgcmV0dXJuIGZhbHNlIHVubGVzcyB0eXBlQ2hlY2sgaXRlbVxuICB0cnVlXG5cbmlzQnl0ZXMgPSBpc1R5cGUgVWludDhBcnJheVxuXG5hbGxvd2VkSGludHMgPSBbXCJieXRlc1wiLCBcInV0ZjhcIiwgXCJiYXNlNjRcIiwgXCJzYWZlLWJhc2U2NFwiXVxuaXNBbGxvd2VkSGludCA9ICh4KSAtPiB4IGluIGFsbG93ZWRIaW50c1xuXG5oaW50ID1cbiAgaXNCeXRlczogZXEgXCJieXRlc1wiXG4gIGlzVVRGODogZXEgXCJ1dGY4XCJcbiAgaXNCYXNlNjQ6IGVxIFwiYmFzZTY0XCJcbiAgaXNTYWZlQmFzZTY0OiBlcSBcInNhZmUtYmFzZTY0XCJcblxuXG4jIGRlY29kZSB0YWtlcyBhbiBpbnB1dCBhbmQgYnJlYWtzIGl0IGRvd24gdG8gYSBieXRlIGFycmF5LlxuZGVjb2RlID0gTWV0aG9kLmNyZWF0ZVxuICBuYW1lOiBcImRlY29kZVwiXG4gIGRlc2NyaXB0aW9uOiBcIlVzZXMgYW4gZW5jb2RpbmcgaGludCB0byBkZWNvZGUgYSBnaXZlbiBzdHJpbmcgaW50byBhXG4gICAgYnl0ZSBhcnJheS4gTm9PcCBvbiBieXRlcy5cIlxuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNVVEY4LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT4gZGVjb2RlVVRGOCBzdHJpbmdcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNCYXNlNjQsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPiBkZWNvZGVCYXNlNjQgc3RyaW5nXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIHBhZGRpbmcgPVxuICAgICAgc3dpdGNoIHN0cmluZy5sZW5ndGggJSA0XG4gICAgICAgIHdoZW4gMyB0aGVuIFwiPVwiXG4gICAgICAgIHdoZW4gMiB0aGVuIFwiPT1cIlxuICAgICAgICBlbHNlIFwiXCJcbiAgICBkZWNvZGVCYXNlNjQgc3RyaW5nLnJlcGxhY2UoL1xcLS9nLCAnKycpLnJlcGxhY2UoL1xcXy9nLCAnLycpICsgcGFkZGluZ1xuXG5cbiMgZW5jb2RlIHRha2VzIGEgYnl0ZSBhcnJheSBhbmQgZm9ybWF0cyBpdCBhY2NvcmRpbmcgdG8gdGhlIGhpbnQuXG5lbmNvZGUgPSBNZXRob2QuY3JlYXRlXG4gIG5hbWU6IFwiZW5jb2RlXCJcbiAgZGVzY3JpcHRpb246IFwiRW5jb2RlcyBhIGdpdmVuIGJ5dGUgYXJyYXkgdXNpbmcgYW4gZW5jb2RpbmcgaGludC5cIlxuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNVVEY4LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+ICBlbmNvZGVVVEY4IGJ5dGVzXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+ICBlbmNvZGVCYXNlNjQgYnl0ZXNcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIGVuY29kZSBcImJhc2U2NFwiLCBieXRlc1xuICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgIC5yZXBsYWNlKC9cXD0rJC8sICcnKVxuXG5cblxuaXNIaW50ID0gTWV0aG9kLmNyZWF0ZVxuICBuYW1lOiBcImlzSGludFwiXG4gIGRlc2NyaXB0aW9uOiBcIkNoZWNrcyB0byBzZWUgaWYgdGhlIGFydWdtZW50IGlzIGEgdmFsaWQgaGludC5cIlxuXG5NZXRob2QuZGVmaW5lIGlzSGludCwgaXNBbGxvd2VkSGludCwgaXNBbGxvd2VkSGludCxcbiAgLT4gdHJ1ZVxuXG5NZXRob2QuZGVmaW5lIGlzSGludCwgZXEsXG4gIChfZnJvbSwgdG8pIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0IC1cbiAgICAgICdmcm9tJyAoI3tfZnJvbX0pIGFuZCAndG8nICgje3RvfSkgaGludHMgY2Fubm90IGJlIGlkZW50aWNhbC5cIlxuXG5NZXRob2QuZGVmaW5lIGlzSGludCwgaXNPYmplY3QsXG4gICh7ZnJvbTpfZnJvbSwgdG99KSAtPiBpc0hpbnQgX2Zyb20sIHRvXG5cbiMgY29udmVydCB0YWtlcyBhIHBpZWNlIG9mIGRhdGEgYW5kIGNvbnZlcnRzIGl0IGJ5IHVzaW5nIGRlY29kZSB0byBnZXQgYnl0ZXMsXG4jIHRoZW4gZW5jb2RlIHRvIGdldCB0aGUgZmluYWwgZm9ybWF0LlxuY29udmVydCA9IE1ldGhvZC5jcmVhdGVcbiAgbmFtZTogXCJjb252ZXJ0XCJcbiAgZGVzY3JpcHRpb246IFwiQ29udmVydHMgZGF0YSBmcm9tIG9uZSBmb3JtIHRvIGFub3RoZXIgYWNjb3JkaW5nIHRvIGEgaGludC5cIlxuXG5NZXRob2QuZGVmaW5lIGNvbnZlcnQsICh1bmFyeSBpc0hpbnQpLCBpc0RlZmluZWQsXG4gICh7ZnJvbTogX2Zyb20sIHRvfSwgdmFsdWUpIC0+IGVuY29kZSB0bywgZGVjb2RlIF9mcm9tLCB2YWx1ZVxuXG5cbmV4cG9ydCB7XG4gIGNvbnZlcnRcbiAgaXNCeXRlc1xuICBpc0FsbG93ZWRIaW50XG4gIGFyZVR5cGVcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/src/utils.coffee
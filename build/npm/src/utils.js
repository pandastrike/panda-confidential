"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areType = exports.isAllowedHint = exports.isBytes = exports.convert = void 0;

var _pandaGarden = require("panda-garden");

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _utf = require("@stablelib/utf8");

var _base = require("@stablelib/base64");

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

decode = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert::decode - Confirm your data type matches the hint. No matches on ${(0, _pandaParchment.toJSON)(args)}`);
  }
});

_pandaGenerics.Method.define(decode, hint.isBytes, isBytes, function (_, bytes) {
  return bytes; // no op, but enforcing bytes type
});

_pandaGenerics.Method.define(decode, hint.isUTF8, _pandaParchment.isString, function (_, string) {
  return (0, _utf.encode)(string);
});

_pandaGenerics.Method.define(decode, hint.isBase64, _pandaParchment.isString, function (_, string) {
  return (0, _base.decode)(string);
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

  return (0, _base.decode)(string.replace(/\-/g, '+').replace(/\_/g, '/') + padding);
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
  return (0, _utf.decode)(bytes);
});

_pandaGenerics.Method.define(encode, hint.isBase64, isBytes, function (_, bytes) {
  return (0, _base.encode)(bytes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL3V0aWxzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBUEEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxhQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7Ozs7QUFVQSxrQkFBQSxPQUFBLEdBQVUsd0JBQU0sVUFBQSxTQUFBLEVBQUEsS0FBQSxFQUFBO0FBQ2QsTUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUE7O0FBQUEsTUFBQSxDQUFvQiw2QkFBcEIsS0FBb0IsQ0FBcEIsRUFBQTtBQUFBLFdBQUEsS0FBQTs7O0FBQ0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7OztBQUNFLFFBQUEsQ0FBb0IsU0FBQSxDQUFwQixJQUFvQixDQUFwQixFQUFBO0FBQUEsYUFBQSxLQUFBOztBQURGOztTQUVBLEk7QUFKUSxDQUFBLENBQVY7QUFNQSxrQkFBQSxPQUFBLEdBQVUsNEJBQUEsVUFBQSxDQUFWO0FBRUEsWUFBQSxHQUFlLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxDQUFmOztBQUNBLHdCQUFBLGFBQUEsR0FBZ0IsVUFBQSxDQUFBLEVBQUE7U0FBTyxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxDQUFBLEtBQUEsQztBQUFQLENBQWhCOztBQUVBLElBQUEsR0FDRTtBQUFBLEVBQUEsT0FBQSxFQUFTLHdCQUFULE9BQVMsQ0FBVDtBQUNBLEVBQUEsTUFB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QUNFLENBRFosRUFBQSxDQUFOO0FBRDhCO0FBQVQsQ0FBZCxDQUFUOztBQUlBLHNCQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQUEsYUFBQSxFQUFBLGFBQUEsRUFDRSxZQUFBO1NBQUcsSTtBQURMLENBQUE7O0FBR0Esc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSxrQkFBQSxFQUNFLFVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQTtBQUNFLFFBQU0sSUFBQSxLQUFBLENBQVUseUNBQUEsS0FBQSxlQUFBLEVBQVYsOEJBQUEsQ0FBTjtBQUZKLENBQUE7O0FBS0Esc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWEsRUFBQTtBQUFiLENBQUQsRUFBQTtTQUFzQixNQUFBLENBQUEsS0FBQSxFQUFBLEVBQUEsQztBQTlGeEIsQ0E2RkEsRTs7OztBQUtBLGtCQUFBLE9BQUEsR0FBVSxzQkFBQSxNQUFBLENBQWM7QUFBQSxFQUFBLE9BQUEsRUFBUyxVQUFBLEdBQUEsSUFBQSxFQUFBO0FBQy9CLFVBQU0sSUFBQSxLQUFBLENBQVUsaURBQ0UsNEJBREYsSUFDRSxDQURaLEVBQUEsQ0FBTjtBQUQrQjtBQUFULENBQWQsQ0FBVjs7QUFJQSxzQkFBQSxNQUFBLENBQUEsT0FBQSxFQUF3Qix3QkFBeEIsTUFBd0IsQ0FBeEIsRUFBQSx5QkFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLElBQUEsRUFBRCxLQUFBO0FBQWMsRUFBQTtBQUFkLENBQUQsRUFBQSxLQUFBLEVBQUE7U0FBOEIsTUFBQSxDQUFBLEVBQUEsRUFBVyxNQUFBLENBQUEsS0FBQSxFQUFYLEtBQVcsQ0FBWCxDO0FBRGhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VuYXJ5LCBjdXJyeX0gZnJvbSBcInBhbmRhLWdhcmRlblwiXG5pbXBvcnQge2lzVHlwZSwgaXNPYmplY3QsIGlzU3RyaW5nLCBpc0FycmF5LCBlcSwgaXNEZWZpbmVkLCB0b0pTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5cbiMgVGhlIGF1dGhvciBvZiB0d2VldG5hY2wtanMgc3Ryb25nbHkgcmVjb21tZW5kcyBoaXMgc3RhYmxlbGliIG1vZHVsZXMsIGJ1dFxuIyBiZSBjYXJlZnVsIHdpdGggdGhlIGVuY29kZS1kZWNvZGUgbmFtZSBjb252ZW50aW9uLlxuaW1wb3J0IHtlbmNvZGUgYXMgZGVjb2RlVVRGOCwgZGVjb2RlIGFzIGVuY29kZVVURjh9IGZyb20gXCJAc3RhYmxlbGliL3V0ZjhcIlxuaW1wb3J0IHtkZWNvZGUgYXMgZGVjb2RlQmFzZTY0LCBlbmNvZGUgYXMgZW5jb2RlQmFzZTY0fSBmcm9tIFwiQHN0YWJsZWxpYi9iYXNlNjRcIlxuXG4jIEFwcGx5IGlzVHlwZSB0byBhIGNvbGxlY3Rpb24uXG5hcmVUeXBlID0gY3VycnkgKHR5cGVDaGVjaywgYXJyYXkpIC0+XG4gIHJldHVybiBmYWxzZSB1bmxlc3MgaXNBcnJheSBhcnJheVxuICBmb3IgaXRlbSBpbiBhcnJheVxuICAgIHJldHVybiBmYWxzZSB1bmxlc3MgdHlwZUNoZWNrIGl0ZW1cbiAgdHJ1ZVxuXG5pc0J5dGVzID0gaXNUeXBlIFVpbnQ4QXJyYXlcblxuYWxsb3dlZEhpbnRzID0gW1wiYnl0ZXNcIiwgXCJ1dGY4XCIsIFwiYmFzZTY0XCIsIFwic2FmZS1iYXNlNjRcIl1cbmlzQWxsb3dlZEhpbnQgPSAoeCkgLT4geCBpbiBhbGxvd2VkSGludHNcblxuaGludCA9XG4gIGlzQnl0ZXM6IGVxIFwiYnl0ZXNcIlxuICBpc1VURjg6IGVxIFwidXRmOFwiXG4gIGlzQmFzZTY0OiBlcSBcImJhc2U2NFwiXG4gIGlzU2FmZUJhc2U2NDogZXEgXCJzYWZlLWJhc2U2NFwiXG5cblxuIyBkZWNvZGUgdGFrZXMgYW4gaW5wdXQgYW5kIGJyZWFrcyBpdCBkb3duIHRvIGEgYnl0ZSBhcnJheS5cbmRlY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZGVjb2RlIC1cbiAgICBDb25maXJtIHlvdXIgZGF0YSB0eXBlIG1hdGNoZXMgdGhlIGhpbnQuXG4gICAgTm8gbWF0Y2hlcyBvbiAje3RvSlNPTiBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzQnl0ZXMsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gYnl0ZXMgICMgbm8gb3AsIGJ1dCBlbmZvcmNpbmcgYnl0ZXMgdHlwZVxuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc1VURjgsIGlzU3RyaW5nLFxuICAoXywgc3RyaW5nKSAtPiBkZWNvZGVVVEY4IHN0cmluZ1xuXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0Jhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZUJhc2U2NCBzdHJpbmdcblxuTWV0aG9kLmRlZmluZSBkZWNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc1N0cmluZyxcbiAgKF8sIHN0cmluZykgLT5cbiAgICAjIEJhc2VkIG9uIFJGQyA0NjQ4J3MgXCJiYXNlNjR1cmxcIiBtYXBwaW5nOlxuICAgICMgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQ2NDgjc2VjdGlvbi01XG4gICAgcGFkZGluZyA9XG4gICAgICBzd2l0Y2ggc3RyaW5nLmxlbmd0aCAlIDRcbiAgICAgICAgd2hlbiAzIHRoZW4gXCI9XCJcbiAgICAgICAgd2hlbiAyIHRoZW4gXCI9PVwiXG4gICAgICAgIGVsc2UgXCJcIlxuICAgIGRlY29kZUJhc2U2NCBzdHJpbmcucmVwbGFjZSgvXFwtL2csICcrJykucmVwbGFjZSgvXFxfL2csICcvJykgKyBwYWRkaW5nXG5cblxuIyBlbmNvZGUgdGFrZXMgYSBieXRlIGFycmF5IGFuZCBmb3JtYXRzIGl0IGFjY29yZGluZyB0byB0aGUgaGludC5cbmVuY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZW5jb2RlIC1cbiAgICBDb25maXJtIHlvdXIgZGF0YSB0eXBlIG1hdGNoZXMgdGhlIGhpbnQuXG4gICAgTm8gbWF0Y2hlcyBvbiAje3RvSlNPTiBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzQnl0ZXMsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gYnl0ZXMgICMgbm8gb3AsIGJ1dCBlbmZvcmNpbmcgYnl0ZXMgdHlwZVxuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc1VURjgsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gIGVuY29kZVVURjggYnl0ZXNcblxuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNCYXNlNjQsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gIGVuY29kZUJhc2U2NCBieXRlc1xuXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc1NhZmVCYXNlNjQsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT5cbiAgICAjIEJhc2VkIG9uIFJGQyA0NjQ4J3MgXCJiYXNlNjR1cmxcIiBtYXBwaW5nOlxuICAgICMgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzQ2NDgjc2VjdGlvbi01XG4gICAgZW5jb2RlIFwiYmFzZTY0XCIsIGJ5dGVzXG4gICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgLnJlcGxhY2UoL1xcPSskLywgJycpXG5cblxuXG5pc0hpbnQgPSBNZXRob2QuY3JlYXRlIGRlZmF1bHQ6IChhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQ6OiAtIGludmFsaWQgaGludDpcbiAgICBubyBtYXRjaGVzIG9uICN7dG9KU09OIGFyZ3N9XCJcblxuTWV0aG9kLmRlZmluZSBpc0hpbnQsIGlzQWxsb3dlZEhpbnQsIGlzQWxsb3dlZEhpbnQsXG4gIC0+IHRydWVcblxuTWV0aG9kLmRlZmluZSBpc0hpbnQsIGVxLFxuICAoX2Zyb20sIHRvKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydCAtXG4gICAgICAnZnJvbScgKCN7X2Zyb219KSBhbmQgJ3RvJyAoI3t0b30pIGhpbnRzIGNhbm5vdCBiZSBpZGVudGljYWwuXCJcblxuTWV0aG9kLmRlZmluZSBpc0hpbnQsIGlzT2JqZWN0LFxuICAoe2Zyb206X2Zyb20sIHRvfSkgLT4gaXNIaW50IF9mcm9tLCB0b1xuXG4jIGNvbnZlcnQgdGFrZXMgYSBwaWVjZSBvZiBkYXRhIGFuZCBjb252ZXJ0cyBpdCBieSB1c2luZyBkZWNvZGUgdG8gZ2V0IGJ5dGVzLFxuIyB0aGVuIGVuY29kZSB0byBnZXQgdGhlIGZpbmFsIGZvcm1hdC5cbmNvbnZlcnQgPSBNZXRob2QuY3JlYXRlIGRlZmF1bHQ6IChhcmdzLi4uKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQ6OiAtXG4gICAgbm8gbWF0Y2hlcyBvbiAje3RvSlNPTiBhcmdzfVwiXG5cbk1ldGhvZC5kZWZpbmUgY29udmVydCwgKHVuYXJ5IGlzSGludCksIGlzRGVmaW5lZCxcbiAgKHtmcm9tOiBfZnJvbSwgdG99LCB2YWx1ZSkgLT4gZW5jb2RlIHRvLCBkZWNvZGUgX2Zyb20sIHZhbHVlXG5cblxuZXhwb3J0IHtcbiAgY29udmVydFxuICBpc0J5dGVzXG4gIGlzQWxsb3dlZEhpbnRcbiAgYXJlVHlwZVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/repos/panda-confidential/src/utils.coffee
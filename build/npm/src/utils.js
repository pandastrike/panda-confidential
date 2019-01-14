"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBytes = exports.convert = void 0;

var _tweetnaclUtil = _interopRequireDefault(require("tweetnacl-util"));

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
    isAny,
    isBytes,
    isEqual,
    isUint8Array,
    indexOf = [].indexOf;
exports.isBytes = isBytes;
exports.convert = convert;
({
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8
} = _tweetnaclUtil.default);

isEqual = function (x) {
  return function (y) {
    return x === y;
  };
};

hint = {
  isBytes: isEqual("bytes"),
  isUTF8: isEqual("utf8"),
  isBase64: isEqual("base64"),
  isSafeBase64: isEqual("safe-base64")
};
isUint8Array = (0, _pandaParchment.isType)(Uint8Array);

exports.isBytes = isBytes = function (x) {
  return (0, _pandaParchment.isBuffer)(x) || isUint8Array(x);
};

isAny = function (x) {
  return true;
};

decode = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert::decode no matches on ${JSON.stringify(args)}`);
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
  var modulo; // Based on RFC 4648's "base64url" mapping:
  // https://tools.ietf.org/html/rfc4648#section-5

  modulo = function () {
    switch (string.length % 4) {
      case 3:
        return "=";

      case 2:
        return "==";

      default:
        return "";
    }
  }();

  return decodeBase64(string.replace(/\-/g, '+').replace(/\_/ / g, '/') + modulo);
});

encode = _pandaGenerics.Method.create({
  default: function (...args) {
    throw new Error(`panda-confidential::convert::encode no matches on ${JSON.stringify(args)}`);
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

allowedHints = ["bytes", "utf8", "base64", "safe-base64"];

exports.convert = convert = function ({
  from: _from,
  to
}, value) {
  if (_from == null) {
    throw new Error("panda-confidential::convert - must provide 'from' hint");
  }

  if (indexOf.call(allowedHints, _from) < 0) {
    throw new Error(`panda-confidential::convert - hint from = '${_from}' not recognized`);
  }

  if (to == null) {
    throw new Error("panda-confidential::convert - must provide 'to' hint");
  }

  if (indexOf.call(allowedHints, to) < 0) {
    throw new Error(`panda-confidential::convert - hint to = '${_from}' not recognized`);
  }

  if (_from === to) {
    throw new Error(`panda-confidential::convert - 'from' (${_from}) and 'to' (${to}) hints are not allowed to be identical.`);
  }

  if (_from === "bytes" && !isBytes(value)) {
    throw new Error(`panda-confidential::convert - 'from' hint is '${_from}', but the input value '${value}', is type ${typeof value}`);
  }

  if ((_from === "utf8" || _from === "base64" || _from === "safe-base64") && !(0, _pandaParchment.isString)(value)) {
    throw new Error(`panda-confidential::convert - 'from' hint is '${_from}', but the input value, '${value}', is type ${typeof value}`);
  }

  return encode(to, decode(_from, value));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy91dGlscy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRkEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxNQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxVQUFBO0FBQUEsSUFBQSxJQUFBO0FBQUEsSUFBQSxLQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBO0FBQUEsSUFBQSxZQUFBO0FBQUEsSUFBQSxPQUFBLEdBQUEsR0FBQSxPQUFBOzs7QUFJQSxDQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQSxVQUFBO0FBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQTtBQUFBLElBQUEsc0JBQUE7O0FBRUEsT0FBQSxHQUFVLFVBQUEsQ0FBQSxFQUFBO1NBQU8sVUFBQSxDQUFBLEVBQUE7V0FBTyxDQUFBLEtBQUssQztBQUFaLEc7QUFBUCxDQUFWOztBQUNBLElBQUEsR0FDRTtBQUFBLEVBQUEsT0FBQSxFQUFTLE9BQUEsQ0FBVCxPQUFTLENBQVQ7QUFDQSxFQUFBLE1BQUEsRUFBUSxPQUFBLENBRFIsTUFDUSxDQURSO0FBRUEsRUFBQSxRQUFBLEVBQVUsT0FBQSxDQUZWLFFBRVUsQ0FGVjtBQUdBLEVBQUEsWUFBQSxFQUFjLE9BQUEsQ0FBQSxhQUFBO0FBSGQsQ0FERjtBQU1BLFlBQUEsR0FBZSw0QkFBQSxVQUFBLENBQWY7O0FBQ0Esa0JBQUEsT0FBQSxHQUFVLFVBQUEsQ0FBQSxFQUFBO1NBQU8sOEJBQUEsQ0FBQSxLQUFlLFlBQUEsQ0FBQSxDQUFBLEM7QUFBdEIsQ0FBVjs7QUFDQSxLQUFBLEdBQVEsVUFBQSxDQUFBLEVBQUE7U0FBTyxJO0FBQVAsQ0FBUjs7QUFFQSxNQUFBLEdBQVMsc0JBQUEsTUFBQSxDQUFjO0FBQUEsRUFBQSxPQUFBLEVBQVMsVUFBQSxHQUFBLElBQUEsRUFBQTtBQUM5QixVQUFNLElBQUEsS0FBQSxDQUFVLHFEQUFxRCxJQUFJLENBQUosU0FBQSxDQUFyRCxJQUFxRCxDQUEvRCxFQUFBLENBQU47QUFEOEI7QUFBVCxDQUFkLENBQVQ7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBc0IsSUFBSSxDQUExQixPQUFBLEVBQUEsT0FBQSxFQUNFLFVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQTtTQUFBLEssQ0FBQSxDQUFBO0FBREYsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFzQixJQUFJLENBQTFCLE1BQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQTtTQUFlLFVBQUEsQ0FBQSxNQUFBLEM7QUFEakIsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFzQixJQUFJLENBQTFCLFFBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQTtTQUFlLFlBQUEsQ0FBQSxNQUFBLEM7QUFEakIsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFzQixJQUFJLENBQTFCLFlBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsQ0FBQSxFQUFBLE1BQUEsRUFBQTtBQUdFLE1BQUEsTUFBQSxDQUhGLEM7OztBQUdFLEVBQUEsTUFBQSxHQUFBLFlBQUE7QUFDRSxZQUFPLE1BQU0sQ0FBTixNQUFBLEdBQVAsQ0FBQTtBQUFBLFdBQUEsQ0FBQTtlQUNjLEc7O0FBRGQsV0FBQSxDQUFBO2VBRWMsSTs7QUFGZDtlQUdPLEU7QUFIUDtHQURGLEVBQUE7O1NBS0EsWUFBQSxDQUFhLE1BQU0sQ0FBTixPQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLENBQW1DLE9BQW5DLENBQUEsRUFBQSxHQUFBLElBQWIsTUFBQSxDO0FBVEosQ0FBQTs7QUFXQSxNQUFBLEdBQVMsc0JBQUEsTUFBQSxDQUFjO0FBQUEsRUFBQSxPQUFBLEVBQVMsVUFBQSxHQUFBLElBQUEsRUFBQTtBQUM5QixVQUFNLElBQUEsS0FBQSxDQUFVLHFEQUFxRCxJQUFJLENBQUosU0FBQSxDQUFyRCxJQUFxRCxDQUEvRCxFQUFBLENBQU47QUFEOEI7QUFBVCxDQUFkLENBQVQ7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBc0IsSUFBSSxDQUExQixPQUFBLEVBQUEsT0FBQSxFQUNFLFVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQTtTQUFBLEssQ0FBQSxDQUFBO0FBREYsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFzQixJQUFJLENBQTFCLE1BQUEsRUFBQSxPQUFBLEVBQ0UsVUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBO1NBQWUsVUFBQSxDQUFBLEtBQUEsQztBQURqQixDQUFBOztBQUVBLHNCQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQXNCLElBQUksQ0FBMUIsUUFBQSxFQUFBLE9BQUEsRUFDRSxVQUFBLENBQUEsRUFBQSxLQUFBLEVBQUE7U0FBZSxZQUFBLENBQUEsS0FBQSxDO0FBRGpCLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBc0IsSUFBSSxDQUExQixZQUFBLEVBQUEsT0FBQSxFQUNFLFVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQTs7O1NBR0UsTUFBQSxDQUFBLFFBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLENBQUEsTUFBQSxFQUFBLEVBQUEsQztBQUpKLENBQUE7O0FBVUEsWUFBQSxHQUFlLENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxDQUFmOztBQUVBLGtCQUFBLE9BQUEsR0FBVSxVQUFDO0FBQUMsRUFBQSxJQUFBLEVBQUQsS0FBQTtBQUFjLEVBQUE7QUFBZCxDQUFELEVBQUEsS0FBQSxFQUFBO0FBQ1IsTUFBSSxLQUFBLElBQUosSUFBQSxFQUFBO0FBQ0UsVUFBTSxJQUFBLEtBQUEsQ0FEUix3REFDUSxDQUFOOzs7QUFFRixNQUFHLE9BQUEsQ0FBQSxJQUFBLENBQUEsWUFBQSxFQUFBLEtBQUEsSUFBSCxDQUFBLEVBQUE7QUFDRSxVQUFNLElBQUEsS0FBQSxDQUFVLDhDQUFBLEtBRGxCLGtCQUNRLENBQU47OztBQUVGLE1BQUksRUFBQSxJQUFKLElBQUEsRUFBQTtBQUNFLFVBQU0sSUFBQSxLQUFBLENBRFIsc0RBQ1EsQ0FBTjs7O0FBRUYsTUFBRyxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQUEsRUFBQSxFQUFBLElBQUgsQ0FBQSxFQUFBO0FBQ0UsVUFBTSxJQUFBLEtBQUEsQ0FBVSw0Q0FBQSxLQURsQixrQkFDUSxDQUFOOzs7QUFFRixNQUFHLEtBQUEsS0FBSCxFQUFBLEVBQUE7QUFDRSxVQUFNLElBQUEsS0FBQSxDQUFVLHlDQUFBLEtBQUEsZUFBQSxFQURsQiwwQ0FDUSxDQUFOOzs7QUFFRixNQUFHLEtBQUEsS0FBQSxPQUFBLElBQW9CLENBQUUsT0FBQSxDQUF6QixLQUF5QixDQUF6QixFQUFBO0FBQ0UsVUFBTSxJQUFBLEtBQUEsQ0FBVSxpREFBQSxLQUFBLDJCQUFBLEtBQUEsY0FBb0csT0FBcEcsS0FEbEIsRUFDUSxDQUFOOzs7QUFFRixNQUFHLENBQUEsS0FBQSxLQUFBLE1BQUEsSUFBQSxLQUFBLEtBQUEsUUFBQSxJQUFBLEtBQUEsS0FBQSxhQUFBLEtBQThDLENBQUUsOEJBQW5ELEtBQW1ELENBQW5ELEVBQUE7QUFDRSxVQUFNLElBQUEsS0FBQSxDQUFVLGlEQUFBLEtBQUEsNEJBQUEsS0FBQSxjQUFxRyxPQUFyRyxLQURsQixFQUNRLENBQU47OztTQUVGLE1BQUEsQ0FBQSxFQUFBLEVBQVcsTUFBQSxDQUFBLEtBQUEsRUFBWCxLQUFXLENBQVgsQztBQXRCUSxDQUFWIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbC11dGlsXCJcbmltcG9ydCB7aXNUeXBlLCBpc0J1ZmZlciwgaXNTdHJpbmd9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5cbntkZWNvZGVCYXNlNjQsIGRlY29kZVVURjgsIGVuY29kZUJhc2U2NCwgZW5jb2RlVVRGOH0gPSBuYWNsXG5cbmlzRXF1YWwgPSAoeCkgLT4gKHkpIC0+IHggPT0geVxuaGludCA9XG4gIGlzQnl0ZXM6IGlzRXF1YWwgXCJieXRlc1wiXG4gIGlzVVRGODogaXNFcXVhbCBcInV0ZjhcIlxuICBpc0Jhc2U2NDogaXNFcXVhbCBcImJhc2U2NFwiXG4gIGlzU2FmZUJhc2U2NDogaXNFcXVhbCBcInNhZmUtYmFzZTY0XCJcblxuaXNVaW50OEFycmF5ID0gaXNUeXBlIFVpbnQ4QXJyYXlcbmlzQnl0ZXMgPSAoeCkgLT4gaXNCdWZmZXIoeCkgfHwgaXNVaW50OEFycmF5KHgpXG5pc0FueSA9ICh4KSAtPiB0cnVlXG5cbmRlY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZGVjb2RlIG5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzVVRGOCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZVVURjggc3RyaW5nXG5NZXRob2QuZGVmaW5lIGRlY29kZSwgaGludC5pc0Jhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+IGRlY29kZUJhc2U2NCBzdHJpbmdcbk1ldGhvZC5kZWZpbmUgZGVjb2RlLCBoaW50LmlzU2FmZUJhc2U2NCwgaXNTdHJpbmcsXG4gIChfLCBzdHJpbmcpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIG1vZHVsbyA9XG4gICAgICBzd2l0Y2ggc3RyaW5nLmxlbmd0aCAlIDRcbiAgICAgICAgd2hlbiAzIHRoZW4gXCI9XCJcbiAgICAgICAgd2hlbiAyIHRoZW4gXCI9PVwiXG4gICAgICAgIGVsc2UgXCJcIlxuICAgIGRlY29kZUJhc2U2NCBzdHJpbmcucmVwbGFjZSgvXFwtL2csICcrJykucmVwbGFjZSgvXFxfLy9nLCAnLycpICsgbW9kdWxvXG5cbmVuY29kZSA9IE1ldGhvZC5jcmVhdGUgZGVmYXVsdDogKGFyZ3MuLi4pIC0+XG4gIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydDo6ZW5jb2RlIG5vIG1hdGNoZXMgb24gI3tKU09OLnN0cmluZ2lmeSBhcmdzfVwiXG5NZXRob2QuZGVmaW5lIGVuY29kZSwgaGludC5pc0J5dGVzLCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+IGJ5dGVzICAjIG5vIG9wLCBidXQgZW5mb3JjaW5nIGJ5dGVzIHR5cGVcbk1ldGhvZC5kZWZpbmUgZW5jb2RlLCBoaW50LmlzVVRGOCwgaXNCeXRlcyxcbiAgKF8sIGJ5dGVzKSAtPiAgZW5jb2RlVVRGOCBieXRlc1xuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNCYXNlNjQsIGlzQnl0ZXMsXG4gIChfLCBieXRlcykgLT4gIGVuY29kZUJhc2U2NCBieXRlc1xuTWV0aG9kLmRlZmluZSBlbmNvZGUsIGhpbnQuaXNTYWZlQmFzZTY0LCBpc0J5dGVzLFxuICAoXywgYnl0ZXMpIC0+XG4gICAgIyBCYXNlZCBvbiBSRkMgNDY0OCdzIFwiYmFzZTY0dXJsXCIgbWFwcGluZzpcbiAgICAjIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM0NjQ4I3NlY3Rpb24tNVxuICAgIGVuY29kZSBcImJhc2U2NFwiLCBieXRlc1xuICAgIC5yZXBsYWNlKC9cXCsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgIC5yZXBsYWNlKC9cXD0rJC8sICcnKVxuXG5cbmFsbG93ZWRIaW50cyA9IFtcImJ5dGVzXCIsIFwidXRmOFwiLCBcImJhc2U2NFwiLCBcInNhZmUtYmFzZTY0XCJdXG5cbmNvbnZlcnQgPSAoe2Zyb206IF9mcm9tLCB0b30sIHZhbHVlKSAtPlxuICBpZiAhX2Zyb20/XG4gICAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0IC0gbXVzdCBwcm92aWRlICdmcm9tJyBoaW50XCJcblxuICBpZiBfZnJvbSBub3QgaW4gYWxsb3dlZEhpbnRzXG4gICAgdGhyb3cgbmV3IEVycm9yIFwicGFuZGEtY29uZmlkZW50aWFsOjpjb252ZXJ0IC0gaGludCBmcm9tID0gJyN7X2Zyb219JyBub3QgcmVjb2duaXplZFwiXG5cbiAgaWYgIXRvP1xuICAgIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydCAtIG11c3QgcHJvdmlkZSAndG8nIGhpbnRcIlxuXG4gIGlmIHRvIG5vdCBpbiBhbGxvd2VkSGludHNcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQgLSBoaW50IHRvID0gJyN7X2Zyb219JyBub3QgcmVjb2duaXplZFwiXG5cbiAgaWYgX2Zyb20gPT0gdG9cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJwYW5kYS1jb25maWRlbnRpYWw6OmNvbnZlcnQgLSAnZnJvbScgKCN7X2Zyb219KSBhbmQgJ3RvJyAoI3t0b30pIGhpbnRzIGFyZSBub3QgYWxsb3dlZCB0byBiZSBpZGVudGljYWwuXCJcblxuICBpZiBfZnJvbSA9PSBcImJ5dGVzXCIgJiYgIShpc0J5dGVzIHZhbHVlKVxuICAgIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydCAtICdmcm9tJyBoaW50IGlzICcje19mcm9tfScsIGJ1dCB0aGUgaW5wdXQgdmFsdWUgJyN7dmFsdWV9JywgaXMgdHlwZSAje3R5cGVvZiB2YWx1ZX1cIlxuXG4gIGlmIF9mcm9tIGluIFtcInV0ZjhcIiwgXCJiYXNlNjRcIiwgXCJzYWZlLWJhc2U2NFwiXSAmJiAhKGlzU3RyaW5nIHZhbHVlKVxuICAgIHRocm93IG5ldyBFcnJvciBcInBhbmRhLWNvbmZpZGVudGlhbDo6Y29udmVydCAtICdmcm9tJyBoaW50IGlzICcje19mcm9tfScsIGJ1dCB0aGUgaW5wdXQgdmFsdWUsICcje3ZhbHVlfScsIGlzIHR5cGUgI3t0eXBlb2YgdmFsdWV9XCJcblxuICBlbmNvZGUgdG8sIGRlY29kZSBfZnJvbSwgdmFsdWVcblxuXG5cbmV4cG9ydCB7XG4gIGNvbnZlcnRcbiAgaXNCeXRlc1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/utils.coffee
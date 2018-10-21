"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPrivateKey = exports.privateKey = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _key = require("./key");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrivateKey, get, isPrivateKey;
exports.isPrivateKey = isPrivateKey;
exports.privateKey = get;
PrivateKey = class PrivateKey extends _key.Key {};
exports.isPrivateKey = isPrivateKey = (0, _pandaParchment.isType)(PrivateKey);
exports.privateKey = get = _pandaGenerics.Method.create();

_pandaGenerics.Method.define(get, _utils.isData, function (input) {
  return new PrivateKey(input);
});

_pandaGenerics.Method.define(get, _pandaParchment.isString, function (input) {
  return get((0, _utils.decode)("base64", input));
});

_pandaGenerics.Method.define(get, _pandaParchment.isString, _pandaParchment.isString, function (input, encoding) {
  return get((0, _utils.decode)(encoding, input));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMvcHJpdmF0ZS1rZXkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUxBLElBQUEsVUFBQSxFQUFBLEdBQUEsRUFBQSxZQUFBOzs7QUFPTSxVQUFBLEdBQU4sTUFBQSxVQUFBLFNBQXlCLFFBQXpCLENBQUEsRUFBTTtBQUVOLHVCQUFBLFlBQUEsR0FBZSw0QkFBQSxVQUFBLENBQWY7QUFFQSxxQkFBQSxHQUFBLEdBQU0sc0JBQUEsTUFBQSxFQUFOOztBQUNBLHNCQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsYUFBQSxFQUNFLFVBQUEsS0FBQSxFQUFBO1NBQVcsSUFBQSxVQUFBLENBQUEsS0FBQSxDO0FBRGIsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQSxLQUFBLEVBQUE7U0FBVyxHQUFBLENBQUksbUJBQUEsUUFBQSxFQUFKLEtBQUksQ0FBSixDO0FBRGIsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLHdCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEtBQUEsRUFBQSxRQUFBLEVBQUE7U0FBcUIsR0FBQSxDQUFJLG1CQUFBLFFBQUEsRUFBSixLQUFJLENBQUosQztBQUR2QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZSwgaXNTdHJpbmd9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5cbmltcG9ydCB7S2V5fSBmcm9tIFwiLi9rZXlcIlxuaW1wb3J0IHtpc0RhdGEsIGRlY29kZX0gZnJvbSBcIi4uL3V0aWxzXCJcblxuY2xhc3MgUHJpdmF0ZUtleSBleHRlbmRzIEtleVxuXG5pc1ByaXZhdGVLZXkgPSBpc1R5cGUgUHJpdmF0ZUtleVxuXG5nZXQgPSBNZXRob2QuY3JlYXRlKClcbk1ldGhvZC5kZWZpbmUgZ2V0LCBpc0RhdGEsXG4gIChpbnB1dCkgLT4gbmV3IFByaXZhdGVLZXkgaW5wdXRcbk1ldGhvZC5kZWZpbmUgZ2V0LCBpc1N0cmluZyxcbiAgKGlucHV0KSAtPiBnZXQgZGVjb2RlIFwiYmFzZTY0XCIsIGlucHV0XG5NZXRob2QuZGVmaW5lIGdldCwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAoaW5wdXQsIGVuY29kaW5nKSAtPiBnZXQgZGVjb2RlIGVuY29kaW5nLCBpbnB1dFxuXG5leHBvcnQge2dldCBhcyBwcml2YXRlS2V5LCBpc1ByaXZhdGVLZXl9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=keys/private-key.coffee
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash;
// Return the SHA-512 hash of a message.
hash = _pandaGenerics.Method.create();

_pandaGenerics.Method.define(hash, _utils.isData, function (message) {
  return (0, _utils.encode)("base64", _tweetnacl.default.hash(message));
});

_pandaGenerics.Method.define(hash, _pandaParchment.isString, _pandaParchment.isString, function (message, encoding) {
  return hash((0, _utils.decode)(encoding, message));
});

_pandaGenerics.Method.define(hash, _pandaParchment.isString, function (message) {
  return hash((0, _utils.decode)("utf8", message));
});

_pandaGenerics.Method.define(hash, _pandaParchment.isObject, function (object) {
  return hash(JSON.stringify(object));
});

var _default = hash;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhc2guY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsSUFBQTs7QUFNQSxJQUFBLEdBQU8sc0JBQUEsTUFBQSxFQUFQOztBQUNBLHNCQUFBLE1BQUEsQ0FBQSxJQUFBLEVBQUEsYUFBQSxFQUNFLFVBQUEsT0FBQSxFQUFBO1NBQWEsbUJBQUEsUUFBQSxFQUFpQixtQkFBQSxJQUFBLENBQWpCLE9BQWlCLENBQWpCLEM7QUFEZixDQUFBOztBQUVBLHNCQUFBLE1BQUEsQ0FBQSxJQUFBLEVBQUEsd0JBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQTtTQUF1QixJQUFBLENBQUssbUJBQUEsUUFBQSxFQUFMLE9BQUssQ0FBTCxDO0FBRHpCLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLElBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsT0FBQSxFQUFBO1NBQWEsSUFBQSxDQUFLLG1CQUFBLE1BQUEsRUFBTCxPQUFLLENBQUwsQztBQURmLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLElBQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsTUFBQSxFQUFBO1NBQVksSUFBQSxDQUFLLElBQUksQ0FBSixTQUFBLENBQUwsTUFBSyxDQUFMLEM7QUFEZCxDQUFBOztlQUdlLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcbmltcG9ydCB7aXNTdHJpbmcsIGlzT2JqZWN0fSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuaW1wb3J0IHtpc0RhdGEsIGRlY29kZSwgZW5jb2RlfSBmcm9tIFwiLi91dGlsc1wiXG5cbiMgUmV0dXJuIHRoZSBTSEEtNTEyIGhhc2ggb2YgYSBtZXNzYWdlLlxuaGFzaCA9IE1ldGhvZC5jcmVhdGUoKVxuTWV0aG9kLmRlZmluZSBoYXNoLCBpc0RhdGEsXG4gIChtZXNzYWdlKSAtPiBlbmNvZGUgXCJiYXNlNjRcIiwgbmFjbC5oYXNoIG1lc3NhZ2Vcbk1ldGhvZC5kZWZpbmUgaGFzaCwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAobWVzc2FnZSwgZW5jb2RpbmcpIC0+IGhhc2ggZGVjb2RlIGVuY29kaW5nLCBtZXNzYWdlXG5NZXRob2QuZGVmaW5lIGhhc2gsIGlzU3RyaW5nLFxuICAobWVzc2FnZSkgLT4gaGFzaCBkZWNvZGUgXCJ1dGY4XCIsIG1lc3NhZ2Vcbk1ldGhvZC5kZWZpbmUgaGFzaCwgaXNPYmplY3QsXG4gIChvYmplY3QpIC0+IGhhc2ggSlNPTi5zdHJpbmdpZnkgb2JqZWN0XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=hash.coffee
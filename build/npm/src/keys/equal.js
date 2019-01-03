"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _utils = require("../utils");

var _key = require("./key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var equal;
// Wrap tweetnacl's constant time comparison method for large values.
equal = _pandaGenerics.Method.create();

_pandaGenerics.Method.define(equal, _utils.isData, _utils.isData, function (x, y) {
  return _tweetnacl.default.verify(x, y);
});

_pandaGenerics.Method.define(equal, _utils.isData, _pandaParchment.isString, function (x, y) {
  return equal(x, (0, _utils.decode)("base64", y));
});

_pandaGenerics.Method.define(equal, _pandaParchment.isString, _utils.isData, function (x, y) {
  return equal((0, _utils.decode)("base64", x), y);
});

_pandaGenerics.Method.define(equal, _pandaParchment.isString, _pandaParchment.isString, function (x, y) {
  return equal((0, _utils.decode)("base64", x), (0, _utils.decode)("base64", y));
});

_pandaGenerics.Method.define(equal, _key.isKey, _utils.isData, function ({
  key: x
}, y) {
  return equal(x, y);
});

_pandaGenerics.Method.define(equal, _utils.isData, _key.isKey, function (x, {
  key: y
}) {
  return equal(x, y);
});

_pandaGenerics.Method.define(equal, _key.isKey, _pandaParchment.isString, function ({
  key: x
}, y) {
  return equal(x, y);
});

_pandaGenerics.Method.define(equal, _pandaParchment.isString, _key.isKey, function (x, {
  key: y
}) {
  return equal(x, y);
});

_pandaGenerics.Method.define(equal, _key.isKey, _key.isKey, function ({
  key: x
}, {
  key: y
}) {
  return equal(x, y);
});

var _default = equal;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMvZXF1YWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUpBLElBQUEsS0FBQTs7QUFPQSxLQUFBLEdBQVEsc0JBQUEsTUFBQSxFQUFSOztBQUNBLHNCQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsYUFBQSxFQUFBLGFBQUEsRUFDRSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7U0FBVSxtQkFBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQztBQURaLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxhQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7U0FBVSxLQUFBLENBQUEsQ0FBQSxFQUFTLG1CQUFBLFFBQUEsRUFBVCxDQUFTLENBQVQsQztBQURaLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSx3QkFBQSxFQUFBLGFBQUEsRUFDRSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7U0FBVSxLQUFBLENBQU0sbUJBQUEsUUFBQSxFQUFOLENBQU0sQ0FBTixFQUFBLENBQUEsQztBQURaLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSx3QkFBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO1NBQVUsS0FBQSxDQUFNLG1CQUFBLFFBQUEsRUFBTixDQUFNLENBQU4sRUFBMkIsbUJBQUEsUUFBQSxFQUEzQixDQUEyQixDQUEzQixDO0FBRFosQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxhQUFBLEVBQ0UsVUFBQztBQUFDLEVBQUEsR0FBQSxFQUFJO0FBQUwsQ0FBRCxFQUFBLENBQUEsRUFBQTtTQUFnQixLQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQztBQURsQixDQUFBOztBQUVBLHNCQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsYUFBQSxFQUFBLFVBQUEsRUFDRSxVQUFBLENBQUEsRUFBSTtBQUFDLEVBQUEsR0FBQSxFQUFJO0FBQUwsQ0FBSixFQUFBO1NBQWdCLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDO0FBRGxCLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFDO0FBQUMsRUFBQSxHQUFBLEVBQUk7QUFBTCxDQUFELEVBQUEsQ0FBQSxFQUFBO1NBQWdCLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDO0FBRGxCLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSx3QkFBQSxFQUFBLFVBQUEsRUFDRSxVQUFBLENBQUEsRUFBSTtBQUFDLEVBQUEsR0FBQSxFQUFJO0FBQUwsQ0FBSixFQUFBO1NBQWdCLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDO0FBRGxCLENBQUE7O0FBRUEsc0JBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUEsVUFBQSxFQUNFLFVBQUM7QUFBQyxFQUFBLEdBQUEsRUFBSTtBQUFMLENBQUQsRUFBVTtBQUFDLEVBQUEsR0FBQSxFQUFJO0FBQUwsQ0FBVixFQUFBO1NBQXNCLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDO0FBRHhCLENBQUE7O2VBR2UsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuYWNsIGZyb20gXCJ0d2VldG5hY2xcIlxuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge01ldGhvZH0gZnJvbSBcInBhbmRhLWdlbmVyaWNzXCJcbmltcG9ydCB7aXNEYXRhLCBkZWNvZGV9IGZyb20gXCIuLi91dGlsc1wiXG5pbXBvcnQge2lzS2V5fSBmcm9tIFwiLi9rZXlcIlxuXG4jIFdyYXAgdHdlZXRuYWNsJ3MgY29uc3RhbnQgdGltZSBjb21wYXJpc29uIG1ldGhvZCBmb3IgbGFyZ2UgdmFsdWVzLlxuZXF1YWwgPSBNZXRob2QuY3JlYXRlKClcbk1ldGhvZC5kZWZpbmUgZXF1YWwsIGlzRGF0YSwgaXNEYXRhLFxuICAoeCwgeSkgLT4gbmFjbC52ZXJpZnkgeCwgeVxuTWV0aG9kLmRlZmluZSBlcXVhbCwgaXNEYXRhLCBpc1N0cmluZyxcbiAgKHgsIHkpIC0+IGVxdWFsIHgsIGRlY29kZShcImJhc2U2NFwiLCB5KVxuTWV0aG9kLmRlZmluZSBlcXVhbCwgaXNTdHJpbmcsIGlzRGF0YSxcbiAgKHgsIHkpIC0+IGVxdWFsIGRlY29kZShcImJhc2U2NFwiLCB4KSwgeVxuTWV0aG9kLmRlZmluZSBlcXVhbCwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAoeCwgeSkgLT4gZXF1YWwgZGVjb2RlKFwiYmFzZTY0XCIsIHgpLCBkZWNvZGUoXCJiYXNlNjRcIiwgeSlcbk1ldGhvZC5kZWZpbmUgZXF1YWwsIGlzS2V5LCBpc0RhdGEsXG4gICh7a2V5Onh9LCB5KSAtPiBlcXVhbCB4LCB5XG5NZXRob2QuZGVmaW5lIGVxdWFsLCBpc0RhdGEsIGlzS2V5LFxuICAoeCwge2tleTp5fSkgLT4gZXF1YWwgeCwgeVxuTWV0aG9kLmRlZmluZSBlcXVhbCwgaXNLZXksIGlzU3RyaW5nLFxuICAoe2tleTp4fSwgeSkgLT4gZXF1YWwgeCwgeVxuTWV0aG9kLmRlZmluZSBlcXVhbCwgaXNTdHJpbmcsIGlzS2V5LFxuICAoeCwge2tleTp5fSkgLT4gZXF1YWwgeCwgeVxuTWV0aG9kLmRlZmluZSBlcXVhbCwgaXNLZXksIGlzS2V5LFxuICAoe2tleTp4fSwge2tleTp5fSkgLT4gZXF1YWwgeCwgeVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbFxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=keys/equal.coffee
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _amen = require("amen");

var _index = require("../../../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hash;

Hash = function () {
  var expectedOutput, hash, message, output;
  ({
    hash
  } = (0, _index.confidential)());
  message = "Hello World!";
  expectedOutput = "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA==";
  output = hash(message);
  return _assert.default.equal(output, expectedOutput, "Unexpected hash result");
};

var _default = Hash;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL3JlZ3VsYXIvaGFzaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRkEsSUFBQSxJQUFBOztBQUlBLElBQUEsR0FBTyxZQUFBO0FBQ0wsTUFBQSxjQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBO0FBQUEsR0FBQTtBQUFBLElBQUE7QUFBQSxNQUFBLDBCQUFBO0FBRUEsRUFBQSxPQUFBLEdBQVUsY0FBVjtBQUNBLEVBQUEsY0FBQSxHQUFpQiwwRkFBakI7QUFFQSxFQUFBLE1BQUEsR0FBUyxJQUFBLENBQUEsT0FBQSxDQUFUO1NBQ0EsZ0JBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxjQUFBLEVBQUEsd0JBQUEsQztBQVBLLENBQVA7O2VBU2UsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge3Rlc3QsIHByaW50fSBmcm9tIFwiYW1lblwiXG5pbXBvcnQge2NvbmZpZGVudGlhbH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9pbmRleFwiXG5cbkhhc2ggPSAtPlxuICB7aGFzaH0gPSBjb25maWRlbnRpYWwoKVxuXG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG4gIGV4cGVjdGVkT3V0cHV0ID0gXCJoaGhFMW5CT2hYUCt3MDJXZmlDOC92UFVKTTlJdmdUbTNBanl2VmpIS1hRemNRRmVyWWtjdzg4Y25UUzBrbVMxRUhVYkgvbmxONU43eEd0ZGIvVHN5QT09XCJcblxuICBvdXRwdXQgPSBoYXNoIG1lc3NhZ2VcbiAgYXNzZXJ0LmVxdWFsIG91dHB1dCwgZXhwZWN0ZWRPdXRwdXQsIFwiVW5leHBlY3RlZCBoYXNoIHJlc3VsdFwiXG5cbmV4cG9ydCBkZWZhdWx0IEhhc2hcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/regular/hash.coffee
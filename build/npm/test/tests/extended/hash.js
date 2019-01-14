"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hash;

Hash = function ({
  hash
}) {
  return function () {
    var expectedOutput, message, output;
    message = "Hello World!";
    expectedOutput = "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA==";
    output = hash(message);
    return _assert.default.equal(output, expectedOutput, "Unexpected hash result");
  };
};

var _default = Hash;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQvaGFzaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQUEsSUFBQSxJQUFBOztBQUVBLElBQUEsR0FBTyxVQUFDO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtTQUFZLFlBQUE7QUFDakIsUUFBQSxjQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxjQUFWO0FBQ0EsSUFBQSxjQUFBLEdBQWlCLDBGQUFqQjtBQUVBLElBQUEsTUFBQSxHQUFTLElBQUEsQ0FBQSxPQUFBLENBQVQ7V0FDQSxnQkFBQSxLQUFBLENBQUEsTUFBQSxFQUFBLGNBQUEsRUFBQSx3QkFBQSxDO0FBTGlCLEc7QUFBWixDQUFQOztlQU9lLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuXG5IYXNoID0gKHtoYXNofSkgLT4gLT5cbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcbiAgZXhwZWN0ZWRPdXRwdXQgPSBcImhoaEUxbkJPaFhQK3cwMldmaUM4L3ZQVUpNOUl2Z1RtM0FqeXZWakhLWFF6Y1FGZXJZa2N3ODhjblRTMGttUzFFSFViSC9ubE41Tjd4R3RkYi9Uc3lBPT1cIlxuXG4gIG91dHB1dCA9IGhhc2ggbWVzc2FnZVxuICBhc3NlcnQuZXF1YWwgb3V0cHV0LCBleHBlY3RlZE91dHB1dCwgXCJVbmV4cGVjdGVkIGhhc2ggcmVzdWx0XCJcblxuZXhwb3J0IGRlZmF1bHQgSGFzaFxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/hash.coffee
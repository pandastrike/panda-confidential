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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL2hhc2guY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUFBLElBQUEsSUFBQTs7QUFFQSxJQUFBLEdBQU8sVUFBQztBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7U0FBWSxZQUFBO0FBQ2pCLFFBQUEsY0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsY0FBVjtBQUNBLElBQUEsY0FBQSxHQUFpQiwwRkFBakI7QUFFQSxJQUFBLE1BQUEsR0FBUyxJQUFBLENBQUEsT0FBQSxDQUFUO1dBQ0EsZ0JBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxjQUFBLEVBQUEsd0JBQUEsQztBQUxpQixHO0FBQVosQ0FBUDs7ZUFPZSxJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcblxuSGFzaCA9ICh7aGFzaH0pIC0+IC0+XG4gIG1lc3NhZ2UgPSBcIkhlbGxvIFdvcmxkIVwiXG4gIGV4cGVjdGVkT3V0cHV0ID0gXCJoaGhFMW5CT2hYUCt3MDJXZmlDOC92UFVKTTlJdmdUbTNBanl2VmpIS1hRemNRRmVyWWtjdzg4Y25UUzBrbVMxRUhVYkgvbmxONU43eEd0ZGIvVHN5QT09XCJcblxuICBvdXRwdXQgPSBoYXNoIG1lc3NhZ2VcbiAgYXNzZXJ0LmVxdWFsIG91dHB1dCwgZXhwZWN0ZWRPdXRwdXQsIFwiVW5leHBlY3RlZCBoYXNoIHJlc3VsdFwiXG5cbmV4cG9ydCBkZWZhdWx0IEhhc2hcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=tests/extended/hash.coffee
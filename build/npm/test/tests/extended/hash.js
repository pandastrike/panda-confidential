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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9oYXNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFBQSxJQUFBLElBQUE7O0FBRUEsSUFBQSxHQUFPLFVBQUM7QUFBRCxFQUFBO0FBQUMsQ0FBRCxFQUFBO1NBQVksWUFBQTtBQUNqQixRQUFBLGNBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQTtBQUFBLElBQUEsT0FBQSxHQUFVLGNBQVY7QUFDQSxJQUFBLGNBQUEsR0FBaUIsMEZBQWpCO0FBRUEsSUFBQSxNQUFBLEdBQVMsSUFBQSxDQUFBLE9BQUEsQ0FBVDtXQUNBLGdCQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsY0FBQSxFQUFBLHdCQUFBLEM7QUFMaUIsRztBQUFaLENBQVA7O2VBT2UsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5cbkhhc2ggPSAoe2hhc2h9KSAtPiAtPlxuICBtZXNzYWdlID0gXCJIZWxsbyBXb3JsZCFcIlxuICBleHBlY3RlZE91dHB1dCA9IFwiaGhoRTFuQk9oWFArdzAyV2ZpQzgvdlBVSk05SXZnVG0zQWp5dlZqSEtYUXpjUUZlcllrY3c4OGNuVFMwa21TMUVIVWJIL25sTjVON3hHdGRiL1RzeUE9PVwiXG5cbiAgb3V0cHV0ID0gaGFzaCBtZXNzYWdlXG4gIGFzc2VydC5lcXVhbCBvdXRwdXQsIGV4cGVjdGVkT3V0cHV0LCBcIlVuZXhwZWN0ZWQgaGFzaCByZXN1bHRcIlxuXG5leHBvcnQgZGVmYXVsdCBIYXNoXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/hash.coffee
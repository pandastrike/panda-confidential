"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hash;

Hash = function ({ hash }) {
  return function () {
    var _rec = new _powerAssertRecorder(),
        _rec2 = new _powerAssertRecorder();

    var expectedOutput, message, output;
    message = "Hello World!";
    expectedOutput = "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA==";
    output = hash(message);
    return _powerAssert2.default.equal(_rec._expr(_rec._capt(output, "arguments/0"), {
      content: "assert.equal(output, expectedOutput, \"Unexpected hash result\")",
      filepath: "tests/extended/hash.coffee",
      line: 8
    }), _rec2._expr(_rec2._capt(expectedOutput, "arguments/1"), {
      content: "assert.equal(output, expectedOutput, \"Unexpected hash result\")",
      filepath: "tests/extended/hash.coffee",
      line: 8
    }), "Unexpected hash result");
  };
};

exports.default = Hash;
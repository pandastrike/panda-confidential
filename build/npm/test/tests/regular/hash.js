"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }();

var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _amen = require("amen");

var _index = require("../../../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hash;

Hash = function () {
  var _rec = new _powerAssertRecorder(),
      _rec2 = new _powerAssertRecorder();

  var expectedOutput, hash, message, output;
  ({ hash } = (0, _index.confidential)());
  message = "Hello World!";
  expectedOutput = "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA==";
  output = hash(message);
  return _powerAssert2.default.equal(_rec._expr(_rec._capt(output, "arguments/0"), {
    content: "assert.equal(output, expectedOutput, \"Unexpected hash result\")",
    filepath: "tests/regular/hash.coffee",
    line: 12
  }), _rec2._expr(_rec2._capt(expectedOutput, "arguments/1"), {
    content: "assert.equal(output, expectedOutput, \"Unexpected hash result\")",
    filepath: "tests/regular/hash.coffee",
    line: 12
  }), "Unexpected hash result");
};

exports.default = Hash;
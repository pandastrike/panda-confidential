"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _amen = require("amen");

var _index = require("../../../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashTest;

HashTest = function () {
  var Hash, Plaintext, hash, hashResult, message, plaintext;
  ({
    hash,
    Hash,
    Plaintext
  } = (0, _index.confidential)());
  message = "Hello World!";
  plaintext = Plaintext.from("utf8", message); // Perform SHA-512 hash.

  hashResult = hash(plaintext);
  (0, _assert.default)(Hash.isType(hashResult), "bad hash");
  return _assert.default.equal(hashResult.to("base64"), "hhhE1nBOhXP+w02WfiC8/vPUJM9IvgTm3AjyvVjHKXQzcQFerYkcw88cnTS0kmS1EHUbH/nlN5N7xGtdb/TsyA==", "bad hash result");
};

var _default = HashTest;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9oYXNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFGQSxJQUFBLFFBQUE7O0FBSUEsUUFBQSxHQUFXLFlBQUE7QUFDVCxNQUFBLElBQUEsRUFBQSxTQUFBLEVBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQSxPQUFBLEVBQUEsU0FBQTtBQUFBLEdBQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQTtBQUVBLEVBQUEsT0FBQSxHQUFVLGNBQVY7QUFDQSxFQUFBLFNBQUEsR0FBWSxTQUFTLENBQVQsSUFBQSxDQUFBLE1BQUEsRUFIWixPQUdZLENBQVosQ0FKUyxDOztBQU9ULEVBQUEsVUFBQSxHQUFhLElBQUEsQ0FBQSxTQUFBLENBQWI7QUFFQSx1QkFBUSxJQUFJLENBQUosTUFBQSxDQUFSLFVBQVEsQ0FBUixFQUFBLFVBQUE7U0FDQSxnQkFBQSxLQUFBLENBQ0UsVUFBVSxDQUFWLEVBQUEsQ0FERixRQUNFLENBREYsRUFBQSwwRkFBQSxFQUFBLGlCQUFBLEM7QUFWUyxDQUFYOztlQWdCZSxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcbmltcG9ydCB7dGVzdCwgcHJpbnR9IGZyb20gXCJhbWVuXCJcbmltcG9ydCB7Y29uZmlkZW50aWFsfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2luZGV4XCJcblxuSGFzaFRlc3QgPSAtPlxuICB7aGFzaCwgSGFzaCwgUGxhaW50ZXh0fSA9IGNvbmZpZGVudGlhbCgpXG5cbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcbiAgcGxhaW50ZXh0ID0gUGxhaW50ZXh0LmZyb20gXCJ1dGY4XCIsIG1lc3NhZ2VcblxuICAjIFBlcmZvcm0gU0hBLTUxMiBoYXNoLlxuICBoYXNoUmVzdWx0ID0gaGFzaCBwbGFpbnRleHRcblxuICBhc3NlcnQgKEhhc2guaXNUeXBlIGhhc2hSZXN1bHQpLCBcImJhZCBoYXNoXCJcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIGhhc2hSZXN1bHQudG8gXCJiYXNlNjRcIlxuICAgIFwiaGhoRTFuQk9oWFArdzAyV2ZpQzgvdlBVSk05SXZnVG0zQWp5dlZqSEtYUXpjUUZlcllrY3c4OGNuVFMwa21TMUVIVWJIL25sTjVON3hHdGRiL1RzeUE9PVwiXG4gICAgXCJiYWQgaGFzaCByZXN1bHRcIlxuICApXG5cbmV4cG9ydCBkZWZhdWx0IEhhc2hUZXN0XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/hash.coffee
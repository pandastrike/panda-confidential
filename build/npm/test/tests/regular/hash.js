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
  var Hash, Message, hash, hashResult, message, string;
  ({
    hash,
    Hash,
    Message
  } = (0, _index.confidential)());
  string = "Hello, World!";
  message = Message.from("utf8", string); // Perform SHA-512 hash.

  hashResult = hash(message);
  (0, _assert.default)(Hash.isType(hashResult), "bad hash");
  return _assert.default.equal(hashResult.to("base64"), "N015SpXNz9izWZMYX++bo2jxYNja9DLQi6nx7R5avmzGkpHg+i/gAGpSVw7xjBne9OYXwzzlLvCm5fvjGMsDhw==", "bad hash result");
};

var _default = HashTest;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9yZWd1bGFyL2hhc2guY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUZBLElBQUEsUUFBQTs7QUFJQSxRQUFBLEdBQVcsWUFBQTtBQUNULE1BQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBLE9BQUEsRUFBQSxNQUFBO0FBQUEsR0FBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUE7QUFBQSxNQUFBLDBCQUFBO0FBRUEsRUFBQSxNQUFBLEdBQVMsZUFBVDtBQUNBLEVBQUEsT0FBQSxHQUFVLE9BQU8sQ0FBUCxJQUFBLENBQUEsTUFBQSxFQUhWLE1BR1UsQ0FBVixDQUpTLEM7O0FBT1QsRUFBQSxVQUFBLEdBQWEsSUFBQSxDQUFBLE9BQUEsQ0FBYjtBQUVBLHVCQUFRLElBQUksQ0FBSixNQUFBLENBQVIsVUFBUSxDQUFSLEVBQUEsVUFBQTtTQUNBLGdCQUFBLEtBQUEsQ0FDRSxVQUFVLENBQVYsRUFBQSxDQURGLFFBQ0UsQ0FERixFQUFBLDBGQUFBLEVBQUEsaUJBQUEsQztBQVZTLENBQVg7O2VBZ0JlLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IHt0ZXN0LCBwcmludH0gZnJvbSBcImFtZW5cIlxuaW1wb3J0IHtjb25maWRlbnRpYWx9IGZyb20gXCIuLi8uLi8uLi9zcmMvaW5kZXhcIlxuXG5IYXNoVGVzdCA9IC0+XG4gIHtoYXNoLCBIYXNoLCBNZXNzYWdlfSA9IGNvbmZpZGVudGlhbCgpXG5cbiAgc3RyaW5nID0gXCJIZWxsbywgV29ybGQhXCJcbiAgbWVzc2FnZSA9IE1lc3NhZ2UuZnJvbSBcInV0ZjhcIiwgc3RyaW5nXG5cbiAgIyBQZXJmb3JtIFNIQS01MTIgaGFzaC5cbiAgaGFzaFJlc3VsdCA9IGhhc2ggbWVzc2FnZVxuXG4gIGFzc2VydCAoSGFzaC5pc1R5cGUgaGFzaFJlc3VsdCksIFwiYmFkIGhhc2hcIlxuICBhc3NlcnQuZXF1YWwoXG4gICAgaGFzaFJlc3VsdC50byBcImJhc2U2NFwiXG4gICAgXCJOMDE1U3BYTno5aXpXWk1ZWCsrYm8yanhZTmphOURMUWk2bng3UjVhdm16R2twSGcraS9nQUdwU1Z3N3hqQm5lOU9ZWHd6emxMdkNtNWZ2akdNc0Rodz09XCJcbiAgICBcImJhZCBoYXNoIHJlc3VsdFwiXG4gIClcblxuZXhwb3J0IGRlZmF1bHQgSGFzaFRlc3RcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/regular/hash.coffee
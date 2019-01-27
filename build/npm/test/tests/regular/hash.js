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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9oYXNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFGQSxJQUFBLFFBQUE7O0FBSUEsUUFBQSxHQUFXLFlBQUE7QUFDVCxNQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQTtBQUFBLEdBQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBLElBQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQTtBQUVBLEVBQUEsTUFBQSxHQUFTLGVBQVQ7QUFDQSxFQUFBLE9BQUEsR0FBVSxPQUFPLENBQVAsSUFBQSxDQUFBLE1BQUEsRUFIVixNQUdVLENBQVYsQ0FKUyxDOztBQU9ULEVBQUEsVUFBQSxHQUFhLElBQUEsQ0FBQSxPQUFBLENBQWI7QUFFQSx1QkFBUSxJQUFJLENBQUosTUFBQSxDQUFSLFVBQVEsQ0FBUixFQUFBLFVBQUE7U0FDQSxnQkFBQSxLQUFBLENBQ0UsVUFBVSxDQUFWLEVBQUEsQ0FERixRQUNFLENBREYsRUFBQSwwRkFBQSxFQUFBLGlCQUFBLEM7QUFWUyxDQUFYOztlQWdCZSxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tIFwiYXNzZXJ0XCJcbmltcG9ydCB7dGVzdCwgcHJpbnR9IGZyb20gXCJhbWVuXCJcbmltcG9ydCB7Y29uZmlkZW50aWFsfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2luZGV4XCJcblxuSGFzaFRlc3QgPSAtPlxuICB7aGFzaCwgSGFzaCwgTWVzc2FnZX0gPSBjb25maWRlbnRpYWwoKVxuXG4gIHN0cmluZyA9IFwiSGVsbG8sIFdvcmxkIVwiXG4gIG1lc3NhZ2UgPSBNZXNzYWdlLmZyb20gXCJ1dGY4XCIsIHN0cmluZ1xuXG4gICMgUGVyZm9ybSBTSEEtNTEyIGhhc2guXG4gIGhhc2hSZXN1bHQgPSBoYXNoIG1lc3NhZ2VcblxuICBhc3NlcnQgKEhhc2guaXNUeXBlIGhhc2hSZXN1bHQpLCBcImJhZCBoYXNoXCJcbiAgYXNzZXJ0LmVxdWFsKFxuICAgIGhhc2hSZXN1bHQudG8gXCJiYXNlNjRcIlxuICAgIFwiTjAxNVNwWE56OWl6V1pNWVgrK2JvMmp4WU5qYTlETFFpNm54N1I1YXZtekdrcEhnK2kvZ0FHcFNWdzd4akJuZTlPWVh3enpsTHZDbTVmdmpHTXNEaHc9PVwiXG4gICAgXCJiYWQgaGFzaCByZXN1bHRcIlxuICApXG5cbmV4cG9ydCBkZWZhdWx0IEhhc2hUZXN0XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/hash.coffee
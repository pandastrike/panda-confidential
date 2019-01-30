"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assert = _interopRequireDefault(require("assert"));

var _index = require("../../../src/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symmetric;

symmetric = async function () {
  var Envelope, Message, SymmetricKey, decrypt, encrypt, envelope, key, message, outMessage, serialized, string; // Setup for encryption

  ({
    encrypt,
    decrypt,
    SymmetricKey,
    Message,
    Envelope
  } = (0, _index.confidential)()); // Generate symmetric key of correct length that should be saved.

  key = await SymmetricKey.create();
  (0, _assert.default)(SymmetricKey.isType(key), "bad key"); // Person A symmetrically encrypts their message.

  string = "Hello World!";
  message = Message.from("utf8", string);
  (0, _assert.default)(Message.isType(message), "bad message");
  envelope = await encrypt(key, message);
  (0, _assert.default)(Envelope.isType(envelope), "bad envelope"); // Person A serializes their envelope for storage.

  serialized = envelope.to("base64"); // Person A later hydrates the envelope and decrypts.

  envelope = Envelope.from("base64", serialized);
  outMessage = decrypt(key, envelope);
  (0, _assert.default)(Message.isType(outMessage), "bad message");

  _assert.default.equal(outMessage.to("utf8"), string, "failed to decrypt");

  try {
    // negative test
    key = await SymmetricKey.create();
    decrypt(key, envelope);
    return _assert.default.fail("This decrypt should fail");
  } catch (error) {}
};

var _default = symmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9yZWd1bGFyL3N5bW1ldHJpYy1lbmNyeXB0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFEQSxJQUFBLFNBQUE7O0FBR0EsU0FBQSxHQUFZLGtCQUFBO0FBRVYsTUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxVQUFBLEVBQUEsTUFBQSxDQUZVLEM7O0FBRVYsR0FBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUEsWUFBQTtBQUFBLElBQUEsT0FBQTtBQUFBLElBQUE7QUFBQSxNQUFBLDBCQUFBLEVBRlUsQzs7QUFLVixFQUFBLEdBQUEsR0FBTSxNQUFNLFlBQVksQ0FBbEIsTUFBTSxFQUFaO0FBQ0EsdUJBQVEsWUFBWSxDQUFaLE1BQUEsQ0FBUixHQUFRLENBQVIsRUFKQSxTQUlBLEVBTlUsQzs7QUFTVixFQUFBLE1BQUEsR0FBUyxjQUFUO0FBQ0EsRUFBQSxPQUFBLEdBQVUsT0FBTyxDQUFQLElBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxDQUFWO0FBQ0EsdUJBQVEsT0FBTyxDQUFQLE1BQUEsQ0FBUixPQUFRLENBQVIsRUFBQSxhQUFBO0FBRUEsRUFBQSxRQUFBLEdBQVcsTUFBTSxPQUFBLENBQUEsR0FBQSxFQUFOLE9BQU0sQ0FBakI7QUFDQSx1QkFBUSxRQUFRLENBQVIsTUFBQSxDQUFSLFFBQVEsQ0FBUixFQVpBLGNBWUEsRUFkVSxDOztBQWlCVixFQUFBLFVBQUEsR0FBYSxRQUFRLENBQVIsRUFBQSxDQWZiLFFBZWEsQ0FBYixDQWpCVSxDOztBQW9CVixFQUFBLFFBQUEsR0FBVyxRQUFRLENBQVIsSUFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBLENBQVg7QUFDQSxFQUFBLFVBQUEsR0FBYSxPQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsQ0FBYjtBQUNBLHVCQUFRLE9BQU8sQ0FBUCxNQUFBLENBQVIsVUFBUSxDQUFSLEVBQUEsYUFBQTs7QUFFQSxrQkFBQSxLQUFBLENBQWMsVUFBVSxDQUFWLEVBQUEsQ0FBZCxNQUFjLENBQWQsRUFBQSxNQUFBLEVBQUEsbUJBQUE7O0FBR0EsTUFBQTs7QUFDRSxJQUFBLEdBQUEsR0FBTSxNQUFNLFlBQVksQ0FBbEIsTUFBTSxFQUFaO0FBQ0EsSUFBQSxPQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsQ0FBQTtXQUNBLGdCQUFBLElBQUEsQ0FIRiwwQkFHRSxDO0FBSEYsR0FBQSxDQUFBLE9BQUEsS0FBQSxFQUFBLEM7QUEzQlUsQ0FBWjs7ZUFpQ2UsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSBcImFzc2VydFwiXG5pbXBvcnQge2NvbmZpZGVudGlhbH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9pbmRleFwiXG5cbnN5bW1ldHJpYyA9IC0+XG4gICMgU2V0dXAgZm9yIGVuY3J5cHRpb25cbiAge2VuY3J5cHQsIGRlY3J5cHQsIFN5bW1ldHJpY0tleSwgTWVzc2FnZSwgRW52ZWxvcGV9ID0gY29uZmlkZW50aWFsKClcblxuICAjIEdlbmVyYXRlIHN5bW1ldHJpYyBrZXkgb2YgY29ycmVjdCBsZW5ndGggdGhhdCBzaG91bGQgYmUgc2F2ZWQuXG4gIGtleSA9IGF3YWl0IFN5bW1ldHJpY0tleS5jcmVhdGUoKVxuICBhc3NlcnQgKFN5bW1ldHJpY0tleS5pc1R5cGUga2V5KSwgXCJiYWQga2V5XCJcblxuICAjIFBlcnNvbiBBIHN5bW1ldHJpY2FsbHkgZW5jcnlwdHMgdGhlaXIgbWVzc2FnZS5cbiAgc3RyaW5nID0gXCJIZWxsbyBXb3JsZCFcIlxuICBtZXNzYWdlID0gTWVzc2FnZS5mcm9tIFwidXRmOFwiLCBzdHJpbmdcbiAgYXNzZXJ0IChNZXNzYWdlLmlzVHlwZSBtZXNzYWdlKSwgXCJiYWQgbWVzc2FnZVwiXG5cbiAgZW52ZWxvcGUgPSBhd2FpdCBlbmNyeXB0IGtleSwgbWVzc2FnZVxuICBhc3NlcnQgKEVudmVsb3BlLmlzVHlwZSBlbnZlbG9wZSksIFwiYmFkIGVudmVsb3BlXCJcblxuICAjIFBlcnNvbiBBIHNlcmlhbGl6ZXMgdGhlaXIgZW52ZWxvcGUgZm9yIHN0b3JhZ2UuXG4gIHNlcmlhbGl6ZWQgPSBlbnZlbG9wZS50byBcImJhc2U2NFwiXG5cbiAgIyBQZXJzb24gQSBsYXRlciBoeWRyYXRlcyB0aGUgZW52ZWxvcGUgYW5kIGRlY3J5cHRzLlxuICBlbnZlbG9wZSA9IEVudmVsb3BlLmZyb20gXCJiYXNlNjRcIiwgc2VyaWFsaXplZFxuICBvdXRNZXNzYWdlID0gZGVjcnlwdCBrZXksIGVudmVsb3BlXG4gIGFzc2VydCAoTWVzc2FnZS5pc1R5cGUgb3V0TWVzc2FnZSksIFwiYmFkIG1lc3NhZ2VcIlxuXG4gIGFzc2VydC5lcXVhbCAob3V0TWVzc2FnZS50byBcInV0ZjhcIiksIHN0cmluZywgXCJmYWlsZWQgdG8gZGVjcnlwdFwiXG5cbiAgIyBuZWdhdGl2ZSB0ZXN0XG4gIHRyeVxuICAgIGtleSA9IGF3YWl0IFN5bW1ldHJpY0tleS5jcmVhdGUoKVxuICAgIGRlY3J5cHQga2V5LCBlbnZlbG9wZVxuICAgIGFzc2VydC5mYWlsIFwiVGhpcyBkZWNyeXB0IHNob3VsZCBmYWlsXCJcbiAgY2F0Y2hcblxuZXhwb3J0IGRlZmF1bHQgc3ltbWV0cmljXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/regular/symmetric-encryption.coffee
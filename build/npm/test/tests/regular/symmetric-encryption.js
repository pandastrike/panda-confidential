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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9zeW1tZXRyaWMtZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBREEsSUFBQSxTQUFBOztBQUdBLFNBQUEsR0FBWSxrQkFBQTtBQUVWLE1BQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLE1BQUEsQ0FGVSxDOztBQUVWLEdBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLFlBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQSxFQUZVLEM7O0FBS1YsRUFBQSxHQUFBLEdBQU0sTUFBTSxZQUFZLENBQWxCLE1BQU0sRUFBWjtBQUNBLHVCQUFRLFlBQVksQ0FBWixNQUFBLENBQVIsR0FBUSxDQUFSLEVBSkEsU0FJQSxFQU5VLEM7O0FBU1YsRUFBQSxNQUFBLEdBQVMsY0FBVDtBQUNBLEVBQUEsT0FBQSxHQUFVLE9BQU8sQ0FBUCxJQUFBLENBQUEsTUFBQSxFQUFBLE1BQUEsQ0FBVjtBQUNBLHVCQUFRLE9BQU8sQ0FBUCxNQUFBLENBQVIsT0FBUSxDQUFSLEVBQUEsYUFBQTtBQUVBLEVBQUEsUUFBQSxHQUFXLE1BQU0sT0FBQSxDQUFBLEdBQUEsRUFBTixPQUFNLENBQWpCO0FBQ0EsdUJBQVEsUUFBUSxDQUFSLE1BQUEsQ0FBUixRQUFRLENBQVIsRUFaQSxjQVlBLEVBZFUsQzs7QUFpQlYsRUFBQSxVQUFBLEdBQWEsUUFBUSxDQUFSLEVBQUEsQ0FmYixRQWVhLENBQWIsQ0FqQlUsQzs7QUFvQlYsRUFBQSxRQUFBLEdBQVcsUUFBUSxDQUFSLElBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxDQUFYO0FBQ0EsRUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFBLEdBQUEsRUFBQSxRQUFBLENBQWI7QUFDQSx1QkFBUSxPQUFPLENBQVAsTUFBQSxDQUFSLFVBQVEsQ0FBUixFQUFBLGFBQUE7O0FBRUEsa0JBQUEsS0FBQSxDQUFjLFVBQVUsQ0FBVixFQUFBLENBQWQsTUFBYyxDQUFkLEVBQUEsTUFBQSxFQUFBLG1CQUFBOztBQUdBLE1BQUE7O0FBQ0UsSUFBQSxHQUFBLEdBQU0sTUFBTSxZQUFZLENBQWxCLE1BQU0sRUFBWjtBQUNBLElBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxRQUFBLENBQUE7V0FDQSxnQkFBQSxJQUFBLENBSEYsMEJBR0UsQztBQUhGLEdBQUEsQ0FBQSxPQUFBLEtBQUEsRUFBQSxDO0FBM0JVLENBQVo7O2VBaUNlLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IHtjb25maWRlbnRpYWx9IGZyb20gXCIuLi8uLi8uLi9zcmMvaW5kZXhcIlxuXG5zeW1tZXRyaWMgPSAtPlxuICAjIFNldHVwIGZvciBlbmNyeXB0aW9uXG4gIHtlbmNyeXB0LCBkZWNyeXB0LCBTeW1tZXRyaWNLZXksIE1lc3NhZ2UsIEVudmVsb3BlfSA9IGNvbmZpZGVudGlhbCgpXG5cbiAgIyBHZW5lcmF0ZSBzeW1tZXRyaWMga2V5IG9mIGNvcnJlY3QgbGVuZ3RoIHRoYXQgc2hvdWxkIGJlIHNhdmVkLlxuICBrZXkgPSBhd2FpdCBTeW1tZXRyaWNLZXkuY3JlYXRlKClcbiAgYXNzZXJ0IChTeW1tZXRyaWNLZXkuaXNUeXBlIGtleSksIFwiYmFkIGtleVwiXG5cbiAgIyBQZXJzb24gQSBzeW1tZXRyaWNhbGx5IGVuY3J5cHRzIHRoZWlyIG1lc3NhZ2UuXG4gIHN0cmluZyA9IFwiSGVsbG8gV29ybGQhXCJcbiAgbWVzc2FnZSA9IE1lc3NhZ2UuZnJvbSBcInV0ZjhcIiwgc3RyaW5nXG4gIGFzc2VydCAoTWVzc2FnZS5pc1R5cGUgbWVzc2FnZSksIFwiYmFkIG1lc3NhZ2VcIlxuXG4gIGVudmVsb3BlID0gYXdhaXQgZW5jcnlwdCBrZXksIG1lc3NhZ2VcbiAgYXNzZXJ0IChFbnZlbG9wZS5pc1R5cGUgZW52ZWxvcGUpLCBcImJhZCBlbnZlbG9wZVwiXG5cbiAgIyBQZXJzb24gQSBzZXJpYWxpemVzIHRoZWlyIGVudmVsb3BlIGZvciBzdG9yYWdlLlxuICBzZXJpYWxpemVkID0gZW52ZWxvcGUudG8gXCJiYXNlNjRcIlxuXG4gICMgUGVyc29uIEEgbGF0ZXIgaHlkcmF0ZXMgdGhlIGVudmVsb3BlIGFuZCBkZWNyeXB0cy5cbiAgZW52ZWxvcGUgPSBFbnZlbG9wZS5mcm9tIFwiYmFzZTY0XCIsIHNlcmlhbGl6ZWRcbiAgb3V0TWVzc2FnZSA9IGRlY3J5cHQga2V5LCBlbnZlbG9wZVxuICBhc3NlcnQgKE1lc3NhZ2UuaXNUeXBlIG91dE1lc3NhZ2UpLCBcImJhZCBtZXNzYWdlXCJcblxuICBhc3NlcnQuZXF1YWwgKG91dE1lc3NhZ2UudG8gXCJ1dGY4XCIpLCBzdHJpbmcsIFwiZmFpbGVkIHRvIGRlY3J5cHRcIlxuXG4gICMgbmVnYXRpdmUgdGVzdFxuICB0cnlcbiAgICBrZXkgPSBhd2FpdCBTeW1tZXRyaWNLZXkuY3JlYXRlKClcbiAgICBkZWNyeXB0IGtleSwgZW52ZWxvcGVcbiAgICBhc3NlcnQuZmFpbCBcIlRoaXMgZGVjcnlwdCBzaG91bGQgZmFpbFwiXG4gIGNhdGNoXG5cbmV4cG9ydCBkZWZhdWx0IHN5bW1ldHJpY1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/symmetric-encryption.coffee
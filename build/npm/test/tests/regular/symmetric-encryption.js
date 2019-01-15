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
  var Envelope, Plaintext, SymmetricKey, decrypt, encrypt, envelope, key, message, outPlaintext, plaintext, serialized; // Setup for encryption

  ({
    encrypt,
    decrypt,
    SymmetricKey,
    Plaintext,
    Envelope
  } = (0, _index.confidential)()); // Generate symmetric key of correct length that should be saved.

  key = await SymmetricKey.create();
  (0, _assert.default)(SymmetricKey.isType(key), "bad key"); // Person A symmetrically encrypts their data.

  message = "Hello World!";
  plaintext = Plaintext.from("utf8", message);
  (0, _assert.default)(Plaintext.isType(plaintext), "bad plaintext");
  envelope = await encrypt(key, plaintext);
  (0, _assert.default)(Envelope.isType(envelope), "bad envelope"); // Person A serializes their envelope for storage.

  serialized = envelope.to("base64"); // Person A later hydrates the envelope and decrypts.

  envelope = Envelope.from("base64", serialized);
  outPlaintext = decrypt(key, envelope);
  (0, _assert.default)(Plaintext.isType(outPlaintext), "bad plaintext");

  _assert.default.equal(outPlaintext.to("utf8"), message, "failed to decrypt");

  try {
    // negative test
    key = await SymmetricKey.create();
    decrypt(key, envelope);
    return _assert.default.fail("This decrypt should fail");
  } catch (error) {}
};

var _default = symmetric;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9zeW1tZXRyaWMtZW5jcnlwdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBREEsSUFBQSxTQUFBOztBQUdBLFNBQUEsR0FBWSxrQkFBQTtBQUVWLE1BQUEsUUFBQSxFQUFBLFNBQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxZQUFBLEVBQUEsU0FBQSxFQUFBLFVBQUEsQ0FGVSxDOztBQUVWLEdBQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUE7QUFBQSxJQUFBLFlBQUE7QUFBQSxJQUFBLFNBQUE7QUFBQSxJQUFBO0FBQUEsTUFBQSwwQkFBQSxFQUZVLEM7O0FBS1YsRUFBQSxHQUFBLEdBQU0sTUFBTSxZQUFZLENBQWxCLE1BQU0sRUFBWjtBQUNBLHVCQUFRLFlBQVksQ0FBWixNQUFBLENBQVIsR0FBUSxDQUFSLEVBSkEsU0FJQSxFQU5VLEM7O0FBU1YsRUFBQSxPQUFBLEdBQVUsY0FBVjtBQUNBLEVBQUEsU0FBQSxHQUFZLFNBQVMsQ0FBVCxJQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBWjtBQUNBLHVCQUFRLFNBQVMsQ0FBVCxNQUFBLENBQVIsU0FBUSxDQUFSLEVBQUEsZUFBQTtBQUVBLEVBQUEsUUFBQSxHQUFXLE1BQU0sT0FBQSxDQUFBLEdBQUEsRUFBTixTQUFNLENBQWpCO0FBQ0EsdUJBQVEsUUFBUSxDQUFSLE1BQUEsQ0FBUixRQUFRLENBQVIsRUFaQSxjQVlBLEVBZFUsQzs7QUFpQlYsRUFBQSxVQUFBLEdBQWEsUUFBUSxDQUFSLEVBQUEsQ0FmYixRQWVhLENBQWIsQ0FqQlUsQzs7QUFvQlYsRUFBQSxRQUFBLEdBQVcsUUFBUSxDQUFSLElBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxDQUFYO0FBQ0EsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFBLEdBQUEsRUFBQSxRQUFBLENBQWY7QUFDQSx1QkFBUSxTQUFTLENBQVQsTUFBQSxDQUFSLFlBQVEsQ0FBUixFQUFBLGVBQUE7O0FBRUEsa0JBQUEsS0FBQSxDQUFjLFlBQVksQ0FBWixFQUFBLENBQWQsTUFBYyxDQUFkLEVBQUEsT0FBQSxFQUFBLG1CQUFBOztBQUdBLE1BQUE7O0FBQ0UsSUFBQSxHQUFBLEdBQU0sTUFBTSxZQUFZLENBQWxCLE1BQU0sRUFBWjtBQUNBLElBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxRQUFBLENBQUE7V0FDQSxnQkFBQSxJQUFBLENBSEYsMEJBR0UsQztBQUhGLEdBQUEsQ0FBQSxPQUFBLEtBQUEsRUFBQSxDO0FBM0JVLENBQVo7O2VBaUNlLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gXCJhc3NlcnRcIlxuaW1wb3J0IHtjb25maWRlbnRpYWx9IGZyb20gXCIuLi8uLi8uLi9zcmMvaW5kZXhcIlxuXG5zeW1tZXRyaWMgPSAtPlxuICAjIFNldHVwIGZvciBlbmNyeXB0aW9uXG4gIHtlbmNyeXB0LCBkZWNyeXB0LCBTeW1tZXRyaWNLZXksIFBsYWludGV4dCwgRW52ZWxvcGV9ID0gY29uZmlkZW50aWFsKClcblxuICAjIEdlbmVyYXRlIHN5bW1ldHJpYyBrZXkgb2YgY29ycmVjdCBsZW5ndGggdGhhdCBzaG91bGQgYmUgc2F2ZWQuXG4gIGtleSA9IGF3YWl0IFN5bW1ldHJpY0tleS5jcmVhdGUoKVxuICBhc3NlcnQgKFN5bW1ldHJpY0tleS5pc1R5cGUga2V5KSwgXCJiYWQga2V5XCJcblxuICAjIFBlcnNvbiBBIHN5bW1ldHJpY2FsbHkgZW5jcnlwdHMgdGhlaXIgZGF0YS5cbiAgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCJcbiAgcGxhaW50ZXh0ID0gUGxhaW50ZXh0LmZyb20gXCJ1dGY4XCIsIG1lc3NhZ2VcbiAgYXNzZXJ0IChQbGFpbnRleHQuaXNUeXBlIHBsYWludGV4dCksIFwiYmFkIHBsYWludGV4dFwiXG5cbiAgZW52ZWxvcGUgPSBhd2FpdCBlbmNyeXB0IGtleSwgcGxhaW50ZXh0XG4gIGFzc2VydCAoRW52ZWxvcGUuaXNUeXBlIGVudmVsb3BlKSwgXCJiYWQgZW52ZWxvcGVcIlxuXG4gICMgUGVyc29uIEEgc2VyaWFsaXplcyB0aGVpciBlbnZlbG9wZSBmb3Igc3RvcmFnZS5cbiAgc2VyaWFsaXplZCA9IGVudmVsb3BlLnRvIFwiYmFzZTY0XCJcblxuICAjIFBlcnNvbiBBIGxhdGVyIGh5ZHJhdGVzIHRoZSBlbnZlbG9wZSBhbmQgZGVjcnlwdHMuXG4gIGVudmVsb3BlID0gRW52ZWxvcGUuZnJvbSBcImJhc2U2NFwiLCBzZXJpYWxpemVkXG4gIG91dFBsYWludGV4dCA9IGRlY3J5cHQga2V5LCBlbnZlbG9wZVxuICBhc3NlcnQgKFBsYWludGV4dC5pc1R5cGUgb3V0UGxhaW50ZXh0KSwgXCJiYWQgcGxhaW50ZXh0XCJcblxuICBhc3NlcnQuZXF1YWwgKG91dFBsYWludGV4dC50byBcInV0ZjhcIiksIG1lc3NhZ2UsIFwiZmFpbGVkIHRvIGRlY3J5cHRcIlxuXG4gICMgbmVnYXRpdmUgdGVzdFxuICB0cnlcbiAgICBrZXkgPSBhd2FpdCBTeW1tZXRyaWNLZXkuY3JlYXRlKClcbiAgICBkZWNyeXB0IGtleSwgZW52ZWxvcGVcbiAgICBhc3NlcnQuZmFpbCBcIlRoaXMgZGVjcnlwdCBzaG91bGQgZmFpbFwiXG4gIGNhdGNoXG5cbmV4cG9ydCBkZWZhdWx0IHN5bW1ldHJpY1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/symmetric-encryption.coffee
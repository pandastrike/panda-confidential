"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pandaParchment = require("panda-parchment");

var _key = _interopRequireDefault(require("./key"));

var _public = _interopRequireDefault(require("./public"));

var _private = _interopRequireDefault(require("./private"));

var _shared = _interopRequireDefault(require("./shared"));

var _symmetric = _interopRequireDefault(require("./symmetric"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys;

keys = function (confidential) {
  var SharedKey, SymmetricKey;
  SharedKey = (0, _shared.default)(confidential);
  SymmetricKey = (0, _symmetric.default)(confidential);
  return (0, _pandaParchment.include)(confidential, {
    Key: _key.default,
    PublicKey: _public.default,
    PrivateKey: _private.default,
    SharedKey,
    SymmetricKey
  });
};

var _default = keys;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXlzL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFMQSxJQUFBLElBQUE7O0FBT0EsSUFBQSxHQUFPLFVBQUEsWUFBQSxFQUFBO0FBQ0wsTUFBQSxTQUFBLEVBQUEsWUFBQTtBQUFBLEVBQUEsU0FBQSxHQUFZLHFCQUFBLFlBQUEsQ0FBWjtBQUNBLEVBQUEsWUFBQSxHQUFlLHdCQUFBLFlBQUEsQ0FBZjtTQUNBLDZCQUFBLFlBQUEsRUFBc0I7QUFBQyxJQUFBLEdBQUQsRUFBQyxZQUFEO0FBQU0sSUFBQSxTQUFOLEVBQU0sZUFBTjtBQUFpQixJQUFBLFVBQWpCLEVBQWlCLGdCQUFqQjtBQUFBLElBQUEsU0FBQTtBQUF0QixJQUFBO0FBQXNCLEdBQXRCLEM7QUFISyxDQUFQOztlQUtlLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luY2x1ZGV9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IEtleSBmcm9tIFwiLi9rZXlcIlxuaW1wb3J0IFB1YmxpY0tleSBmcm9tIFwiLi9wdWJsaWNcIlxuaW1wb3J0IFByaXZhdGVLZXkgZnJvbSBcIi4vcHJpdmF0ZVwiXG5pbXBvcnQgc2hhcmVkS2V5IGZyb20gXCIuL3NoYXJlZFwiXG5pbXBvcnQgc3ltbWV0cmljS2V5IGZyb20gXCIuL3N5bW1ldHJpY1wiXG5cbmtleXMgPSAoY29uZmlkZW50aWFsKSAtPlxuICBTaGFyZWRLZXkgPSBzaGFyZWRLZXkgY29uZmlkZW50aWFsXG4gIFN5bW1ldHJpY0tleSA9IHN5bW1ldHJpY0tleSBjb25maWRlbnRpYWxcbiAgaW5jbHVkZSBjb25maWRlbnRpYWwsIHtLZXksIFB1YmxpY0tleSwgUHJpdmF0ZUtleSwgU2hhcmVkS2V5LCBTeW1tZXRyaWNLZXl9XG5cbmV4cG9ydCBkZWZhdWx0IGtleXNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/Repositories/panda-confidential/src/keys/index.coffee
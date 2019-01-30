"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confidential = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _utils = require("./utils");

var _keys = _interopRequireDefault(require("./keys"));

var _keyPairs = _interopRequireDefault(require("./key-pairs"));

var _containers = _interopRequireDefault(require("./containers"));

var _functions = _interopRequireDefault(require("./functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confidential;
exports.confidential = confidential;

exports.confidential = confidential = function (randomBytes) {
  var Confidential;
  Confidential = {
    nacl: _tweetnacl.default,
    isBytes: _utils.isBytes,
    convert: _utils.convert,
    randomBytes: function (length) {
      return Promise.resolve((randomBytes != null ? randomBytes : _tweetnacl.default.randomBytes)(length));
    }
  };
  (0, _keyPairs.default)(Confidential);
  (0, _keys.default)(Confidential);
  (0, _containers.default)(Confidential);
  (0, _functions.default)(Confidential);
  return Confidential;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFMQSxJQUFBLFlBQUE7OztBQU9BLHVCQUFBLFlBQUEsR0FBZSxVQUFBLFdBQUEsRUFBQTtBQUNiLE1BQUEsWUFBQTtBQUFBLEVBQUEsWUFBQSxHQUNFO0FBQUEsSUFBQSxJQUFBLEVBQUEsa0JBQUE7QUFDQSxJQUFBLE9BQUEsRUFEQSxjQUFBO0FBRUEsSUFBQSxPQUFBLEVBRkEsY0FBQTtBQUdBLElBQUEsV0FBQSxFQUFhLFVBQUEsTUFBQSxFQUFBO2FBQ1gsT0FBTyxDQUFQLE9BQUEsQ0FBZ0IsQ0FBQSxXQUFBLElBQUEsSUFBQSxHQUFDLFdBQUQsR0FBZSxtQkFBZixXQUFBLEVBQWhCLE1BQWdCLENBQWhCLEM7QUFEVztBQUhiLEdBREY7QUFPQSx5QkFBQSxZQUFBO0FBQ0EscUJBQUEsWUFBQTtBQUNBLDJCQUFBLFlBQUE7QUFDQSwwQkFBQSxZQUFBO1NBRUEsWTtBQWJhLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFjbCBmcm9tIFwidHdlZXRuYWNsXCJcbmltcG9ydCB7Y29udmVydCwgaXNCeXRlc30gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IGtleXMgZnJvbSBcIi4va2V5c1wiXG5pbXBvcnQga2V5UGFpcnMgZnJvbSBcIi4va2V5LXBhaXJzXCJcbmltcG9ydCBjb250YWluZXJzIGZyb20gXCIuL2NvbnRhaW5lcnNcIlxuaW1wb3J0IGZ1bmN0aW9ucyBmcm9tIFwiLi9mdW5jdGlvbnNcIlxuXG5jb25maWRlbnRpYWwgPSAocmFuZG9tQnl0ZXMpIC0+XG4gIENvbmZpZGVudGlhbCA9XG4gICAgbmFjbDogbmFjbFxuICAgIGlzQnl0ZXM6IGlzQnl0ZXNcbiAgICBjb252ZXJ0OiBjb252ZXJ0XG4gICAgcmFuZG9tQnl0ZXM6IChsZW5ndGgpIC0+XG4gICAgICBQcm9taXNlLnJlc29sdmUgKHJhbmRvbUJ5dGVzID8gbmFjbC5yYW5kb21CeXRlcykgbGVuZ3RoXG5cbiAga2V5UGFpcnMgQ29uZmlkZW50aWFsXG4gIGtleXMgQ29uZmlkZW50aWFsXG4gIGNvbnRhaW5lcnMgQ29uZmlkZW50aWFsXG4gIGZ1bmN0aW9ucyBDb25maWRlbnRpYWxcblxuICBDb25maWRlbnRpYWxcblxuZXhwb3J0IHtjb25maWRlbnRpYWx9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/repos/panda-confidential/src/index.coffee
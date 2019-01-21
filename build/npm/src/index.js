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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBTEEsSUFBQSxZQUFBOzs7QUFPQSx1QkFBQSxZQUFBLEdBQWUsVUFBQSxXQUFBLEVBQUE7QUFDYixNQUFBLFlBQUE7QUFBQSxFQUFBLFlBQUEsR0FDRTtBQUFBLElBQUEsSUFBQSxFQUFBLGtCQUFBO0FBQ0EsSUFBQSxPQUFBLEVBREEsY0FBQTtBQUVBLElBQUEsT0FBQSxFQUZBLGNBQUE7QUFHQSxJQUFBLFdBQUEsRUFBYSxVQUFBLE1BQUEsRUFBQTthQUNYLE9BQU8sQ0FBUCxPQUFBLENBQWdCLENBQUEsV0FBQSxJQUFBLElBQUEsR0FBQyxXQUFELEdBQWUsbUJBQWYsV0FBQSxFQUFoQixNQUFnQixDQUFoQixDO0FBRFc7QUFIYixHQURGO0FBT0EseUJBQUEsWUFBQTtBQUNBLHFCQUFBLFlBQUE7QUFDQSwyQkFBQSxZQUFBO0FBQ0EsMEJBQUEsWUFBQTtTQUVBLFk7QUFiYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2NvbnZlcnQsIGlzQnl0ZXN9IGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCBrZXlzIGZyb20gXCIuL2tleXNcIlxuaW1wb3J0IGtleVBhaXJzIGZyb20gXCIuL2tleS1wYWlyc1wiXG5pbXBvcnQgY29udGFpbmVycyBmcm9tIFwiLi9jb250YWluZXJzXCJcbmltcG9ydCBmdW5jdGlvbnMgZnJvbSBcIi4vZnVuY3Rpb25zXCJcblxuY29uZmlkZW50aWFsID0gKHJhbmRvbUJ5dGVzKSAtPlxuICBDb25maWRlbnRpYWwgPVxuICAgIG5hY2w6IG5hY2xcbiAgICBpc0J5dGVzOiBpc0J5dGVzXG4gICAgY29udmVydDogY29udmVydFxuICAgIHJhbmRvbUJ5dGVzOiAobGVuZ3RoKSAtPlxuICAgICAgUHJvbWlzZS5yZXNvbHZlIChyYW5kb21CeXRlcyA/IG5hY2wucmFuZG9tQnl0ZXMpIGxlbmd0aFxuXG4gIGtleVBhaXJzIENvbmZpZGVudGlhbFxuICBrZXlzIENvbmZpZGVudGlhbFxuICBjb250YWluZXJzIENvbmZpZGVudGlhbFxuICBmdW5jdGlvbnMgQ29uZmlkZW50aWFsXG5cbiAgQ29uZmlkZW50aWFsXG5cbmV4cG9ydCB7Y29uZmlkZW50aWFsfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/index.coffee
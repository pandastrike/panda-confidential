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
    randomBytes: randomBytes != null ? randomBytes : _tweetnacl.default.randomBytes
  };
  (0, _keyPairs.default)(Confidential);
  (0, _keys.default)(Confidential);
  (0, _containers.default)(Confidential);
  (0, _functions.default)(Confidential);
  return Confidential;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBTEEsSUFBQSxZQUFBOzs7QUFPQSx1QkFBQSxZQUFBLEdBQWUsVUFBQSxXQUFBLEVBQUE7QUFDYixNQUFBLFlBQUE7QUFBQSxFQUFBLFlBQUEsR0FDRTtBQUFBLElBQUEsSUFBQSxFQUFBLGtCQUFBO0FBQ0EsSUFBQSxPQUFBLEVBREEsY0FBQTtBQUVBLElBQUEsT0FBQSxFQUZBLGNBQUE7QUFHQSxJQUFBLFdBQUEsRUFBQSxXQUFBLElBQUEsSUFBQSxHQUFhLFdBQWIsR0FBMkIsbUJBQUs7QUFIaEMsR0FERjtBQU1BLHlCQUFBLFlBQUE7QUFDQSxxQkFBQSxZQUFBO0FBQ0EsMkJBQUEsWUFBQTtBQUNBLDBCQUFBLFlBQUE7U0FFQSxZO0FBWmEsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuYWNsIGZyb20gXCJ0d2VldG5hY2xcIlxuaW1wb3J0IHtjb252ZXJ0LCBpc0J5dGVzfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQga2V5cyBmcm9tIFwiLi9rZXlzXCJcbmltcG9ydCBrZXlQYWlycyBmcm9tIFwiLi9rZXktcGFpcnNcIlxuaW1wb3J0IGNvbnRhaW5lcnMgZnJvbSBcIi4vY29udGFpbmVyc1wiXG5pbXBvcnQgZnVuY3Rpb25zIGZyb20gXCIuL2Z1bmN0aW9uc1wiXG5cbmNvbmZpZGVudGlhbCA9IChyYW5kb21CeXRlcykgLT5cbiAgQ29uZmlkZW50aWFsID1cbiAgICBuYWNsOiBuYWNsXG4gICAgaXNCeXRlczogaXNCeXRlc1xuICAgIGNvbnZlcnQ6IGNvbnZlcnRcbiAgICByYW5kb21CeXRlczogcmFuZG9tQnl0ZXMgPyBuYWNsLnJhbmRvbUJ5dGVzXG5cbiAga2V5UGFpcnMgQ29uZmlkZW50aWFsXG4gIGtleXMgQ29uZmlkZW50aWFsXG4gIGNvbnRhaW5lcnMgQ29uZmlkZW50aWFsXG4gIGZ1bmN0aW9ucyBDb25maWRlbnRpYWxcblxuICBDb25maWRlbnRpYWxcblxuZXhwb3J0IHtjb25maWRlbnRpYWx9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/src/index.coffee
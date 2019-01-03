"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regular = _interopRequireDefault(require("./regular"));

var _extended = _interopRequireDefault(require("./extended"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tests;

Tests = async function (SDK) {
  await (0, _regular.default)();

  if (SDK) {
    return await (0, _extended.default)(SDK);
  }
};

var _default = Tests;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFEQSxJQUFBLEtBQUE7O0FBR0EsS0FBQSxHQUFRLGdCQUFBLEdBQUEsRUFBQTtBQUNOLFFBQU0sdUJBQU47O0FBQ0EsTUFBQSxHQUFBLEVBQUE7QUFDRSxXQUFBLE1BQU0sdUJBRFIsR0FDUSxDQUFOOztBQUhJLENBQVI7O2VBS2UsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWd1bGFyIGZyb20gXCIuL3JlZ3VsYXJcIlxuaW1wb3J0IGV4dGVuZGVkIGZyb20gXCIuL2V4dGVuZGVkXCJcblxuVGVzdHMgPSAoU0RLKSAtPlxuICBhd2FpdCByZWd1bGFyKClcbiAgaWYgU0RLXG4gICAgYXdhaXQgZXh0ZW5kZWQgU0RLXG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RzXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=tests/index.coffee
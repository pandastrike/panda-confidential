"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKey = exports.Key = void 0;

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _utils = require("../utils");

var Key, isKey;
exports.isKey = isKey;
exports.Key = Key;
exports.Key = Key = class Key {
  constructor(key) {
    this.key = key;
  }

  encode(encoding = "base64") {
    return (0, _utils.encode)(encoding, this.key);
  }

};
exports.isKey = isKey = (0, _pandaParchment.isKind)(Key);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMva2V5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRkEsSUFBQSxHQUFBLEVBQUEsS0FBQTs7O0FBSU0sY0FBQSxHQUFBLEdBQU4sTUFBQSxHQUFBLENBQUE7QUFDRSxFQUFBLFdBQWEsQ0FBQSxHQUFBLEVBQUE7QUFBQyxTQUFDLEdBQUQsR0FBQyxHQUFEO0FBQUQ7O0FBQ2IsRUFBQSxNQUFRLENBQUMsUUFBQSxHQUFELFFBQUEsRUFBQTtXQUFzQixtQkFBQSxRQUFBLEVBQWlCLEtBQWpCLEdBQUEsQztBQUF0Qjs7QUFGVixDQUFNO0FBSU4sZ0JBQUEsS0FBQSxHQUFRLDRCQUFBLEdBQUEsQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNLaW5kfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuaW1wb3J0IHtlbmNvZGV9IGZyb20gXCIuLi91dGlsc1wiXG5cbmNsYXNzIEtleVxuICBjb25zdHJ1Y3RvcjogKEBrZXkpIC0+XG4gIGVuY29kZTogKGVuY29kaW5nPVwiYmFzZTY0XCIpLT4gZW5jb2RlIGVuY29kaW5nLCBAa2V5XG5cbmlzS2V5ID0gaXNLaW5kIEtleVxuXG5leHBvcnQge0tleSwgaXNLZXl9XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=keys/key.coffee
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pandaParchment = require("panda-parchment");

var _utils = require("../utils");

var Key;

Key = function () {
  class Key {
    constructor(key) {
      this.key = key;
    }

    to(hint) {
      if (hint === "bytes") {
        return this.key;
      } else {
        return (0, _utils.convert)({
          from: "bytes",
          to: hint
        }, this.key);
      }
    }

  }

  ;
  Key.isKind = (0, _pandaParchment.isKind)(Key);
  Key.areType = (0, _utils.areType)(Key.isType);
  return Key;
}.call(void 0);

var _default = Key;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleXMva2V5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBREEsSUFBQSxHQUFBOztBQUdNLEdBQUEsR0FBQSxZQUFBO0FBQU4sUUFBQSxHQUFBLENBQUE7QUFDRSxJQUFBLFdBQWEsQ0FBQSxHQUFBLEVBQUE7QUFBQyxXQUFDLEdBQUQsR0FBQyxHQUFEO0FBQUQ7O0FBRWIsSUFBQSxFQUFJLENBQUEsSUFBQSxFQUFBO0FBQ0YsVUFBRyxJQUFBLEtBQUgsT0FBQSxFQUFBO2VBQ0UsS0FERixHO0FBQUEsT0FBQSxNQUFBO2VBR0Usb0JBQVE7QUFBQSxVQUFBLElBQUEsRUFBQSxPQUFBO0FBQWUsVUFBQSxFQUFBLEVBQUk7QUFBbkIsU0FBUixFQUFpQyxLQUhuQyxHQUdFLEM7O0FBSkE7O0FBSE47O0FBQUE7QUFTRSxFQUFBLEdBQUMsQ0FBRCxNQUFBLEdBQVMsNEJBQUEsR0FBQSxDQUFUO0FBQ0EsRUFBQSxHQUFDLENBQUQsT0FBQSxHQUFVLG9CQUFRLEdBQUMsQ0FBVCxNQUFBLENBQVY7O0NBVkksQyxJQUFBLFFBQUE7O2VBWVMsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNLaW5kfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7Y29udmVydCwgYXJlVHlwZX0gZnJvbSBcIi4uL3V0aWxzXCJcblxuY2xhc3MgS2V5XG4gIGNvbnN0cnVjdG9yOiAoQGtleSkgLT5cblxuICB0bzogKGhpbnQpIC0+XG4gICAgaWYgaGludCA9PSBcImJ5dGVzXCJcbiAgICAgIEBrZXlcbiAgICBlbHNlXG4gICAgICBjb252ZXJ0IGZyb206IFwiYnl0ZXNcIiwgdG86IGhpbnQsIEBrZXlcblxuICBAaXNLaW5kOiBpc0tpbmQgQFxuICBAYXJlVHlwZTogYXJlVHlwZSBAaXNUeXBlXG5cbmV4cG9ydCBkZWZhdWx0IEtleVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/repos/panda-confidential/src/keys/key.coffee
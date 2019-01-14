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
  return Key;
}.call(void 0);

var _default = Key;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXlzL2tleS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQURBLElBQUEsR0FBQTs7QUFHTSxHQUFBLEdBQUEsWUFBQTtBQUFOLFFBQUEsR0FBQSxDQUFBO0FBQ0UsSUFBQSxXQUFhLENBQUEsR0FBQSxFQUFBO0FBQUMsV0FBQyxHQUFELEdBQUMsR0FBRDtBQUFEOztBQUViLElBQUEsRUFBSSxDQUFBLElBQUEsRUFBQTtBQUNGLFVBQUcsSUFBQSxLQUFILE9BQUEsRUFBQTtlQUNFLEtBREYsRztBQUFBLE9BQUEsTUFBQTtlQUdFLG9CQUFRO0FBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQTtBQUFlLFVBQUEsRUFBQSxFQUFJO0FBQW5CLFNBQVIsRUFBaUMsS0FIbkMsR0FHRSxDOztBQUpBOztBQUhOOztBQUFBO0FBU0UsRUFBQSxHQUFDLENBQUQsTUFBQSxHQUFTLDRCQUFBLEdBQUEsQ0FBVDs7Q0FUSSxDLElBQUEsUUFBQTs7ZUFXUyxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0tpbmR9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtjb252ZXJ0fSBmcm9tIFwiLi4vdXRpbHNcIlxuXG5jbGFzcyBLZXlcbiAgY29uc3RydWN0b3I6IChAa2V5KSAtPlxuXG4gIHRvOiAoaGludCkgLT5cbiAgICBpZiBoaW50ID09IFwiYnl0ZXNcIlxuICAgICAgQGtleVxuICAgIGVsc2VcbiAgICAgIGNvbnZlcnQgZnJvbTogXCJieXRlc1wiLCB0bzogaGludCwgQGtleVxuXG4gIEBpc0tpbmQ6IGlzS2luZCBAXG5cbmV4cG9ydCBkZWZhdWx0IEtleVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/keys/key.coffee
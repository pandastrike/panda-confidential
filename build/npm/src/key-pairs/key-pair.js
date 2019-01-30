"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pandaParchment = require("panda-parchment");

var _utils = require("../utils");

var _public = _interopRequireDefault(require("../keys/public"));

var _private = _interopRequireDefault(require("../keys/private"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyPair, toBase64;

toBase64 = function (bytes) {
  return (0, _utils.convert)({
    from: "bytes",
    to: "base64"
  }, bytes);
};

KeyPair = function () {
  class KeyPair {
    constructor({
      publicKey,
      privateKey
    }) {
      this.publicKey = _public.default.from("bytes", publicKey);
      this.privateKey = _private.default.from("bytes", privateKey);
    }

    to(hint) {
      var output;
      output = (0, _pandaParchment.toJSON)({
        privateKey: toBase64(this.privateKey),
        publicKey: toBase64(this.publicKey)
      });

      if (hint === "utf8") {
        return output;
      } else {
        return (0, _utils.convert)({
          from: "utf8",
          to: hint
        }, output);
      }
    }

  }

  ;
  KeyPair.isKind = (0, _pandaParchment.isKind)(KeyPair);
  KeyPair.areType = (0, _utils.areType)(KeyPair.isType);
  return KeyPair;
}.call(void 0);

var _default = KeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9rZXktcGFpci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxPQUFBLEVBQUEsUUFBQTs7QUFLQSxRQUFBLEdBQVcsVUFBQSxLQUFBLEVBQUE7U0FBVyxvQkFBUTtBQUFBLElBQUEsSUFBQSxFQUFBLE9BQUE7QUFBZSxJQUFBLEVBQUEsRUFBSTtBQUFuQixHQUFSLEVBQUEsS0FBQSxDO0FBQVgsQ0FBWDs7QUFFTSxPQUFBLEdBQUEsWUFBQTtBQUFOLFFBQUEsT0FBQSxDQUFBO0FBQ0UsSUFBQSxXQUFhLENBQUM7QUFBQSxNQUFBLFNBQUE7QUFBRCxNQUFBO0FBQUMsS0FBRCxFQUFBO0FBQ1gsV0FBQSxTQUFBLEdBQWEsZ0JBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxTQUFBLENBQWI7QUFDQSxXQUFBLFVBQUEsR0FBYyxpQkFBQSxJQUFBLENBQUEsT0FBQSxFQUFBLFVBQUEsQ0FBZDtBQUZXOztBQUliLElBQUEsRUFBSSxDQUFBLElBQUEsRUFBQTtBQUNGLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLDRCQUNQO0FBQUEsUUFBQSxVQUFBLEVBQVksUUFBQSxDQUFTLEtBQXJCLFVBQVksQ0FBWjtBQUNBLFFBQUEsU0FBQSxFQUFXLFFBQUEsQ0FBUyxLQUFULFNBQUE7QUFEWCxPQURPLENBQVQ7O0FBSUEsVUFBRyxJQUFBLEtBQUgsTUFBQSxFQUFBO2VBQUEsTTtBQUFBLE9BQUEsTUFBQTtlQUdFLG9CQUFRO0FBQUEsVUFBQSxJQUFBLEVBQUEsTUFBQTtBQUFjLFVBQUEsRUFBQSxFQUFJO0FBQWxCLFNBQVIsRUFIRixNQUdFLEM7O0FBUkE7O0FBTE47O0FBQUE7QUFlRSxFQUFBLE9BQUMsQ0FBRCxNQUFBLEdBQVMsNEJBQUEsT0FBQSxDQUFUO0FBQ0EsRUFBQSxPQUFDLENBQUQsT0FBQSxHQUFVLG9CQUFRLE9BQUMsQ0FBVCxNQUFBLENBQVY7O0NBaEJJLEMsSUFBQSxRQUFBOztlQWtCUyxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0tpbmQsIHRvSlNPTn0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge2NvbnZlcnQsIGFyZVR5cGV9IGZyb20gXCIuLi91dGlsc1wiXG5pbXBvcnQgUHVibGljS2V5IGZyb20gXCIuLi9rZXlzL3B1YmxpY1wiXG5pbXBvcnQgUHJpdmF0ZUtleSBmcm9tIFwiLi4va2V5cy9wcml2YXRlXCJcblxudG9CYXNlNjQgPSAoYnl0ZXMpIC0+IGNvbnZlcnQgZnJvbTogXCJieXRlc1wiLCB0bzogXCJiYXNlNjRcIiwgYnl0ZXNcblxuY2xhc3MgS2V5UGFpclxuICBjb25zdHJ1Y3RvcjogKHtwdWJsaWNLZXksIHByaXZhdGVLZXl9KSAtPlxuICAgIEBwdWJsaWNLZXkgPSBQdWJsaWNLZXkuZnJvbSBcImJ5dGVzXCIsIHB1YmxpY0tleVxuICAgIEBwcml2YXRlS2V5ID0gUHJpdmF0ZUtleS5mcm9tIFwiYnl0ZXNcIiwgcHJpdmF0ZUtleVxuXG4gIHRvOiAoaGludCkgLT5cbiAgICBvdXRwdXQgPSB0b0pTT05cbiAgICAgIHByaXZhdGVLZXk6IHRvQmFzZTY0IEBwcml2YXRlS2V5XG4gICAgICBwdWJsaWNLZXk6IHRvQmFzZTY0IEBwdWJsaWNLZXlcblxuICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgIG91dHB1dFxuICAgIGVsc2VcbiAgICAgIGNvbnZlcnQgZnJvbTogXCJ1dGY4XCIsIHRvOiBoaW50LCBvdXRwdXRcblxuICBAaXNLaW5kOiBpc0tpbmQgQFxuICBAYXJlVHlwZTogYXJlVHlwZSBAaXNUeXBlXG5cbmV4cG9ydCBkZWZhdWx0IEtleVBhaXJcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/key-pair.coffee
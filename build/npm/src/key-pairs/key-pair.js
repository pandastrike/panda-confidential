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
      this.publicKey = new _public.default(publicKey);
      this.privateKey = new _private.default(privateKey);
    }

    to(hint) {
      var output;
      output = JSON.stringify({
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
  return KeyPair;
}.call(void 0);

var _default = KeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMva2V5LXBhaXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsT0FBQSxFQUFBLFFBQUE7O0FBS0EsUUFBQSxHQUFXLFVBQUEsS0FBQSxFQUFBO1NBQVcsb0JBQVE7QUFBQSxJQUFBLElBQUEsRUFBQSxPQUFBO0FBQWUsSUFBQSxFQUFBLEVBQUk7QUFBbkIsR0FBUixFQUFBLEtBQUEsQztBQUFYLENBQVg7O0FBRU0sT0FBQSxHQUFBLFlBQUE7QUFBTixRQUFBLE9BQUEsQ0FBQTtBQUNFLElBQUEsV0FBYSxDQUFDO0FBQUEsTUFBQSxTQUFBO0FBQUQsTUFBQTtBQUFDLEtBQUQsRUFBQTtBQUNYLFdBQUEsU0FBQSxHQUFhLElBQUEsZUFBQSxDQUFBLFNBQUEsQ0FBYjtBQUNBLFdBQUEsVUFBQSxHQUFjLElBQUEsZ0JBQUEsQ0FBQSxVQUFBLENBQWQ7QUFGVzs7QUFJYixJQUFBLEVBQUksQ0FBQSxJQUFBLEVBQUE7QUFDRixVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFJLENBQUosU0FBQSxDQUNQO0FBQUEsUUFBQSxVQUFBLEVBQVksUUFBQSxDQUFTLEtBQXJCLFVBQVksQ0FBWjtBQUNBLFFBQUEsU0FBQSxFQUFXLFFBQUEsQ0FBUyxLQUFULFNBQUE7QUFEWCxPQURPLENBQVQ7O0FBSUEsVUFBRyxJQUFBLEtBQUgsTUFBQSxFQUFBO2VBQUEsTTtBQUFBLE9BQUEsTUFBQTtlQUdFLG9CQUFRO0FBQUEsVUFBQSxJQUFBLEVBQUEsTUFBQTtBQUFjLFVBQUEsRUFBQSxFQUFJO0FBQWxCLFNBQVIsRUFIRixNQUdFLEM7O0FBUkE7O0FBTE47O0FBQUE7QUFlRSxFQUFBLE9BQUMsQ0FBRCxNQUFBLEdBQVMsNEJBQUEsT0FBQSxDQUFUOztDQWZJLEMsSUFBQSxRQUFBOztlQWlCUyxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0tpbmR9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtjb252ZXJ0fSBmcm9tIFwiLi4vdXRpbHNcIlxuaW1wb3J0IFB1YmxpY0tleSBmcm9tIFwiLi4va2V5cy9wdWJsaWNcIlxuaW1wb3J0IFByaXZhdGVLZXkgZnJvbSBcIi4uL2tleXMvcHJpdmF0ZVwiXG5cbnRvQmFzZTY0ID0gKGJ5dGVzKSAtPiBjb252ZXJ0IGZyb206IFwiYnl0ZXNcIiwgdG86IFwiYmFzZTY0XCIsIGJ5dGVzXG5cbmNsYXNzIEtleVBhaXJcbiAgY29uc3RydWN0b3I6ICh7cHVibGljS2V5LCBwcml2YXRlS2V5fSkgLT5cbiAgICBAcHVibGljS2V5ID0gbmV3IFB1YmxpY0tleSBwdWJsaWNLZXlcbiAgICBAcHJpdmF0ZUtleSA9IG5ldyBQcml2YXRlS2V5IHByaXZhdGVLZXlcblxuICB0bzogKGhpbnQpIC0+XG4gICAgb3V0cHV0ID0gSlNPTi5zdHJpbmdpZnlcbiAgICAgIHByaXZhdGVLZXk6IHRvQmFzZTY0IEBwcml2YXRlS2V5XG4gICAgICBwdWJsaWNLZXk6IHRvQmFzZTY0IEBwdWJsaWNLZXlcblxuICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgIG91dHB1dFxuICAgIGVsc2VcbiAgICAgIGNvbnZlcnQgZnJvbTogXCJ1dGY4XCIsIHRvOiBoaW50LCBvdXRwdXRcblxuICBAaXNLaW5kOiBpc0tpbmQgQFxuXG5leHBvcnQgZGVmYXVsdCBLZXlQYWlyXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/key-pair.coffee
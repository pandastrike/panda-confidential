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
  return KeyPair;
}.call(void 0);

var _default = KeyPair;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMva2V5LXBhaXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsT0FBQSxFQUFBLFFBQUE7O0FBS0EsUUFBQSxHQUFXLFVBQUEsS0FBQSxFQUFBO1NBQVcsb0JBQVE7QUFBQSxJQUFBLElBQUEsRUFBQSxPQUFBO0FBQWUsSUFBQSxFQUFBLEVBQUk7QUFBbkIsR0FBUixFQUFBLEtBQUEsQztBQUFYLENBQVg7O0FBRU0sT0FBQSxHQUFBLFlBQUE7QUFBTixRQUFBLE9BQUEsQ0FBQTtBQUNFLElBQUEsV0FBYSxDQUFDO0FBQUEsTUFBQSxTQUFBO0FBQUQsTUFBQTtBQUFDLEtBQUQsRUFBQTtBQUNYLFdBQUEsU0FBQSxHQUFhLGdCQUFBLElBQUEsQ0FBQSxPQUFBLEVBQUEsU0FBQSxDQUFiO0FBQ0EsV0FBQSxVQUFBLEdBQWMsaUJBQUEsSUFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBLENBQWQ7QUFGVzs7QUFJYixJQUFBLEVBQUksQ0FBQSxJQUFBLEVBQUE7QUFDRixVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyw0QkFDUDtBQUFBLFFBQUEsVUFBQSxFQUFZLFFBQUEsQ0FBUyxLQUFyQixVQUFZLENBQVo7QUFDQSxRQUFBLFNBQUEsRUFBVyxRQUFBLENBQVMsS0FBVCxTQUFBO0FBRFgsT0FETyxDQUFUOztBQUlBLFVBQUcsSUFBQSxLQUFILE1BQUEsRUFBQTtlQUFBLE07QUFBQSxPQUFBLE1BQUE7ZUFHRSxvQkFBUTtBQUFBLFVBQUEsSUFBQSxFQUFBLE1BQUE7QUFBYyxVQUFBLEVBQUEsRUFBSTtBQUFsQixTQUFSLEVBSEYsTUFHRSxDOztBQVJBOztBQUxOOztBQUFBO0FBZUUsRUFBQSxPQUFDLENBQUQsTUFBQSxHQUFTLDRCQUFBLE9BQUEsQ0FBVDs7Q0FmSSxDLElBQUEsUUFBQTs7ZUFpQlMsTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNLaW5kLCB0b0pTT059IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtjb252ZXJ0fSBmcm9tIFwiLi4vdXRpbHNcIlxuaW1wb3J0IFB1YmxpY0tleSBmcm9tIFwiLi4va2V5cy9wdWJsaWNcIlxuaW1wb3J0IFByaXZhdGVLZXkgZnJvbSBcIi4uL2tleXMvcHJpdmF0ZVwiXG5cbnRvQmFzZTY0ID0gKGJ5dGVzKSAtPiBjb252ZXJ0IGZyb206IFwiYnl0ZXNcIiwgdG86IFwiYmFzZTY0XCIsIGJ5dGVzXG5cbmNsYXNzIEtleVBhaXJcbiAgY29uc3RydWN0b3I6ICh7cHVibGljS2V5LCBwcml2YXRlS2V5fSkgLT5cbiAgICBAcHVibGljS2V5ID0gUHVibGljS2V5LmZyb20gXCJieXRlc1wiLCBwdWJsaWNLZXlcbiAgICBAcHJpdmF0ZUtleSA9IFByaXZhdGVLZXkuZnJvbSBcImJ5dGVzXCIsIHByaXZhdGVLZXlcblxuICB0bzogKGhpbnQpIC0+XG4gICAgb3V0cHV0ID0gdG9KU09OXG4gICAgICBwcml2YXRlS2V5OiB0b0Jhc2U2NCBAcHJpdmF0ZUtleVxuICAgICAgcHVibGljS2V5OiB0b0Jhc2U2NCBAcHVibGljS2V5XG5cbiAgICBpZiBoaW50ID09IFwidXRmOFwiXG4gICAgICBvdXRwdXRcbiAgICBlbHNlXG4gICAgICBjb252ZXJ0IGZyb206IFwidXRmOFwiLCB0bzogaGludCwgb3V0cHV0XG5cbiAgQGlzS2luZDogaXNLaW5kIEBcblxuZXhwb3J0IGRlZmF1bHQgS2V5UGFpclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/key-pair.coffee
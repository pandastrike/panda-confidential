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

var KeyPair;

KeyPair = function () {
  class KeyPair {
    constructor({
      publicKey,
      privateKey
    }) {
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }

    to(hint) {
      var output;
      output = (0, _pandaParchment.toJSON)({
        privateKey: this.privateKey.to("base64"),
        publicKey: this.publicKey.to("base64")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleS1wYWlycy9rZXktcGFpci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBSEEsSUFBQSxPQUFBOztBQUtNLE9BQUEsR0FBQSxZQUFBO0FBQU4sUUFBQSxPQUFBLENBQUE7QUFDRSxJQUFBLFdBQWEsQ0FBQztBQUFBLE1BQUEsU0FBQTtBQUFELE1BQUE7QUFBQyxLQUFELEVBQUE7QUFBRSxXQUFDLFNBQUQsR0FBQyxTQUFEO0FBQVksV0FBQyxVQUFELEdBQUMsVUFBRDtBQUFkOztBQUViLElBQUEsRUFBSSxDQUFBLElBQUEsRUFBQTtBQUNGLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLDRCQUNQO0FBQUEsUUFBQSxVQUFBLEVBQVksS0FBQyxVQUFELENBQUEsRUFBQSxDQUFaLFFBQVksQ0FBWjtBQUNBLFFBQUEsU0FBQSxFQUFXLEtBQUMsU0FBRCxDQUFBLEVBQUEsQ0FBQSxRQUFBO0FBRFgsT0FETyxDQUFUOztBQUlBLFVBQUcsSUFBQSxLQUFILE1BQUEsRUFBQTtlQUFBLE07QUFBQSxPQUFBLE1BQUE7ZUFHRSxvQkFBUTtBQUFBLFVBQUEsSUFBQSxFQUFBLE1BQUE7QUFBYyxVQUFBLEVBQUEsRUFBSTtBQUFsQixTQUFSLEVBSEYsTUFHRSxDOztBQVJBOztBQUhOOztBQUFBO0FBYUUsRUFBQSxPQUFDLENBQUQsTUFBQSxHQUFTLDRCQUFBLE9BQUEsQ0FBVDtBQUNBLEVBQUEsT0FBQyxDQUFELE9BQUEsR0FBVSxvQkFBUSxPQUFDLENBQVQsTUFBQSxDQUFWOztDQWRJLEMsSUFBQSxRQUFBOztlQWdCUyxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0tpbmQsIHRvSlNPTn0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge2NvbnZlcnQsIGFyZVR5cGV9IGZyb20gXCIuLi91dGlsc1wiXG5pbXBvcnQgUHVibGljS2V5IGZyb20gXCIuLi9rZXlzL3B1YmxpY1wiXG5pbXBvcnQgUHJpdmF0ZUtleSBmcm9tIFwiLi4va2V5cy9wcml2YXRlXCJcblxuY2xhc3MgS2V5UGFpclxuICBjb25zdHJ1Y3RvcjogKHtAcHVibGljS2V5LCBAcHJpdmF0ZUtleX0pIC0+XG5cbiAgdG86IChoaW50KSAtPlxuICAgIG91dHB1dCA9IHRvSlNPTlxuICAgICAgcHJpdmF0ZUtleTogQHByaXZhdGVLZXkudG8gXCJiYXNlNjRcIlxuICAgICAgcHVibGljS2V5OiBAcHVibGljS2V5LnRvIFwiYmFzZTY0XCJcblxuICAgIGlmIGhpbnQgPT0gXCJ1dGY4XCJcbiAgICAgIG91dHB1dFxuICAgIGVsc2VcbiAgICAgIGNvbnZlcnQgZnJvbTogXCJ1dGY4XCIsIHRvOiBoaW50LCBvdXRwdXRcblxuICBAaXNLaW5kOiBpc0tpbmQgQFxuICBAYXJlVHlwZTogYXJlVHlwZSBAaXNUeXBlXG5cbmV4cG9ydCBkZWZhdWx0IEtleVBhaXJcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/src/key-pairs/key-pair.coffee
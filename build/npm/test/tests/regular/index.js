"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _amen = require("amen");

var _symmetricEncryption = _interopRequireDefault(require("./symmetric-encryption"));

var _asymmetricEncryption = _interopRequireDefault(require("./asymmetric-encryption"));

var _signature = _interopRequireDefault(require("./signature"));

var _hash = _interopRequireDefault(require("./hash"));

var _convert = _interopRequireDefault(require("./convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test;

Test = async function () {
  return await (0, _amen.print)((await (0, _amen.test)("Panda Confidential", [(0, _amen.test)({
    description: "Symmetric Encryption",
    wait: false
  }, _symmetricEncryption.default), (0, _amen.test)({
    description: "Public Key Encryption",
    wait: false
  }, _asymmetricEncryption.default), (0, _amen.test)({
    description: "Digital Signature",
    wait: false
  }, _signature.default), (0, _amen.test)({
    description: "SHA-512 Hash",
    wait: false
  }, _hash.default), (0, _amen.test)({
    description: "Format Conversions",
    wait: false
  }, _convert.default)])));
};

var _default = Test;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9yZWd1bGFyL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFOQSxJQUFBLElBQUE7O0FBUUEsSUFBQSxHQUFPLGtCQUFBO0FBQ0wsU0FBQSxNQUFNLGtCQUFNLE1BQU0sZ0JBQUEsb0JBQUEsRUFBMkIsQ0FDM0MsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxzQkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQUQyQyw0QkFDM0MsQ0FEMkMsRUFNM0MsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSx1QkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQU4yQyw2QkFNM0MsQ0FOMkMsRUFXM0MsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxtQkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQVgyQyxrQkFXM0MsQ0FYMkMsRUFnQjNDLGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQWhCMkMsYUFnQjNDLENBaEIyQyxFQXFCM0MsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxvQkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQXJCMkMsZ0JBcUIzQyxDQXJCMkMsQ0FBM0IsQ0FBWixFQUFOO0FBREssQ0FBUDs7ZUE0QmUsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cHJpbnQsIHRlc3R9IGZyb20gXCJhbWVuXCJcblxuaW1wb3J0IHN5bW1ldHJpYyBmcm9tIFwiLi9zeW1tZXRyaWMtZW5jcnlwdGlvblwiXG5pbXBvcnQgYXN5bW1ldHJpYyBmcm9tIFwiLi9hc3ltbWV0cmljLWVuY3J5cHRpb25cIlxuaW1wb3J0IHNpZ25hdHVyZSBmcm9tIFwiLi9zaWduYXR1cmVcIlxuaW1wb3J0IGhhc2ggZnJvbSBcIi4vaGFzaFwiXG5pbXBvcnQgY29udmVydCBmcm9tIFwiLi9jb252ZXJ0XCJcblxuVGVzdCA9IC0+XG4gIGF3YWl0IHByaW50IGF3YWl0IHRlc3QgXCJQYW5kYSBDb25maWRlbnRpYWxcIiwgW1xuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlN5bW1ldHJpYyBFbmNyeXB0aW9uXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgc3ltbWV0cmljXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJQdWJsaWMgS2V5IEVuY3J5cHRpb25cIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBhc3ltbWV0cmljXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJEaWdpdGFsIFNpZ25hdHVyZVwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIHNpZ25hdHVyZVxuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiU0hBLTUxMiBIYXNoXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgaGFzaFxuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiRm9ybWF0IENvbnZlcnNpb25zXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgY29udmVydFxuICBdXG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/regular/index.coffee
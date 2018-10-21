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
  }, _hash.default)])));
};

var _default = Test;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL3JlZ3VsYXIvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUxBLElBQUEsSUFBQTs7QUFPQSxJQUFBLEdBQU8sa0JBQUE7QUFDTCxTQUFBLE1BQU0sa0JBQU0sTUFBTSxnQkFBQSxvQkFBQSxFQUEyQixDQUMzQyxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLHNCQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBRDJDLDRCQUMzQyxDQUQyQyxFQU0zQyxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLHVCQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBTjJDLDZCQU0zQyxDQU4yQyxFQVczQyxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLG1CQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBWDJDLGtCQVczQyxDQVgyQyxFQWdCM0MsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxjQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBaEIyQyxhQWdCM0MsQ0FoQjJDLENBQTNCLENBQVosRUFBTjtBQURLLENBQVA7O2VBdUJlLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ByaW50LCB0ZXN0fSBmcm9tIFwiYW1lblwiXG5cbmltcG9ydCBzeW1tZXRyaWMgZnJvbSBcIi4vc3ltbWV0cmljLWVuY3J5cHRpb25cIlxuaW1wb3J0IGFzeW1tZXRyaWMgZnJvbSBcIi4vYXN5bW1ldHJpYy1lbmNyeXB0aW9uXCJcbmltcG9ydCBzaWduYXR1cmUgZnJvbSBcIi4vc2lnbmF0dXJlXCJcbmltcG9ydCBoYXNoIGZyb20gXCIuL2hhc2hcIlxuXG5UZXN0ID0gLT5cbiAgYXdhaXQgcHJpbnQgYXdhaXQgdGVzdCBcIlBhbmRhIENvbmZpZGVudGlhbFwiLCBbXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiU3ltbWV0cmljIEVuY3J5cHRpb25cIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBzeW1tZXRyaWNcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBLZXkgRW5jcnlwdGlvblwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIGFzeW1tZXRyaWNcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkRpZ2l0YWwgU2lnbmF0dXJlXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgc2lnbmF0dXJlXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJTSEEtNTEyIEhhc2hcIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBoYXNoXG4gIF1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdFxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=tests/regular/index.coffee
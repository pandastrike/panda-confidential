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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvcmVndWxhci9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBTkEsSUFBQSxJQUFBOztBQVFBLElBQUEsR0FBTyxrQkFBQTtBQUNMLFNBQUEsTUFBTSxrQkFBTSxNQUFNLGdCQUFBLG9CQUFBLEVBQTJCLENBQzNDLGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsc0JBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFEMkMsNEJBQzNDLENBRDJDLEVBTTNDLGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsdUJBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFOMkMsNkJBTTNDLENBTjJDLEVBVzNDLGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsbUJBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFYMkMsa0JBVzNDLENBWDJDLEVBZ0IzQyxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFoQjJDLGFBZ0IzQyxDQWhCMkMsRUFxQjNDLGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsb0JBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFyQjJDLGdCQXFCM0MsQ0FyQjJDLENBQTNCLENBQVosRUFBTjtBQURLLENBQVA7O2VBNEJlLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ByaW50LCB0ZXN0fSBmcm9tIFwiYW1lblwiXG5cbmltcG9ydCBzeW1tZXRyaWMgZnJvbSBcIi4vc3ltbWV0cmljLWVuY3J5cHRpb25cIlxuaW1wb3J0IGFzeW1tZXRyaWMgZnJvbSBcIi4vYXN5bW1ldHJpYy1lbmNyeXB0aW9uXCJcbmltcG9ydCBzaWduYXR1cmUgZnJvbSBcIi4vc2lnbmF0dXJlXCJcbmltcG9ydCBoYXNoIGZyb20gXCIuL2hhc2hcIlxuaW1wb3J0IGNvbnZlcnQgZnJvbSBcIi4vY29udmVydFwiXG5cblRlc3QgPSAtPlxuICBhd2FpdCBwcmludCBhd2FpdCB0ZXN0IFwiUGFuZGEgQ29uZmlkZW50aWFsXCIsIFtcbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJTeW1tZXRyaWMgRW5jcnlwdGlvblwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIHN5bW1ldHJpY1xuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIEtleSBFbmNyeXB0aW9uXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgYXN5bW1ldHJpY1xuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiRGlnaXRhbCBTaWduYXR1cmVcIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBzaWduYXR1cmVcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNIQS01MTIgSGFzaFwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIGhhc2hcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkZvcm1hdCBDb252ZXJzaW9uc1wiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIGNvbnZlcnRcbiAgXVxuXG5leHBvcnQgZGVmYXVsdCBUZXN0XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/regular/index.coffee
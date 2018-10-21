"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _amen = require("amen");

var _symmetricEncryption = _interopRequireDefault(require("./symmetric-encryption"));

var _symmetricEncryptionKms = _interopRequireDefault(require("./symmetric-encryption-kms"));

var _asymmetricEncryption = _interopRequireDefault(require("./asymmetric-encryption"));

var _signature = _interopRequireDefault(require("./signature"));

var _hash = _interopRequireDefault(require("./hash"));

var _index = require("../../../src/index");

var _kms = _interopRequireDefault(require("./kms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Tests
var ExtensionTests;

ExtensionTests = async function (SDK) {
  var kms;
  kms = (0, _kms.default)((0, _index.confidential)(), SDK);
  return await (0, _amen.print)((await (0, _amen.test)("Panda Confidential extended with KMS", [(0, _amen.test)({
    description: "Symmetric Encryption",
    wait: false
  }, (0, _symmetricEncryption.default)(kms)), (0, _amen.test)({
    description: "Symmetric Encryption with KMS",
    wait: false
  }, (0, _symmetricEncryptionKms.default)(kms)), (0, _amen.test)({
    description: "Public Key Encryption",
    wait: false
  }, (0, _asymmetricEncryption.default)(kms)), (0, _amen.test)({
    description: "Digital Signature",
    wait: false
  }, (0, _signature.default)(kms)), (0, _amen.test)({
    description: "SHA-512 Hash",
    wait: false
  }, (0, _hash.default)(kms))])));
};

var _default = ExtensionTests;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RzL2V4dGVuZGVkL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFWQTtBQUFBLElBQUEsY0FBQTs7QUFhQSxjQUFBLEdBQWlCLGdCQUFBLEdBQUEsRUFBQTtBQUNmLE1BQUEsR0FBQTtBQUFBLEVBQUEsR0FBQSxHQUFNLGtCQUFBLDBCQUFBLEVBQUEsR0FBQSxDQUFOO0FBQ0EsU0FBQSxNQUFNLGtCQUFNLE1BQU0sZ0JBQUEsc0NBQUEsRUFBNkMsQ0FDN0QsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxzQkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQUdFLGtDQUoyRCxHQUkzRCxDQUhGLENBRDZELEVBTTdELGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsK0JBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFHRSxxQ0FUMkQsR0FTM0QsQ0FIRixDQU42RCxFQVc3RCxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLHVCQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBR0UsbUNBZDJELEdBYzNELENBSEYsQ0FYNkQsRUFnQjdELGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsbUJBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFHRSx3QkFuQjJELEdBbUIzRCxDQUhGLENBaEI2RCxFQXFCN0QsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxjQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBR0UsbUJBeEIyRCxHQXdCM0QsQ0FIRixDQXJCNkQsQ0FBN0MsQ0FBWixFQUFOO0FBRmUsQ0FBakI7O2VBNkJlLGMiLCJzb3VyY2VzQ29udGVudCI6WyIjIFRlc3RzXG5pbXBvcnQge3ByaW50LCB0ZXN0fSBmcm9tIFwiYW1lblwiXG5pbXBvcnQgc3ltbWV0cmljIGZyb20gXCIuL3N5bW1ldHJpYy1lbmNyeXB0aW9uXCJcbmltcG9ydCBzeW1tZXRyaWNLTVMgZnJvbSBcIi4vc3ltbWV0cmljLWVuY3J5cHRpb24ta21zXCJcbmltcG9ydCBhc3ltbWV0cmljIGZyb20gXCIuL2FzeW1tZXRyaWMtZW5jcnlwdGlvblwiXG5pbXBvcnQgc2lnbmF0dXJlIGZyb20gXCIuL3NpZ25hdHVyZVwiXG5pbXBvcnQgaGFzaCBmcm9tIFwiLi9oYXNoXCJcblxuIyBVc2VkIHRvIGV4dGVuZCB0aGUgY29uZmlkZW50aWFsIGludGVyZmFjZS5cbmltcG9ydCB7Y29uZmlkZW50aWFsfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2luZGV4XCJcbmltcG9ydCBLTVMgZnJvbSBcIi4va21zXCJcblxuXG5FeHRlbnNpb25UZXN0cyA9IChTREspIC0+XG4gIGttcyA9IEtNUyBjb25maWRlbnRpYWwoKSwgU0RLXG4gIGF3YWl0IHByaW50IGF3YWl0IHRlc3QgXCJQYW5kYSBDb25maWRlbnRpYWwgZXh0ZW5kZWQgd2l0aCBLTVNcIiwgW1xuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlN5bW1ldHJpYyBFbmNyeXB0aW9uXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgc3ltbWV0cmljIGttc1xuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiU3ltbWV0cmljIEVuY3J5cHRpb24gd2l0aCBLTVNcIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBzeW1tZXRyaWNLTVMga21zXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJQdWJsaWMgS2V5IEVuY3J5cHRpb25cIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBhc3ltbWV0cmljIGttc1xuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiRGlnaXRhbCBTaWduYXR1cmVcIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBzaWduYXR1cmUga21zXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJTSEEtNTEyIEhhc2hcIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBoYXNoIGttc1xuICBdXG5cbmV4cG9ydCBkZWZhdWx0IEV4dGVuc2lvblRlc3RzXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=tests/extended/index.coffee
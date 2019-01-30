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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC90ZXN0cy9leHRlbmRlZC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOztBQUNBOzs7O0FBVkE7QUFBQSxJQUFBLGNBQUE7O0FBYUEsY0FBQSxHQUFpQixnQkFBQSxHQUFBLEVBQUE7QUFDZixNQUFBLEdBQUE7QUFBQSxFQUFBLEdBQUEsR0FBTSxrQkFBQSwwQkFBQSxFQUFBLEdBQUEsQ0FBTjtBQUNBLFNBQUEsTUFBTSxrQkFBTSxNQUFNLGdCQUFBLHNDQUFBLEVBQTZDLENBQzdELGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsc0JBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFHRSxrQ0FKMkQsR0FJM0QsQ0FIRixDQUQ2RCxFQU03RCxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLCtCQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBR0UscUNBVDJELEdBUzNELENBSEYsQ0FONkQsRUFXN0QsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSx1QkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQUdFLG1DQWQyRCxHQWMzRCxDQUhGLENBWDZELEVBZ0I3RCxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLG1CQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBR0Usd0JBbkIyRCxHQW1CM0QsQ0FIRixDQWhCNkQsRUFxQjdELGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQUdFLG1CQXhCMkQsR0F3QjNELENBSEYsQ0FyQjZELENBQTdDLENBQVosRUFBTjtBQUZlLENBQWpCOztlQTZCZSxjIiwic291cmNlc0NvbnRlbnQiOlsiIyBUZXN0c1xuaW1wb3J0IHtwcmludCwgdGVzdH0gZnJvbSBcImFtZW5cIlxuaW1wb3J0IHN5bW1ldHJpYyBmcm9tIFwiLi9zeW1tZXRyaWMtZW5jcnlwdGlvblwiXG5pbXBvcnQgc3ltbWV0cmljS01TIGZyb20gXCIuL3N5bW1ldHJpYy1lbmNyeXB0aW9uLWttc1wiXG5pbXBvcnQgYXN5bW1ldHJpYyBmcm9tIFwiLi9hc3ltbWV0cmljLWVuY3J5cHRpb25cIlxuaW1wb3J0IHNpZ25hdHVyZSBmcm9tIFwiLi9zaWduYXR1cmVcIlxuaW1wb3J0IGhhc2ggZnJvbSBcIi4vaGFzaFwiXG5cbiMgVXNlZCB0byBleHRlbmQgdGhlIGNvbmZpZGVudGlhbCBpbnRlcmZhY2UuXG5pbXBvcnQge2NvbmZpZGVudGlhbH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9pbmRleFwiXG5pbXBvcnQgS01TIGZyb20gXCIuL2ttc1wiXG5cblxuRXh0ZW5zaW9uVGVzdHMgPSAoU0RLKSAtPlxuICBrbXMgPSBLTVMgY29uZmlkZW50aWFsKCksIFNES1xuICBhd2FpdCBwcmludCBhd2FpdCB0ZXN0IFwiUGFuZGEgQ29uZmlkZW50aWFsIGV4dGVuZGVkIHdpdGggS01TXCIsIFtcbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJTeW1tZXRyaWMgRW5jcnlwdGlvblwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIHN5bW1ldHJpYyBrbXNcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlN5bW1ldHJpYyBFbmNyeXB0aW9uIHdpdGggS01TXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgc3ltbWV0cmljS01TIGttc1xuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiUHVibGljIEtleSBFbmNyeXB0aW9uXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgYXN5bW1ldHJpYyBrbXNcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkRpZ2l0YWwgU2lnbmF0dXJlXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgc2lnbmF0dXJlIGttc1xuXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiU0hBLTUxMiBIYXNoXCJcbiAgICAgIHdhaXQ6IGZhbHNlLFxuICAgICAgaGFzaCBrbXNcbiAgXVxuXG5leHBvcnQgZGVmYXVsdCBFeHRlbnNpb25UZXN0c1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/repos/panda-confidential/test/tests/extended/index.coffee
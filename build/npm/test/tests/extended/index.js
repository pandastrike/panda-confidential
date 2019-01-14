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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvdGVzdHMvZXh0ZW5kZWQvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7OztBQVZBO0FBQUEsSUFBQSxjQUFBOztBQWFBLGNBQUEsR0FBaUIsZ0JBQUEsR0FBQSxFQUFBO0FBQ2YsTUFBQSxHQUFBO0FBQUEsRUFBQSxHQUFBLEdBQU0sa0JBQUEsMEJBQUEsRUFBQSxHQUFBLENBQU47QUFDQSxTQUFBLE1BQU0sa0JBQU0sTUFBTSxnQkFBQSxzQ0FBQSxFQUE2QyxDQUM3RCxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLHNCQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBR0Usa0NBSjJELEdBSTNELENBSEYsQ0FENkQsRUFNN0QsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSwrQkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQUdFLHFDQVQyRCxHQVMzRCxDQUhGLENBTjZELEVBVzdELGdCQUNFO0FBQUEsSUFBQSxXQUFBLEVBQUEsdUJBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFHRSxtQ0FkMkQsR0FjM0QsQ0FIRixDQVg2RCxFQWdCN0QsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxtQkFBQTtBQUNBLElBQUEsSUFBQSxFQUFNO0FBRE4sR0FERixFQUdFLHdCQW5CMkQsR0FtQjNELENBSEYsQ0FoQjZELEVBcUI3RCxnQkFDRTtBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUE7QUFDQSxJQUFBLElBQUEsRUFBTTtBQUROLEdBREYsRUFHRSxtQkF4QjJELEdBd0IzRCxDQUhGLENBckI2RCxDQUE3QyxDQUFaLEVBQU47QUFGZSxDQUFqQjs7ZUE2QmUsYyIsInNvdXJjZXNDb250ZW50IjpbIiMgVGVzdHNcbmltcG9ydCB7cHJpbnQsIHRlc3R9IGZyb20gXCJhbWVuXCJcbmltcG9ydCBzeW1tZXRyaWMgZnJvbSBcIi4vc3ltbWV0cmljLWVuY3J5cHRpb25cIlxuaW1wb3J0IHN5bW1ldHJpY0tNUyBmcm9tIFwiLi9zeW1tZXRyaWMtZW5jcnlwdGlvbi1rbXNcIlxuaW1wb3J0IGFzeW1tZXRyaWMgZnJvbSBcIi4vYXN5bW1ldHJpYy1lbmNyeXB0aW9uXCJcbmltcG9ydCBzaWduYXR1cmUgZnJvbSBcIi4vc2lnbmF0dXJlXCJcbmltcG9ydCBoYXNoIGZyb20gXCIuL2hhc2hcIlxuXG4jIFVzZWQgdG8gZXh0ZW5kIHRoZSBjb25maWRlbnRpYWwgaW50ZXJmYWNlLlxuaW1wb3J0IHtjb25maWRlbnRpYWx9IGZyb20gXCIuLi8uLi8uLi9zcmMvaW5kZXhcIlxuaW1wb3J0IEtNUyBmcm9tIFwiLi9rbXNcIlxuXG5cbkV4dGVuc2lvblRlc3RzID0gKFNESykgLT5cbiAga21zID0gS01TIGNvbmZpZGVudGlhbCgpLCBTREtcbiAgYXdhaXQgcHJpbnQgYXdhaXQgdGVzdCBcIlBhbmRhIENvbmZpZGVudGlhbCBleHRlbmRlZCB3aXRoIEtNU1wiLCBbXG4gICAgdGVzdFxuICAgICAgZGVzY3JpcHRpb246IFwiU3ltbWV0cmljIEVuY3J5cHRpb25cIlxuICAgICAgd2FpdDogZmFsc2UsXG4gICAgICBzeW1tZXRyaWMga21zXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJTeW1tZXRyaWMgRW5jcnlwdGlvbiB3aXRoIEtNU1wiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIHN5bW1ldHJpY0tNUyBrbXNcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyBLZXkgRW5jcnlwdGlvblwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIGFzeW1tZXRyaWMga21zXG5cbiAgICB0ZXN0XG4gICAgICBkZXNjcmlwdGlvbjogXCJEaWdpdGFsIFNpZ25hdHVyZVwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIHNpZ25hdHVyZSBrbXNcblxuICAgIHRlc3RcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNIQS01MTIgSGFzaFwiXG4gICAgICB3YWl0OiBmYWxzZSxcbiAgICAgIGhhc2gga21zXG4gIF1cblxuZXhwb3J0IGRlZmF1bHQgRXh0ZW5zaW9uVGVzdHNcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/Repositories/panda-confidential/test/tests/extended/index.coffee
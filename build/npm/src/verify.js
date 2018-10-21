"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _signedMessage = require("./signed-message");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verify;
// Define a multimethod.
verify = _pandaGenerics.Method.create(); // Verify the signature(s) on a message.

_pandaGenerics.Method.define(verify, _signedMessage.isSignedMessage, function ({
  message,
  encoding,
  publicKeys,
  signatures
}) {
  var i, j, ref;

  if (publicKeys.length !== signatures.length) {
    return false;
  }

  for (i = j = 0, ref = publicKeys.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (!_tweetnacl.default.sign.detached.verify(message, signatures[i], publicKeys[i])) {
      return false;
    }
  }

  return true;
});

_pandaGenerics.Method.define(verify, _pandaParchment.isString, function (message) {
  return verify((0, _signedMessage.signedMessage)(message));
});

_pandaGenerics.Method.define(verify, _utils.isData, function (message) {
  return verify((0, _signedMessage.signedMessage)(message));
});

var _default = verify;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcmlmeS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBTEEsSUFBQSxNQUFBOztBQVFBLE1BQUEsR0FBUyxzQkFSVCxNQVFTLEVBQVQsQzs7QUFHQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFBLDhCQUFBLEVBQ0UsVUFBQztBQUFBLEVBQUEsT0FBQTtBQUFBLEVBQUEsUUFBQTtBQUFBLEVBQUEsVUFBQTtBQUFELEVBQUE7QUFBQyxDQUFELEVBQUE7QUFDRSxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQTs7QUFBQSxNQUFHLFVBQVUsQ0FBVixNQUFBLEtBQXFCLFVBQVUsQ0FBbEMsTUFBQSxFQUFBO0FBQ0UsV0FERixLQUNFOzs7QUFDRixPQUFTLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxVQUFBLENBQUEsTUFBVCxFQUFTLEtBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLEdBQVQsRUFBUyxDQUFBLEdBQUEsS0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsRUFBVCxDQUFBLEVBQUE7QUFDRSxRQUFHLENBQUMsbUJBQUssSUFBTCxDQUFVLFFBQVYsQ0FBQSxNQUFBLENBQUEsT0FBQSxFQUFtQyxVQUFXLENBQTlDLENBQThDLENBQTlDLEVBQWtELFVBQVcsQ0FBakUsQ0FBaUUsQ0FBN0QsQ0FBSixFQUFBO0FBQ0UsYUFERixLQUNFOztBQUZKOztBQUdBLFNBQU8sSUFBUDtBQVBKLENBQUE7O0FBU0Esc0JBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSx3QkFBQSxFQUNFLFVBQUEsT0FBQSxFQUFBO1NBQWEsTUFBQSxDQUFPLGtDQUFQLE9BQU8sQ0FBUCxDO0FBRGYsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsTUFBQSxFQUFBLGFBQUEsRUFDRSxVQUFBLE9BQUEsRUFBQTtTQUFhLE1BQUEsQ0FBTyxrQ0FBUCxPQUFPLENBQVAsQztBQURmLENBQUE7O2VBR2UsTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBuYWNsIGZyb20gXCJ0d2VldG5hY2xcIlxuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQge01ldGhvZH0gZnJvbSBcInBhbmRhLWdlbmVyaWNzXCJcblxuaW1wb3J0IHtpc1NpZ25lZE1lc3NhZ2UsIHNpZ25lZE1lc3NhZ2V9IGZyb20gXCIuL3NpZ25lZC1tZXNzYWdlXCJcbmltcG9ydCB7aXNEYXRhfSBmcm9tIFwiLi91dGlsc1wiXG5cbiMgRGVmaW5lIGEgbXVsdGltZXRob2QuXG52ZXJpZnkgPSBNZXRob2QuY3JlYXRlKClcblxuIyBWZXJpZnkgdGhlIHNpZ25hdHVyZShzKSBvbiBhIG1lc3NhZ2UuXG5NZXRob2QuZGVmaW5lIHZlcmlmeSwgaXNTaWduZWRNZXNzYWdlLFxuICAoe21lc3NhZ2UsIGVuY29kaW5nLCBwdWJsaWNLZXlzLCBzaWduYXR1cmVzfSkgLT5cbiAgICBpZiBwdWJsaWNLZXlzLmxlbmd0aCAhPSBzaWduYXR1cmVzLmxlbmd0aFxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgZm9yIGkgaW4gWzAuLi5wdWJsaWNLZXlzLmxlbmd0aF1cbiAgICAgIGlmICFuYWNsLnNpZ24uZGV0YWNoZWQudmVyaWZ5IG1lc3NhZ2UsIHNpZ25hdHVyZXNbaV0sIHB1YmxpY0tleXNbaV1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcblxuTWV0aG9kLmRlZmluZSB2ZXJpZnksIGlzU3RyaW5nLFxuICAobWVzc2FnZSkgLT4gdmVyaWZ5IHNpZ25lZE1lc3NhZ2UgbWVzc2FnZVxuTWV0aG9kLmRlZmluZSB2ZXJpZnksIGlzRGF0YSxcbiAgKG1lc3NhZ2UpIC0+IHZlcmlmeSBzaWduZWRNZXNzYWdlIG1lc3NhZ2VcblxuZXhwb3J0IGRlZmF1bHQgdmVyaWZ5XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=verify.coffee
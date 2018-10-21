"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSymmetricKey = exports.symmetricKey = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _key = require("./key");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SymmetricKey, isSymmetricKey, symmetricKey;
exports.symmetricKey = symmetricKey;
exports.isSymmetricKey = isSymmetricKey;
SymmetricKey = class SymmetricKey extends _key.Key {};
exports.isSymmetricKey = isSymmetricKey = (0, _pandaParchment.isType)(SymmetricKey);

exports.symmetricKey = symmetricKey = function (randomBytes) {
  var get;
  get = _pandaGenerics.Method.create({
    default: async function () {
      return new SymmetricKey((await randomBytes(_tweetnacl.default.secretbox.keyLength)));
    }
  });

  _pandaGenerics.Method.define(get, _utils.isData, function (input) {
    return new SymmetricKey(input);
  });

  _pandaGenerics.Method.define(get, _pandaParchment.isString, function (input) {
    return get((0, _utils.decode)("base64", input));
  });

  _pandaGenerics.Method.define(get, _pandaParchment.isString, _pandaParchment.isString, function (input, encoding) {
    return get((0, _utils.decode)(encoding, input));
  });

  return get;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMvc3ltbWV0cmljLWtleS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBTEEsSUFBQSxZQUFBLEVBQUEsY0FBQSxFQUFBLFlBQUE7OztBQU9NLFlBQUEsR0FBTixNQUFBLFlBQUEsU0FBMkIsUUFBM0IsQ0FBQSxFQUFNO0FBRU4seUJBQUEsY0FBQSxHQUFpQiw0QkFBQSxZQUFBLENBQWpCOztBQUVBLHVCQUFBLFlBQUEsR0FBZSxVQUFBLFdBQUEsRUFBQTtBQUNiLE1BQUEsR0FBQTtBQUFBLEVBQUEsR0FBQSxHQUFNLHNCQUFBLE1BQUEsQ0FDSjtBQUFBLElBQUEsT0FBQSxFQUFTLGtCQUFBO2FBQUcsSUFBQSxZQUFBLEVBQWlCLE1BQU0sV0FBQSxDQUFZLG1CQUFLLFNBQUwsQ0FBbkMsU0FBdUIsQ0FBdkIsRTtBQUFIO0FBQVQsR0FESSxDQUFOOztBQUVBLHdCQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsYUFBQSxFQUNFLFVBQUEsS0FBQSxFQUFBO1dBQVcsSUFBQSxZQUFBLENBQUEsS0FBQSxDO0FBRGIsR0FBQTs7QUFFQSx3QkFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQSxLQUFBLEVBQUE7V0FBVyxHQUFBLENBQUksbUJBQUEsUUFBQSxFQUFKLEtBQUksQ0FBSixDO0FBRGIsR0FBQTs7QUFFQSx3QkFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLHdCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEtBQUEsRUFBQSxRQUFBLEVBQUE7V0FBcUIsR0FBQSxDQUFJLG1CQUFBLFFBQUEsRUFBSixLQUFJLENBQUosQztBQUR2QixHQUFBOztTQUdBLEc7QUFWYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5hY2wgZnJvbSBcInR3ZWV0bmFjbFwiXG5pbXBvcnQge2lzVHlwZSwgaXNTdHJpbmd9IGZyb20gXCJwYW5kYS1wYXJjaG1lbnRcIlxuaW1wb3J0IHtNZXRob2R9IGZyb20gXCJwYW5kYS1nZW5lcmljc1wiXG5cbmltcG9ydCB7S2V5fSBmcm9tIFwiLi9rZXlcIlxuaW1wb3J0IHtpc0RhdGEsIGRlY29kZX0gZnJvbSBcIi4uL3V0aWxzXCJcblxuY2xhc3MgU3ltbWV0cmljS2V5IGV4dGVuZHMgS2V5XG5cbmlzU3ltbWV0cmljS2V5ID0gaXNUeXBlIFN5bW1ldHJpY0tleVxuXG5zeW1tZXRyaWNLZXkgPSAocmFuZG9tQnl0ZXMpIC0+XG4gIGdldCA9IE1ldGhvZC5jcmVhdGVcbiAgICBkZWZhdWx0OiAtPiBuZXcgU3ltbWV0cmljS2V5IGF3YWl0IHJhbmRvbUJ5dGVzIG5hY2wuc2VjcmV0Ym94LmtleUxlbmd0aFxuICBNZXRob2QuZGVmaW5lIGdldCwgaXNEYXRhLFxuICAgIChpbnB1dCkgLT4gbmV3IFN5bW1ldHJpY0tleSBpbnB1dFxuICBNZXRob2QuZGVmaW5lIGdldCwgaXNTdHJpbmcsXG4gICAgKGlucHV0KSAtPiBnZXQgZGVjb2RlIFwiYmFzZTY0XCIsIGlucHV0XG4gIE1ldGhvZC5kZWZpbmUgZ2V0LCBpc1N0cmluZywgaXNTdHJpbmcsXG4gICAgKGlucHV0LCBlbmNvZGluZykgLT4gZ2V0IGRlY29kZSBlbmNvZGluZywgaW5wdXRcblxuICBnZXRcblxuZXhwb3J0IHtzeW1tZXRyaWNLZXksIGlzU3ltbWV0cmljS2V5fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=keys/symmetric-key.coffee
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPublicKey = exports.publicKey = void 0;

var _pandaParchment = require("panda-parchment");

var _pandaGenerics = require("panda-generics");

var _key = require("./key");

var _utils = require("../utils");

var PublicKey, get, isPublicKey;
exports.isPublicKey = isPublicKey;
exports.publicKey = get;
PublicKey = class PublicKey extends _key.Key {};
exports.isPublicKey = isPublicKey = (0, _pandaParchment.isType)(PublicKey);
exports.publicKey = get = _pandaGenerics.Method.create();

_pandaGenerics.Method.define(get, _utils.isData, function (input) {
  return new PublicKey(input);
});

_pandaGenerics.Method.define(get, _pandaParchment.isString, function (input) {
  return get((0, _utils.decode)("base64", input));
});

_pandaGenerics.Method.define(get, _pandaParchment.isString, _pandaParchment.isString, function (input, encoding) {
  return get((0, _utils.decode)(encoding, input));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMvcHVibGljLWtleS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQUpBLElBQUEsU0FBQSxFQUFBLEdBQUEsRUFBQSxXQUFBOzs7QUFNTSxTQUFBLEdBQU4sTUFBQSxTQUFBLFNBQXdCLFFBQXhCLENBQUEsRUFBTTtBQUVOLHNCQUFBLFdBQUEsR0FBYyw0QkFBQSxTQUFBLENBQWQ7QUFFQSxvQkFBQSxHQUFBLEdBQU0sc0JBQUEsTUFBQSxFQUFOOztBQUNBLHNCQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQUEsYUFBQSxFQUNFLFVBQUEsS0FBQSxFQUFBO1NBQVcsSUFBQSxTQUFBLENBQUEsS0FBQSxDO0FBRGIsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLHdCQUFBLEVBQ0UsVUFBQSxLQUFBLEVBQUE7U0FBVyxHQUFBLENBQUksbUJBQUEsUUFBQSxFQUFKLEtBQUksQ0FBSixDO0FBRGIsQ0FBQTs7QUFFQSxzQkFBQSxNQUFBLENBQUEsR0FBQSxFQUFBLHdCQUFBLEVBQUEsd0JBQUEsRUFDRSxVQUFBLEtBQUEsRUFBQSxRQUFBLEVBQUE7U0FBcUIsR0FBQSxDQUFJLG1CQUFBLFFBQUEsRUFBSixLQUFJLENBQUosQztBQUR2QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1R5cGUsIGlzU3RyaW5nfSBmcm9tIFwicGFuZGEtcGFyY2htZW50XCJcbmltcG9ydCB7TWV0aG9kfSBmcm9tIFwicGFuZGEtZ2VuZXJpY3NcIlxuXG5pbXBvcnQge0tleX0gZnJvbSBcIi4va2V5XCJcbmltcG9ydCB7aXNEYXRhLCBkZWNvZGV9IGZyb20gXCIuLi91dGlsc1wiXG5cbmNsYXNzIFB1YmxpY0tleSBleHRlbmRzIEtleVxuXG5pc1B1YmxpY0tleSA9IGlzVHlwZSBQdWJsaWNLZXlcblxuZ2V0ID0gTWV0aG9kLmNyZWF0ZSgpXG5NZXRob2QuZGVmaW5lIGdldCwgaXNEYXRhLFxuICAoaW5wdXQpIC0+IG5ldyBQdWJsaWNLZXkgaW5wdXRcbk1ldGhvZC5kZWZpbmUgZ2V0LCBpc1N0cmluZyxcbiAgKGlucHV0KSAtPiBnZXQgZGVjb2RlIFwiYmFzZTY0XCIsIGlucHV0XG5NZXRob2QuZGVmaW5lIGdldCwgaXNTdHJpbmcsIGlzU3RyaW5nLFxuICAoaW5wdXQsIGVuY29kaW5nKSAtPiBnZXQgZGVjb2RlIGVuY29kaW5nLCBpbnB1dFxuXG5leHBvcnQge2dldCBhcyBwdWJsaWNLZXksIGlzUHVibGljS2V5fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=keys/public-key.coffee
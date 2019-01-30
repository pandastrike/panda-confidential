"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pandaParchment = require("panda-parchment");

var _key = _interopRequireDefault(require("./key"));

var _public = _interopRequireDefault(require("./public"));

var _private = _interopRequireDefault(require("./private"));

var _shared = _interopRequireDefault(require("./shared"));

var _symmetric = _interopRequireDefault(require("./symmetric"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys;

keys = function (confidential) {
  var SharedKey, SymmetricKey;
  SharedKey = (0, _shared.default)(confidential);
  SymmetricKey = (0, _symmetric.default)(confidential);
  return (0, _pandaParchment.include)(confidential, {
    Key: _key.default,
    PublicKey: _public.default,
    PrivateKey: _private.default,
    SharedKey,
    SymmetricKey
  });
};

var _default = keys;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvc3JjL2tleXMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUxBLElBQUEsSUFBQTs7QUFPQSxJQUFBLEdBQU8sVUFBQSxZQUFBLEVBQUE7QUFDTCxNQUFBLFNBQUEsRUFBQSxZQUFBO0FBQUEsRUFBQSxTQUFBLEdBQVkscUJBQUEsWUFBQSxDQUFaO0FBQ0EsRUFBQSxZQUFBLEdBQWUsd0JBQUEsWUFBQSxDQUFmO1NBQ0EsNkJBQUEsWUFBQSxFQUFzQjtBQUFDLElBQUEsR0FBRCxFQUFDLFlBQUQ7QUFBTSxJQUFBLFNBQU4sRUFBTSxlQUFOO0FBQWlCLElBQUEsVUFBakIsRUFBaUIsZ0JBQWpCO0FBQUEsSUFBQSxTQUFBO0FBQXRCLElBQUE7QUFBc0IsR0FBdEIsQztBQUhLLENBQVA7O2VBS2UsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5jbHVkZX0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQgS2V5IGZyb20gXCIuL2tleVwiXG5pbXBvcnQgUHVibGljS2V5IGZyb20gXCIuL3B1YmxpY1wiXG5pbXBvcnQgUHJpdmF0ZUtleSBmcm9tIFwiLi9wcml2YXRlXCJcbmltcG9ydCBzaGFyZWRLZXkgZnJvbSBcIi4vc2hhcmVkXCJcbmltcG9ydCBzeW1tZXRyaWNLZXkgZnJvbSBcIi4vc3ltbWV0cmljXCJcblxua2V5cyA9IChjb25maWRlbnRpYWwpIC0+XG4gIFNoYXJlZEtleSA9IHNoYXJlZEtleSBjb25maWRlbnRpYWxcbiAgU3ltbWV0cmljS2V5ID0gc3ltbWV0cmljS2V5IGNvbmZpZGVudGlhbFxuICBpbmNsdWRlIGNvbmZpZGVudGlhbCwge0tleSwgUHVibGljS2V5LCBQcml2YXRlS2V5LCBTaGFyZWRLZXksIFN5bW1ldHJpY0tleX1cblxuZXhwb3J0IGRlZmF1bHQga2V5c1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/repos/panda-confidential/src/keys/index.coffee
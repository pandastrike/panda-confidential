"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pandaParchment = require("panda-parchment");

var _keyPair = _interopRequireDefault(require("./key-pair"));

var _encryption = _interopRequireDefault(require("./encryption"));

var _signature = _interopRequireDefault(require("./signature"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyPairs;

keyPairs = function (confidential) {
  var EncryptionKeyPair, SignatureKeyPair;
  EncryptionKeyPair = (0, _encryption.default)(confidential);
  SignatureKeyPair = (0, _signature.default)(confidential);
  return (0, _pandaParchment.include)(confidential, {
    KeyPair: _keyPair.default,
    EncryptionKeyPair,
    SignatureKeyPair
  });
};

var _default = keyPairs;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3NyYy9rZXktcGFpcnMvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUhBLElBQUEsUUFBQTs7QUFLQSxRQUFBLEdBQVcsVUFBQSxZQUFBLEVBQUE7QUFDVCxNQUFBLGlCQUFBLEVBQUEsZ0JBQUE7QUFBQSxFQUFBLGlCQUFBLEdBQW9CLHlCQUFBLFlBQUEsQ0FBcEI7QUFDQSxFQUFBLGdCQUFBLEdBQW1CLHdCQUFBLFlBQUEsQ0FBbkI7U0FDQSw2QkFBQSxZQUFBLEVBQXNCO0FBQUMsSUFBQSxPQUFELEVBQUMsZ0JBQUQ7QUFBQSxJQUFBLGlCQUFBO0FBQXRCLElBQUE7QUFBc0IsR0FBdEIsQztBQUhTLENBQVg7O2VBS2UsUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5jbHVkZX0gZnJvbSBcInBhbmRhLXBhcmNobWVudFwiXG5pbXBvcnQgS2V5UGFpciBmcm9tIFwiLi9rZXktcGFpclwiXG5pbXBvcnQgZW5jcnlwdGlvbktleVBhaXIgZnJvbSBcIi4vZW5jcnlwdGlvblwiXG5pbXBvcnQgc2lnbmF0dXJlS2V5UGFpciBmcm9tIFwiLi9zaWduYXR1cmVcIlxuXG5rZXlQYWlycyA9IChjb25maWRlbnRpYWwpIC0+XG4gIEVuY3J5cHRpb25LZXlQYWlyID0gZW5jcnlwdGlvbktleVBhaXIgY29uZmlkZW50aWFsXG4gIFNpZ25hdHVyZUtleVBhaXIgPSBzaWduYXR1cmVLZXlQYWlyIGNvbmZpZGVudGlhbFxuICBpbmNsdWRlIGNvbmZpZGVudGlhbCwge0tleVBhaXIsIEVuY3J5cHRpb25LZXlQYWlyLCBTaWduYXR1cmVLZXlQYWlyfVxuXG5leHBvcnQgZGVmYXVsdCBrZXlQYWlyc1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/Repositories/panda-confidential/src/key-pairs/index.coffee
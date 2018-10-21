"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keyName = _interopRequireDefault(require("./key-name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For the purposes of testing, panda-confidential needs access to a KMS key. That key has an alias of "alias/panda-confidential-testing".  The test suite checks for this key, and creates it if it does not exist.  It does not create any resources if it finds this alias within the specified region.  The test suite *DOES NOT* destroy any resources.
var EstablishKey;

EstablishKey = async function (AWS) {
  var KeyId, addAlias, create, get;
  ({
    KMS: {
      get,
      create,
      addAlias
    }
  } = AWS);

  if (await get(_keyName.default)) {
    console.error(`Confirmed testing key ${_keyName.default}`);
  } else {
    console.error(`Unable to locate key ${_keyName.default}.  Creating...`);
    ({
      KeyId
    } = await create());
    return await addAlias(KeyId, _keyName.default);
  }
};

var _default = EstablishKey;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBREE7QUFBQSxJQUFBLFlBQUE7O0FBR0EsWUFBQSxHQUFlLGdCQUFBLEdBQUEsRUFBQTtBQUNiLE1BQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQTtBQUFBLEdBQUE7QUFBQyxJQUFBLEdBQUEsRUFBSTtBQUFBLE1BQUEsR0FBQTtBQUFBLE1BQUEsTUFBQTtBQUFBLE1BQUE7QUFBQTtBQUFMLE1BQUEsR0FBQTs7QUFFQSxNQUFHLE1BQU0sR0FBQSxDQUFULGdCQUFTLENBQVQsRUFBQTtBQUNFLElBQUEsT0FBTyxDQUFQLEtBQUEsQ0FBYyx5QkFBQSxnQkFEaEIsRUFDRTtBQURGLEdBQUEsTUFBQTtBQUlFLElBQUEsT0FBTyxDQUFQLEtBQUEsQ0FBYyx3QkFBQSxnQkFBZCxnQkFBQTtBQUNBLEtBQUE7QUFBQSxNQUFBO0FBQUEsUUFBVSxNQUFNLE1BQWhCLEVBQUE7QUFDQSxXQUFBLE1BQU0sUUFBQSxDQUFBLEtBQUEsRUFOUixnQkFNUSxDQUFOOztBQVRXLENBQWY7O2VBV2UsWSIsInNvdXJjZXNDb250ZW50IjpbIiMgRm9yIHRoZSBwdXJwb3NlcyBvZiB0ZXN0aW5nLCBwYW5kYS1jb25maWRlbnRpYWwgbmVlZHMgYWNjZXNzIHRvIGEgS01TIGtleS4gVGhhdCBrZXkgaGFzIGFuIGFsaWFzIG9mIFwiYWxpYXMvcGFuZGEtY29uZmlkZW50aWFsLXRlc3RpbmdcIi4gIFRoZSB0ZXN0IHN1aXRlIGNoZWNrcyBmb3IgdGhpcyBrZXksIGFuZCBjcmVhdGVzIGl0IGlmIGl0IGRvZXMgbm90IGV4aXN0LiAgSXQgZG9lcyBub3QgY3JlYXRlIGFueSByZXNvdXJjZXMgaWYgaXQgZmluZHMgdGhpcyBhbGlhcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByZWdpb24uICBUaGUgdGVzdCBzdWl0ZSAqRE9FUyBOT1QqIGRlc3Ryb3kgYW55IHJlc291cmNlcy5cbmltcG9ydCBuYW1lIGZyb20gXCIuL2tleS1uYW1lXCJcblxuRXN0YWJsaXNoS2V5ID0gKEFXUykgLT5cbiAge0tNUzp7Z2V0LCBjcmVhdGUsIGFkZEFsaWFzfX0gPSBBV1NcblxuICBpZiBhd2FpdCBnZXQgbmFtZVxuICAgIGNvbnNvbGUuZXJyb3IgXCJDb25maXJtZWQgdGVzdGluZyBrZXkgI3tuYW1lfVwiXG4gICAgcmV0dXJuXG4gIGVsc2VcbiAgICBjb25zb2xlLmVycm9yIFwiVW5hYmxlIHRvIGxvY2F0ZSBrZXkgI3tuYW1lfS4gIENyZWF0aW5nLi4uXCJcbiAgICB7S2V5SWR9ID0gYXdhaXQgY3JlYXRlKClcbiAgICBhd2FpdCBhZGRBbGlhcyBLZXlJZCwgbmFtZVxuXG5leHBvcnQgZGVmYXVsdCBFc3RhYmxpc2hLZXlcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=key.coffee
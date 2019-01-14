"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _sundog = _interopRequireDefault(require("sundog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context;

context = function ({
  region = "us-west-2",
  profile = "default"
}) {
  _awsSdk.default.config = {
    credentials: new _awsSdk.default.SharedIniFileCredentials({
      profile
    }),
    region: region,
    sslEnabled: true
  };
  return {
    SDK: _awsSdk.default,
    Sundog: (0, _sundog.default)(_awsSdk.default).AWS
  };
};

var _default = context;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9SZXBvc2l0b3JpZXMvcGFuZGEtY29uZmlkZW50aWFsL3Rlc3QvY29udGV4dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBREEsSUFBQSxPQUFBOztBQUdBLE9BQUEsR0FBVSxVQUFDO0FBQUMsRUFBQSxNQUFBLEdBQUQsV0FBQTtBQUFxQixFQUFBLE9BQUEsR0FBdEI7QUFBQyxDQUFELEVBQUE7QUFDUixrQkFBQSxNQUFBLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxJQUFJLGdCQUFKLHdCQUFBLENBQWlDO0FBQTlDLE1BQUE7QUFBOEMsS0FBakMsQ0FBYjtBQUNBLElBQUEsTUFBQSxFQURBLE1BQUE7QUFFQSxJQUFBLFVBQUEsRUFBWTtBQUZaLEdBREY7U0FLQTtBQUFDLElBQUEsR0FBRCxFQUFDLGVBQUQ7QUFBTSxJQUFBLE1BQUEsRUFBUSxxQkFBQSxlQUFBLEVBQVk7QUFBMUIsRztBQU5RLENBQVY7O2VBUWUsTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTREsgZnJvbSBcImF3cy1zZGtcIlxuaW1wb3J0IFN1bmRvZyBmcm9tIFwic3VuZG9nXCJcblxuY29udGV4dCA9ICh7cmVnaW9uPVwidXMtd2VzdC0yXCIsIHByb2ZpbGU9XCJkZWZhdWx0XCJ9KSAtPlxuICBTREsuY29uZmlnID1cbiAgICBjcmVkZW50aWFsczogbmV3IFNESy5TaGFyZWRJbmlGaWxlQ3JlZGVudGlhbHMge3Byb2ZpbGV9XG4gICAgcmVnaW9uOiByZWdpb25cbiAgICBzc2xFbmFibGVkOiB0cnVlXG5cbiAge1NESywgU3VuZG9nOiBTdW5kb2coU0RLKS5BV1N9XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRleHRcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=/Users/david/Repositories/panda-confidential/test/context.coffee
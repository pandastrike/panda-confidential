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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZpZC9yZXBvcy9wYW5kYS1jb25maWRlbnRpYWwvdGVzdC9jb250ZXh0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFEQSxJQUFBLE9BQUE7O0FBR0EsT0FBQSxHQUFVLFVBQUM7QUFBQyxFQUFBLE1BQUEsR0FBRCxXQUFBO0FBQXFCLEVBQUEsT0FBQSxHQUF0QjtBQUFDLENBQUQsRUFBQTtBQUNSLGtCQUFBLE1BQUEsR0FDRTtBQUFBLElBQUEsV0FBQSxFQUFhLElBQUksZ0JBQUosd0JBQUEsQ0FBaUM7QUFBOUMsTUFBQTtBQUE4QyxLQUFqQyxDQUFiO0FBQ0EsSUFBQSxNQUFBLEVBREEsTUFBQTtBQUVBLElBQUEsVUFBQSxFQUFZO0FBRlosR0FERjtTQUtBO0FBQUMsSUFBQSxHQUFELEVBQUMsZUFBRDtBQUFNLElBQUEsTUFBQSxFQUFRLHFCQUFBLGVBQUEsRUFBWTtBQUExQixHO0FBTlEsQ0FBVjs7ZUFRZSxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNESyBmcm9tIFwiYXdzLXNka1wiXG5pbXBvcnQgU3VuZG9nIGZyb20gXCJzdW5kb2dcIlxuXG5jb250ZXh0ID0gKHtyZWdpb249XCJ1cy13ZXN0LTJcIiwgcHJvZmlsZT1cImRlZmF1bHRcIn0pIC0+XG4gIFNESy5jb25maWcgPVxuICAgIGNyZWRlbnRpYWxzOiBuZXcgU0RLLlNoYXJlZEluaUZpbGVDcmVkZW50aWFscyB7cHJvZmlsZX1cbiAgICByZWdpb246IHJlZ2lvblxuICAgIHNzbEVuYWJsZWQ6IHRydWVcblxuICB7U0RLLCBTdW5kb2c6IFN1bmRvZyhTREspLkFXU31cblxuZXhwb3J0IGRlZmF1bHQgY29udGV4dFxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=/Users/david/repos/panda-confidential/test/context.coffee
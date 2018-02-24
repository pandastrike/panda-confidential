"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _sundog = require("sundog");

var _sundog2 = _interopRequireDefault(_sundog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context;

context = function ({ region = "us-west-2", profile = "default" }) {
  _awsSdk2.default.config = {
    credentials: new _awsSdk2.default.SharedIniFileCredentials({ profile }),
    region: region,
    sslEnabled: true
  };
  return {
    SDK: _awsSdk2.default,
    Sundog: (0, _sundog2.default)(_awsSdk2.default).AWS
  };
};

exports.default = context;
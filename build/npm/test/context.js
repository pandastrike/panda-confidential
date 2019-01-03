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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQURBLElBQUEsT0FBQTs7QUFHQSxPQUFBLEdBQVUsVUFBQztBQUFDLEVBQUEsTUFBQSxHQUFELFdBQUE7QUFBcUIsRUFBQSxPQUFBLEdBQXRCO0FBQUMsQ0FBRCxFQUFBO0FBQ1Isa0JBQUEsTUFBQSxHQUNFO0FBQUEsSUFBQSxXQUFBLEVBQWEsSUFBSSxnQkFBSix3QkFBQSxDQUFpQztBQUE5QyxNQUFBO0FBQThDLEtBQWpDLENBQWI7QUFDQSxJQUFBLE1BQUEsRUFEQSxNQUFBO0FBRUEsSUFBQSxVQUFBLEVBQVk7QUFGWixHQURGO1NBS0E7QUFBQyxJQUFBLEdBQUQsRUFBQyxlQUFEO0FBQU0sSUFBQSxNQUFBLEVBQVEscUJBQUEsZUFBQSxFQUFZO0FBQTFCLEc7QUFOUSxDQUFWOztlQVFlLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU0RLIGZyb20gXCJhd3Mtc2RrXCJcbmltcG9ydCBTdW5kb2cgZnJvbSBcInN1bmRvZ1wiXG5cbmNvbnRleHQgPSAoe3JlZ2lvbj1cInVzLXdlc3QtMlwiLCBwcm9maWxlPVwiZGVmYXVsdFwifSkgLT5cbiAgU0RLLmNvbmZpZyA9XG4gICAgY3JlZGVudGlhbHM6IG5ldyBTREsuU2hhcmVkSW5pRmlsZUNyZWRlbnRpYWxzIHtwcm9maWxlfVxuICAgIHJlZ2lvbjogcmVnaW9uXG4gICAgc3NsRW5hYmxlZDogdHJ1ZVxuXG4gIHtTREssIFN1bmRvZzogU3VuZG9nKFNESykuQVdTfVxuXG5leHBvcnQgZGVmYXVsdCBjb250ZXh0XG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=context.coffee